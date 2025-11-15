import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CandidateContainerComponent } from './components/candidate-container/candidate-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, CandidateContainerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-toolbar color="primary">
      <span>Candidate Personal DB</span>
    </mat-toolbar>

    <main>
      <app-candidate-container></app-candidate-container>
    </main>
  `,
  styles: [
    `
      main {
        min-height: calc(100vh - 64px);
        background-color: #f5f5f5;
      }
    `,
  ],
})
export class AppComponent {}
