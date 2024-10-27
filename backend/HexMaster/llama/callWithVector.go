package llama

import (
	"HexMaster/utils"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
	"io/ioutil"
	"net/http"
)

type RequestPayload struct {
	Model   string        `json:"model"`
	Prompt  string        `json:"prompt"`
	Stream  bool          `json:"stream"`
	Vectors []interface{} `json:"vectors"`
}

func DoRequestWithVectors(prompt string) (string, error) {
	// Initialize Weaviate client
	cfg := weaviate.Config{
		Host:   utils.GetEnv("WEAVIATE_HOST", "localhost:8080"),
		Scheme: utils.GetEnv("WEAVIATE_SCHEME", "http"),
	}
	client, err := weaviate.NewClient(cfg)
	if err != nil {
		return "", fmt.Errorf("Fehler beim Initialisieren des Weaviate-Clients: %v", err)
	}

	result, err := client.GraphQL().Get().
		WithClassName("llposts").
		WithFields(
			graphql.Field{Name: "title"},
		).
		Do(context.Background())
	if err != nil {
		return "", fmt.Errorf("Fehler beim Abrufen der vektorisierten Daten: %v", err)
	}
	var vectors []interface{}
	documents := result.Data["Get"].(map[string]interface{})["llposts"].([]interface{})
	for _, doc := range documents {
		vectors = append(vectors, doc.(map[string]interface{})["text"])
	}
	prompt = fmt.Sprintf("Context: %s \n Gibt mir für die Frage ausschließlich passende Zitate aus dem Context. Frage: %v", vectors, prompt)

	payload := RequestPayload{
		Model:  "llama3",
		Prompt: prompt,
		Stream: false,
	}

	fmt.Println(payload)
	jsonData, err := json.Marshal(payload)
	if err != nil {
		return "", fmt.Errorf("Fehler beim Erstellen der Anfrage: %v", err)
	}

	req, err := http.NewRequest("POST", "http://localhost:11434/api/generate", bytes.NewBuffer(jsonData))
	if err != nil {
		return "", fmt.Errorf("Fehler beim Erstellen der HTTP-Anfrage: %v", err)
	}
	req.Header.Set("Content-Type", "application/json")

	clientHTTP := &http.Client{}
	resp, err := clientHTTP.Do(req)
	if err != nil {
		return "", fmt.Errorf("Fehler beim Senden der Anfrage: %v", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("Fehler beim Lesen der Antwort: %v", err)
	}

	var responsePayload ResponsePayload
	err = json.Unmarshal(body, &responsePayload)
	if err != nil {
		return "", fmt.Errorf("Fehler beim Dekodieren der Antwort: %v", err)
	}
	return responsePayload.Response, nil
}
