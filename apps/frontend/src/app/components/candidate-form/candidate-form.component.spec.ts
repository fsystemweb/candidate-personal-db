import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CandidateFormComponent } from './candidate-form.component';

describe('CandidateFormComponent', () => {
  let component: CandidateFormComponent;
  let fixture: ComponentFixture<CandidateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CandidateFormComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CandidateFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values and file as null', () => {
    expect(component.candidateForm.get('name')?.value).toBe('');
    expect(component.candidateForm.get('surname')?.value).toBe('');
    expect(component.candidateForm.get('file')?.value).toBeNull();
  });

  it('should validate required fields on initialization', () => {
    expect(component.candidateForm.valid).toBeFalsy();
  });

  it('should handle file selection and update file control', () => {
    const file = new File(['test content'], 'test.xlsx');
    const event = {
      target: {
        files: [file],
      } as any,
    } as Event;

    component.onFileSelected(event);

    expect(component.candidateForm.get('file')?.value).toBe(file);
    expect(component.candidateForm.get('file')?.touched).toBeTruthy();
  });

  it('should set error when no file is selected', () => {
    const event = {
      target: {
        files: [],
      } as any,
    } as Event;

    component.onFileSelected(event);

    expect(
      component.candidateForm.get('file')?.hasError('required')
    ).toBeTruthy();
  });

  it('should clear error when file is selected', () => {
    const file = new File(['test content'], 'test.xlsx');
    const event = {
      target: {
        files: [file],
      } as any,
    } as Event;

    component.onFileSelected(event);

    expect(
      component.candidateForm.get('file')?.hasError('required')
    ).toBeFalsy();
    expect(component.candidateForm.get('file')?.errors).toBeNull();
  });

  it('should not emit form data on submit with invalid form', () => {
    jest.spyOn(component.formSubmit, 'emit');

    component.onSubmit();

    expect(component.formSubmit.emit).not.toHaveBeenCalled();
  });

  it('should emit form data on submit with valid form and reset it', () => {
    jest.spyOn(component.formSubmit, 'emit');

    // Fill required text fields
    component.candidateForm.get('name')?.setValue('John');
    component.candidateForm.get('surname')?.setValue('Doe');

    // Simulate file selection through the method (not through form patching)
    const file = new File(['test'], 'test.xlsx');
    const fileEvent = {
      target: {
        files: [file],
      } as any,
    } as Event;

    component.onFileSelected(fileEvent);

    // Now form should be valid
    expect(component.candidateForm.valid).toBeTruthy();

    // Mock the viewChild references before submit
    jest.spyOn(component, 'formDirective' as any).mockReturnValue({
      resetForm: jest.fn(),
    });
    jest.spyOn(component, 'fileInput' as any).mockReturnValue({
      nativeElement: { value: '' },
    });

    // Submit
    component.onSubmit();

    // Verify emission
    expect(component.formSubmit.emit).toHaveBeenCalled();
    const emittedData = (component.formSubmit.emit as jest.Mock).mock
      .calls[0][0];
    expect(emittedData instanceof FormData).toBeTruthy();
    expect(emittedData.get('name')).toBe('John');
    expect(emittedData.get('surname')).toBe('Doe');
    expect(emittedData.get('file')).toBe(file);

    // Verify form was reset
    expect(component.candidateForm.get('name')?.value).toBeNull();
    expect(component.candidateForm.get('surname')?.value).toBeNull();
    expect(component.candidateForm.get('file')?.value).toBeNull();
  });

  it('should mark file control as touched on file selection', () => {
    const fileControl = component.candidateForm.get('file');
    expect(fileControl?.touched).toBeFalsy();

    const event = {
      target: {
        files: [new File([''], 'test.xlsx')],
      } as any,
    } as Event;

    component.onFileSelected(event);

    expect(fileControl?.touched).toBeTruthy();
  });

  it('should handle null files array by setting null', () => {
    const file = new File(['test'], 'test.xlsx');
    const fileControl = component.candidateForm.get('file');

    // First set a file through the event handler
    const firstEvent = {
      target: {
        files: [file],
      } as any,
    } as Event;
    component.onFileSelected(firstEvent);
    expect(fileControl?.value).toBe(file);

    // Then simulate empty files
    const emptyEvent = {
      target: {
        files: null,
      } as any,
    } as Event;
    component.onFileSelected(emptyEvent);

    expect(fileControl?.value).toBeNull();
  });

  it('should validate name field is required', () => {
    const nameControl = component.candidateForm.get('name');
    nameControl?.setValue('');
    nameControl?.markAsTouched();

    expect(nameControl?.hasError('required')).toBeTruthy();

    nameControl?.setValue('John');
    expect(nameControl?.hasError('required')).toBeFalsy();
  });

  it('should validate surname field is required', () => {
    const surnameControl = component.candidateForm.get('surname');
    surnameControl?.setValue('');
    surnameControl?.markAsTouched();

    expect(surnameControl?.hasError('required')).toBeTruthy();

    surnameControl?.setValue('Doe');
    expect(surnameControl?.hasError('required')).toBeFalsy();
  });
});
