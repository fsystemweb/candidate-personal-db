import {
  Component,
  output,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidate-form',

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './candidate-form.component.html',
  styleUrl: './candidate-form.component.scss',
})
export class CandidateFormComponent {
  private readonly fb = inject(FormBuilder);

  formSubmit = output<FormData>();

  candidateForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    file: [null, [Validators.required]],
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
