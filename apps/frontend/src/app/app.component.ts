import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CandidateContainerComponent } from './components/candidate-container/candidate-container.component';

@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, CandidateContainerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent { }
