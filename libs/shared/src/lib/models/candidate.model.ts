export type Seniority = 'junior' | 'senior';

export interface Candidate {
  name: string;
  surname: string;
  seniority: Seniority;
  years: number;
  availability: boolean;
}

export interface CandidateRequest {
  name: string;
  surname: string;
  file: File;
}

export interface CandidateResponse extends Candidate {}