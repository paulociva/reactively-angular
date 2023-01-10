import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {BehaviorSubject, combineLatest, debounceTime, filter, map, switchMap, tap} from "rxjs";
import {RaceResultsComponent} from "./race-results.component";
import {F1ApiService} from "../f1-api/f1-api.service";
import {SeasonService} from "../season/season.service";
import {PaginatorService} from "../paginator/paginator.service";

@Component({
  selector: 'app-races',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, RaceResultsComponent, MatProgressSpinnerModule],
  providers: [PaginatorService],
  templateUrl: './races.component.html',
  styles: [`.mat-mdc-table {
      background-color: #f5f5f5;
    }`]
})
export class RacesComponent {
  protected readonly columnsToDisplay = ['round', 'name', 'options'];
  protected expandedRaceRound = new BehaviorSubject<string>('');
  races$ = combineLatest([
    this.seasonService.selectedSeason$.pipe(
      this.paginatorService.resetPageIndex(this.paginatorService.paginator)
    ),
    this.paginatorService.paginator$
  ]).pipe(
    debounceTime(0),
    tap(() => this.expandedRaceRound.next('')),
    switchMap(([season, page]) =>
      this.f1Api.getRacesBySeason(season, page.pageSize, page.pageIndex * page.pageSize)
    ),
    map(races => ({
        races: new MatTableDataSource(races.MRData.RaceTable.Races.map(race => ({
          season: race.season,
          round: race.round,
          name: race.raceName,
          options: 'Show Results'
        }))),
        total: races.MRData.total
      })
    )
  );
  results$ = combineLatest([
    this.seasonService.selectedSeason$,
    this.expandedRaceRound.asObservable()
  ]).pipe(
    debounceTime(400),
    filter(([, round]) => !!round),
    switchMap(([season, round]) =>
      this.f1Api.getResultsBySeasonAndRound(season, round)
    ),
    map(results => results.MRData.RaceTable.Races[0].Results?.map(result => ({
      position: result.position,
      driver: result.Driver.givenName + ' ' + result.Driver.familyName,
      points: result.points,
      time: result.Time?.time || ''
    })))
  );

  constructor(
    private f1Api: F1ApiService,
    protected paginatorService: PaginatorService,
    private seasonService: SeasonService
  ) {
  }
}
