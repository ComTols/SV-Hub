import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-transcription',
  templateUrl: './transcribe.page.html',
  styleUrls: ['./transcribe.page.scss'],
})
export class TranscribePage {
  selectedFile: File | null = null;
  transcription: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  async uploadFile() {
    if (!this.selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/transcribe', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      this.transcription = response.data.transcription;
    } catch (error) {
      console.error("Error uploading file or fetching transcription:", error);
      alert("There was an error processing the file.");
    }
  }
}
