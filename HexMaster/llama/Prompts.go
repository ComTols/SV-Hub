package llama

type Prompts string

const (
	PROMPT_KEY_INFOS       Prompts = "Nenne die fünf wichtigsten Begriffskombinationen für Suchanfragen in einer Vektor-Datenbank, um die besten Antworten zu finden. Gib die Begriffe in der Reihenfolge ihrer Wichtigkeit in folgendem Format an: [Begriff1 Begriff2 Begriff3 Begriff4, Begriff5 Begriff6 ...]. Verzichte auf jede Form von Einleitung oder Erklärung.\n"
	PROMPT_CONCLUSION      Prompts = "comment"
	PROMPT_SIMILAR_MEANING Prompts = "like"
)

func (m Prompts) String() string {
	return string(m)
}
