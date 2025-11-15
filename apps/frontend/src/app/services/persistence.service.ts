import { Injectable } from '@angular/core';
import { Candidate } from '@candidate-db/shared';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  private readonly storageKey = 'candidates';

  saveCandidates(candidates: Candidate[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(candidates));
  }

  loadCandidates(): Candidate[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  clearCandidates(): void {
    localStorage.removeItem(this.storageKey);
  }
}
