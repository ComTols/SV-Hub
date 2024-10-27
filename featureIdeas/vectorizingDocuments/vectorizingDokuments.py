import os
import weaviate
import uuid
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np


# Laden der Umgebungsvariablen aus connect.env
load_dotenv("connect.env")
print("env gefunden")
# Initialisieren des Embedding-Modells
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')  # Beispielmodell von sentence-transformers


# Funktion zum Lesen von Textdaten aus einer Textdatei
def fetch_text_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Die Datei wird in Absätze aufgeteilt, die als einzelne Dokumente behandelt werden
    texts = content.split('\n\n')
    return texts


# Funktion zum Einfügen von Texten in Weaviate
def insert_texts_to_weaviate(client, texts):
    for text in texts:
        # Erstelle eine zufällige UUID
        unique_uuid = str(uuid.uuid4())
        # Erzeuge den Vektor für den Text
        vector = embedding_model.encode(text).tolist()
        try:
            client.data_object.create(
                data_object={
                    "text": text,
                },
                class_name="Document",
                vector=vector,
                uuid=unique_uuid
            )
            print(f"Dokument eingefügt mit UUID: {unique_uuid}")
        except weaviate.exceptions.ObjectAlreadyExistsError:
            print(f"Dokument mit UUID {unique_uuid} existiert bereits, überspringe...")
            continue


# Kontextgenerierung mit Relevanzfilterung
def build_context_from_weaviate(client, query_text, threshold=0.3):
    # Vektor für die Anfrage generieren
    query_vector = embedding_model.encode(query_text).tolist()
    response = client.query.get("Document", ["text"]).with_near_vector({"vector": query_vector}).with_limit(5).do()

    if "data" not in response or "Get" not in response["data"] or "Document" not in response["data"]["Get"]:
        print("Fehlerhafte Antwort von Weaviate:", response)
        return ""

    # Kontext basierend auf der Ähnlichkeitsschwelle erstellen
    relevant_texts = []
    for res in response["data"]["Get"]["Document"]:
        # Berechne die Cosine Similarity zwischen Query- und Dokumentenvektor
        doc_vector = embedding_model.encode(res["text"]).reshape(1, -1)
        query_vec = np.array(query_vector).reshape(1, -1)
        similarity = cosine_similarity(query_vec, doc_vector)[0][0]

        if similarity >= threshold:
            relevant_texts.append(res["text"])

    # Kontext als String zurückgeben
    context = "\n\n".join(relevant_texts)
    return context



def main():
    # Weaviate-Client initialisieren

    weaviate_url = os.getenv("WEAVIATE_URL")

    if weaviate_url is None:
        raise ValueError("WEAVIATE_URL ist in der connect.env-Datei nicht definiert oder konnte nicht geladen werden.")
    client = weaviate.Client(url=weaviate_url)
    print("weaviate url geladen")
    # Schema einrichten (einmalig)
    existing_classes = client.schema.get()["classes"]
    if not any(cls["class"] == "Document" for cls in existing_classes):
        schema = {
            "class": "Document",
            "properties": [
                {"name": "text", "dataType": ["text"]},
            ]
        }
        client.schema.create_class(schema)


    texts = fetch_text_data("textdata.txt")
    insert_texts_to_weaviate(client, texts)
    user_query = "SV Wahlen"
    context = build_context_from_weaviate(client, user_query)
    prompt = f"{context}\n\nFrage: {user_query}"
    print(prompt)
    #Anbindung an LLama mit dem Kontextualisierten prompt


if __name__ == "__main__":
    main()
