import {
  Component,
  input,
  ChangeDetectionStrategy,
  viewChild,
  effect
} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { Candidate } from '@candidate-db/shared';

@Component({
  selector: 'app-candidate-table',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './candidate-table.component.html', 
  styleUrl: './candidate-table.component.scss',
})
export class CandidateTableComponent {
  candidates = input.required<Candidate[]>();

  paginator = viewChild<MatPaginator>('paginator');
  sort = viewChild<MatSort>('sort');

  displayedColumns: string[] = [
    'name',
    'surname',
    'seniority',
    'years',
    'availability',
  ];
  dataSource = new MatTableDataSource<Candidate>([]);

  constructor() {
    effect(
      () => {
        this.dataSource.data = this.candidates();
        this.paginator()?.firstPage();
      },
    );

    effect(
      () => {
        const paginatorInstance = this.paginator();
        const sortInstance = this.sort();

        if (paginatorInstance) {
          this.dataSource.paginator = paginatorInstance;
        }

        if (sortInstance) {
          this.dataSource.sort = sortInstance;
        }
      }
    );
  }
}