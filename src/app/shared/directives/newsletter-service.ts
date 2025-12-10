import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private apiUrl = 'https://api.brevo.com/v3/contacts';
  private http = inject(HttpClient);

  subscribe(email: string) {
    const headers = new HttpHeaders({
      'api-key': environment.brevoApiKey,
      'Content-Type': 'application/json'
    });

    return this.http.post(
      this.apiUrl,
      {
        email: email,
        listIds: [4]
      },
      { headers }
    );
  }
}
