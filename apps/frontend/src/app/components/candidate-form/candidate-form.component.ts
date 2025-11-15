import {
  Component,
  output,
  inject,
  ChangeDetectionStrategy,
  ElementRef,
  viewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormGroupDirective,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-candidate-form',

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
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

  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  formDirective = viewChild<FormGroupDirective>('formDir');

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

      this.resetForm();
    }
  }

  private resetForm(): void {
    this.candidateForm.reset();
    this.formDirective()!.resetForm();

    const fileInputElement = this.fileInput()?.nativeElement;
    if (fileInputElement) {
      fileInputElement.value = '';
    }
  }
}
