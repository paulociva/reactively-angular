import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-race-results',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './race-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceResultsComponent {
  protected readonly columnsToDisplay = ['position', 'driver', 'points', 'time']
  protected _results = new MatTableDataSource<{ position: string, driver: string }>();

  @Input() set results(results: { position: string, driver: string }[]) {
    this._results = new MatTableDataSource(results)
  }
}
