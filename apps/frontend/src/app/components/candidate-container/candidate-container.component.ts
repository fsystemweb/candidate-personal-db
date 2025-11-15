import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { switchMap, tap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { CandidateFormComponent } from '../candidate-form/candidate-form.component';
import { CandidateTableComponent } from '../candidate-table/candidate-table.component';
import { CandidateService } from '../../services/candidate.service';
import { PersistenceService } from '../../services/persistence.service';
import { Candidate } from '@candidate-db/shared';

@Component({
  selector: 'app-candidate-container',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CandidateFormComponent,
    CandidateTableComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <h2>Candidate Management</h2>
      
      <app-candidate-form (formSubmit)="onFormSubmit($event)"></app-candidate-form>
      
      <div class="loading" *ngIf="loading()">
        <mat-spinner></mat-spinner>
        <p>Processing candidate...</p>
      </div>
      
      <div class="actions" *ngIf="candidates().length > 0">
        <button mat-raised-button color="warn" (click)="clearCandidates()">
          Clear All Candidates
        </button>
      </div>
      
      <app-candidate-table 
        *ngIf="candidates().length > 0" 
        [candidates]="candidates()">
      </app-candidate-table>
      
      <div class="empty-state" *ngIf="candidates().length === 0 && !loading()">
        <p>No candidates processed yet. Upload an Excel file to get started.</p>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      margin: 24px 0;
    }
    
    .actions {
      margin: 24px 0;
      text-align: center;
    }
    
    .empty-state {
      text-align: center;
      margin: 48px 0;
      color: #666;
    }
    
    h2 {
      text-align: center;
      margin-bottom: 32px;
    }
  `]
})
export class CandidateContainerComponent {
  private readonly candidateService = inject(CandidateService);
  private readonly persistenceService = inject(PersistenceService);
  private readonly snackBar = inject(MatSnackBar);
  
  candidates = signal<Candidate[]>(this.persistenceService.loadCandidates());
  loading = signal(false);

  onFormSubmit(formData: FormData): void {
    this.loading.set(true);
    
    const name = formData.get('name') as string;
    const surname = formData.get('surname') as string;
    const file = formData.get('file') as File;
    
    this.candidateService.processCandidates(name, surname, file)
      .pipe(
        tap(candidate => {
          const updatedCandidates = [...this.candidates(), candidate];
          this.candidates.set(updatedCandidates);
          this.persistenceService.saveCandidates(updatedCandidates);
          this.snackBar.open('Candidate processed successfully!', 'Close', { duration: 3000 });
        }),
        catchError(error => {
          this.snackBar.open(
            error.error?.message || 'Error processing candidate', 
            'Close', 
            { duration: 5000 }
          );
          return of(null);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  clearCandidates(): void {
    this.candidates.set([]);
    this.persistenceService.clearCandidates();
    this.snackBar.open('All candidates cleared', 'Close', { duration: 2000 });
  }
}