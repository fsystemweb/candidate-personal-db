import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CandidatesService } from './candidates.service';

describe('CandidatesService', () => {
  let service: CandidatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CandidatesService],
    }).compile();

    service = module.get<CandidatesService>(CandidatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw error when file is missing', async () => {
    const candidateData = { name: 'John', surname: 'Doe' };
    
    await expect(service.processCandidate(candidateData, null as any))
      .rejects.toThrow(BadRequestException);
  });

  it('should process valid candidate data', async () => {
    const candidateData = { name: 'John', surname: 'Doe' };
    const mockFile = {
      buffer: Buffer.from('mock excel data'),
      mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    } as any;

    // Mock XLSX parsing
    jest.spyOn(service as any, 'parseExcelFile').mockResolvedValue({
      seniority: 'junior',
      years: 5,
      availability: true
    });

    const result = await service.processCandidate(candidateData, mockFile);

    expect(result).toEqual({
      name: 'John',
      surname: 'Doe',
      seniority: 'junior',
      years: 5,
      availability: true
    });
  });
});