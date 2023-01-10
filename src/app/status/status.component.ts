import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatListModule} from "@angular/material/list";
import {BehaviorSubject, catchError, iif, map, of, switchMap, tap, throwError} from "rxjs";

import {F1ApiService} from "../f1-api/f1-api.service";
import {SeasonService} from "../season/season.service";

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './status.component.html',
})
export class StatusComponent {
  protected readonly statusToDisplay = ['Finished', 'Accident', '+1 Lap']
  protected errorMessage = new BehaviorSubject<string>('');
  errorMessage$ = this.errorMessage.asObservable();
  status$ = this.seasonService.selectedSeason$.pipe(
    tap(() => this.errorMessage.next('')),
    switchMap(season =>
      iif(
        () => season === '2021',
        of(season),
        throwError(() => `Status about season ${season} not available`)
      ).pipe(
        switchMap(season => this.f1ApiService.getStatusBySeason(season)),
        map(status => ({
          status: status.MRData.StatusTable.Status
            .filter(status => this.statusToDisplay.includes(status.status))
        })),
        catchError(err => {
          this.errorMessage.next(err)
          return of(null)
        })
      )
    )
  );

  constructor(
    private f1ApiService: F1ApiService,
    private seasonService: SeasonService
  ) {
  }
}
