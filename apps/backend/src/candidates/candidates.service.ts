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
      const FIRST_SHEET_INDEX = 0;
      const sheetName = workbook.SheetNames[FIRST_SHEET_INDEX];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (!jsonData.length) {
        throw new BadRequestException('Excel file is empty');
      }

      const FIRST_ROW_INDEX = 0;
      const rowData = jsonData[FIRST_ROW_INDEX] as any;
      const YEARS_EXPERIENCE_KEY = 'Years of experience';

      const excelDto = plainToClass(CandidateExcelDto, {
        seniority: rowData.Seniority?.toLowerCase(),
        years: Number(rowData[YEARS_EXPERIENCE_KEY]),
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
