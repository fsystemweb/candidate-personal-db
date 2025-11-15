import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CandidatesService } from './candidates.service';
import { ProcessCandidateDto } from './candidates.dto';
import { CandidateResponse } from '@candidate-db/shared';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post('process')
  @UseInterceptors(FileInterceptor('file'))
  async processCandidate(
    @Body() candidateData: ProcessCandidateDto,
    @UploadedFile() file: any
  ): Promise<CandidateResponse> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const allowedMimeTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only Excel files (.xlsx, .xls) are allowed');
    }

    return this.candidatesService.processCandidate(candidateData, file);
  }
}