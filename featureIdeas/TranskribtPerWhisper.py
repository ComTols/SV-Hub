from flask import Flask, request, jsonify, Response
import whisper
import tempfile
import os
import json
from moviepy.editor import VideoFileClip
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = whisper.load_model("base")  # Lade das Whisper-Modell (z. B. "tiny", "base", "small", etc.)


def transcribe_audio(file_path):
    """Transkribiert eine Audiodatei mit Whisper."""
    result = model.transcribe(file_path)
    return result["text"]


def extract_audio_from_video(video_path):
    """Extrahiert die Audiospur aus einer Videodatei."""
    with VideoFileClip(video_path) as video:
        audio_path = tempfile.mktemp(suffix=".wav")
        video.audio.write_audiofile(audio_path)
    return audio_path


@app.route('/transcribe', methods=['POST'])
def transcribe():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        file_path = temp_file.name
        file.save(file_path)

    try:
        # Prüfen, ob die Datei eine Video- oder Audiodatei ist
        if file.filename.lower().endswith(('.mp4', '.mkv', '.mov', '.avi')):
            audio_path = extract_audio_from_video(file_path)
            transcription = transcribe_audio(audio_path)
            os.remove(audio_path)  # Lösche die extrahierte Audiodatei
        else:
            transcription = transcribe_audio(file_path)
    finally:
        os.remove(file_path)  # Lösche die hochgeladene Datei

    # Manuelle Erstellung der JSON-Antwort mit UTF-8-Kodierung ohne Unicode-Escaping
    response_data = json.dumps({"transcription": transcription}, ensure_ascii=False)
    return Response(response_data, content_type="application/json; charset=utf-8")


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
