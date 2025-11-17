import { Injectable, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as XLSX from 'xlsx';
import { CandidateExcelDto, ProcessCandidateDto } from './candidates.dto';
import { CandidateResponse } from '@candidate-db/shared';

@Injectable()
export class CandidatesService {
  async processCandidate(
    candidateData: ProcessCandidateDto,
    file: any
  ): Promise<CandidateResponse> {
    if (!file) {
      throw new BadRequestException('Excel file is required');
    }

    const excelData = await this.parseExcelFile(file);

    return {
      name: candidateData.name,
      surname: candidateData.surname,
      ...excelData,
    };
  }

  private async parseExcelFile(file: any): Promise<CandidateExcelDto> {
    try {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (!jsonData.length) {
        throw new BadRequestException('Excel file is empty');
      }

      const rowData = jsonData[0] as any;

      const excelDto = plainToClass(CandidateExcelDto, {
        seniority: rowData.Seniority?.toLowerCase(),
        years: Number(rowData['Years of experience']),
        availability: rowData.Availability,
      });

      const errors = await validate(excelDto);
      if (errors.length > 0) {
        throw new BadRequestException(
          `Invalid Excel data: ${errors
            .map((e) => Object.values(e.constraints || {}))
            .flat()
            .join(', ')}`
        );
      }

      return excelDto;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Invalid Excel file format');
    }
  }
}
