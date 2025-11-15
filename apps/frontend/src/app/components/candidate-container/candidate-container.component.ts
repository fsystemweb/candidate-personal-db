import {
  Component,
  inject,
  ChangeDetectionStrategy,
  signal,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { tap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { CandidateFormComponent } from '../candidate-form/candidate-form.component';
import { CandidateTableComponent } from '../candidate-table/candidate-table.component';
import { CandidateService } from '../../services/candidate.service';
import { PersistenceService } from '../../services/persistence.service';
import { Candidate } from '@candidate-db/shared';

@Component({
  selector: 'app-candidate-container',
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CandidateFormComponent,
    CandidateTableComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './candidate-container.component.html',
  styleUrl: './candidate-container.component.scss',
})
export class CandidateContainerComponent {
  private readonly candidateService = inject(CandidateService);
  private readonly persistenceService = inject(PersistenceService);
  private readonly snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  candidates = signal<Candidate[]>(this.persistenceService.loadCandidates());
  loading = signal(false);

  onFormSubmit(formData: FormData): void {
    this.loading.set(true);

    const name = formData.get('name') as string;
    const surname = formData.get('surname') as string;
    const file = formData.get('file') as File;

    this.candidateService
      .processCandidates(name, surname, file)
      .pipe(
        tap((candidate) => {
          const updatedCandidates = [...this.candidates(), candidate];
          this.candidates.set(updatedCandidates);
          this.persistenceService.saveCandidates(updatedCandidates);
          this.snackBar.open('Candidate processed successfully!', 'Close', {
            duration: 3000,
          });
        }),
        catchError((error) => {
          this.snackBar.open(
            error.error?.message || 'Error processing candidate',
            'Close',
            { duration: 5000 }
          );
          return of(null);
        }),
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  clearCandidates(): void {
    this.candidates.set([]);
    this.persistenceService.clearCandidates();
    this.snackBar.open('All candidates cleared', 'Close', { duration: 2000 });
  }
}
