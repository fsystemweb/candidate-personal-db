import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidate-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="candidateForm" (ngSubmit)="onSubmit()" class="candidate-form">
      <mat-form-field appearance="outline">
        <mat-label>Name</mat-label>
        <input matInput formControlName="name" required>
        <mat-error *ngIf="candidateForm.get('name')?.hasError('required')">
          Name is required
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Surname</mat-label>
        <input matInput formControlName="surname" required>
        <mat-error *ngIf="candidateForm.get('surname')?.hasError('required')">
          Surname is required
        </mat-error>
      </mat-form-field>

      <div class="file-input-container">
        <label for="file-input">Excel File *</label>
        <input id="file-input" type="file" (change)="onFileSelected($event)" accept=".xlsx,.xls" required>
        <div class="error-message" *ngIf="candidateForm.get('file')?.hasError('required')">
          Excel file is required
        </div>
      </div>

      <button mat-raised-button color="primary" type="submit" [disabled]="candidateForm.invalid">
        Process Candidate
      </button>
    </form>
  `,
  styles: [`
    .candidate-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 400px;
      margin: 0 auto;
    }
    
    .file-input-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .file-input-container label {
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
    }
    
    .file-input-container input[type="file"] {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    .error-message {
      color: #f44336;
      font-size: 12px;
    }
  `]
})
export class CandidateFormComponent {
  private readonly fb = inject(FormBuilder);
  
  formSubmit = output<FormData>();
  
  candidateForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    file: [null, [Validators.required]]
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.candidateForm.patchValue({ file: input.files[0] });
    }
  }

  onSubmit(): void {
    if (this.candidateForm.valid) {
      const formData = new FormData();
      const values = this.candidateForm.value;
      formData.append('name', values.name);
      formData.append('surname', values.surname);
      formData.append('file', values.file);
      
      this.formSubmit.emit(formData);
      this.candidateForm.reset();
    }
  }
}