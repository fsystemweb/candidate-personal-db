import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
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
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CandidateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate required fields', () => {
    expect(component.candidateForm.valid).toBeFalsy();
    
    component.candidateForm.patchValue({
      name: 'John',
      surname: 'Doe',
      file: new File([''], 'test.xlsx')
    });
    
    expect(component.candidateForm.valid).toBeTruthy();
  });

  it('should emit form data on submit', () => {
    jest.spyOn(component.formSubmit, 'emit');
    
    component.candidateForm.patchValue({
      name: 'John',
      surname: 'Doe',
      file: new File([''], 'test.xlsx')
    });
    
    component.onSubmit();
    
    expect(component.formSubmit.emit).toHaveBeenCalled();
  });
});