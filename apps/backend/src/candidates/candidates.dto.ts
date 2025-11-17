import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class ProcessCandidateDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  surname!: string;
}

export class CandidateExcelDto {
  @IsIn(['junior', 'senior'])
  seniority!: 'junior' | 'senior';

  @IsNumber()
  @Transform(({ value }) => Number(value))
  years!: number;

  @IsBoolean({ message: 'availability must be a valid boolean' })
  availability!: boolean;
}
