import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CandidateService } from './candidate.service';
import { CandidateResponse } from '@candidate-db/shared';

describe('CandidateService', () => {
  let service: CandidateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CandidateService]
    });
    service = TestBed.inject(CandidateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should process candidates', () => {
    const mockResponse: CandidateResponse = {
      name: 'John',
      surname: 'Doe',
      seniority: 'junior',
      years: 5,
      availability: true
    };

    const file = new File([''], 'test.xlsx');
    
    service.processCandidates('John', 'Doe', file).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/candidates/process');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});