import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { Candidate } from '@candidate-db/shared';

@Component({
  selector: 'app-candidate-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="table-container">
      <table
        mat-table
        [dataSource]="dataSource"
        matSort
        class="mat-elevation-8"
      >
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
          <td mat-cell *matCellDef="let candidate">{{ candidate.name }}</td>
        </ng-container>

        <ng-container matColumnDef="surname">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Surname</th>
          <td mat-cell *matCellDef="let candidate">{{ candidate.surname }}</td>
        </ng-container>

        <ng-container matColumnDef="seniority">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Seniority</th>
          <td mat-cell *matCellDef="let candidate">
            {{ candidate.seniority }}
          </td>
        </ng-container>

        <ng-container matColumnDef="years">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Years</th>
          <td mat-cell *matCellDef="let candidate">{{ candidate.years }}</td>
        </ng-container>

        <ng-container matColumnDef="availability">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Available</th>
          <td mat-cell *matCellDef="let candidate">
            {{ candidate.availability ? 'Yes' : 'No' }}
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButtons
      ></mat-paginator>
    </div>
  `,
  styles: [
    `
      .table-container {
        width: 100%;
        overflow-x: auto;
      }

      table {
        width: 100%;
      }
    `,
  ],
})
export class CandidateTableComponent implements AfterViewInit {
  candidates = input.required<Candidate[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'name',
    'surname',
    'seniority',
    'years',
    'availability',
  ];
  dataSource = new MatTableDataSource<Candidate>([]);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.candidates();
  }

  ngOnChanges(): void {
    if (this.dataSource) {
      this.dataSource.data = this.candidates();
    }
  }
}
