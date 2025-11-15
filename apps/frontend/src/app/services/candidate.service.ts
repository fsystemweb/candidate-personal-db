import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CandidateResponse } from '@candidate-db/shared';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/candidates';

  processCandidates(
    name: string,
    surname: string,
    file: File
  ): Observable<CandidateResponse> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('file', file);

    return this.http.post<CandidateResponse>(
      `${this.apiUrl}/process`,
      formData
    );
  }
}
