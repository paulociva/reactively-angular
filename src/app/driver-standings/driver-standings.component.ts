import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {combineLatest, debounceTime, map, switchMap} from "rxjs";
import {RacesService} from "../races/races.service";
import {F1ApiService} from "../f1-api/f1-api.service";
import {PaginatorService} from "../paginator/paginator.service";

@Component({
  selector: 'app-driver-standings',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  providers: [PaginatorService],
  templateUrl: './driver-standings.component.html',
  styles: [`.mat-mdc-table {
      background-color: #f5f5f5;
    }`]
})
export class DriverStandingsComponent {
  vm$ = combineLatest([
    this.racesService.selectedSeasonAndRaceRound$.pipe(
      this.paginatorService.resetPageIndex(this.paginatorService.paginator)
    ),
    this.paginatorService.paginator$
  ]).pipe(
    debounceTime(0),
    switchMap(([[season, round], page]) =>
      this.f1Api.getStandingsBySeasonAndRound(season, round, page.pageSize, page.pageIndex * page.pageSize)
    ),
    map(results => ({
      results: new MatTableDataSource(results.MRData.StandingsTable.StandingsLists[0].DriverStandings?.map(result => ({
        ...result,
        driver: result.Driver.givenName + ' ' + result.Driver.familyName
      }))),
      total: results.MRData.total
    }))
  )
  protected readonly columnsToDisplay = ['position', 'driver', 'points', 'wins'];

  constructor(
    private f1Api: F1ApiService,
    protected paginatorService: PaginatorService,
    private racesService: RacesService
  ) {
  }

}
