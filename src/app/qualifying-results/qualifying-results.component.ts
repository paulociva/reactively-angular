import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {combineLatest, debounceTime, map, switchMap} from "rxjs";

import {F1ApiService} from "../f1-api/f1-api.service";
import {RacesService} from "../races/races.service";
import {PaginatorService} from "../paginator/paginator.service";

@Component({
  selector: 'app-qualifying-results',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  providers: [PaginatorService],
  templateUrl: './qualifying-results.component.html',
  styles: [`.mat-mdc-table {
      background-color: #f5f5f5;
    }`]
})
export class QualifyingResultsComponent {
  vm$ = combineLatest([
    this.racesService.selectedSeasonAndRaceRound$.pipe(
      this.paginatorService.resetPageIndex(this.paginatorService.paginator)
    ),
    this.paginatorService.paginator$
  ]).pipe(
    debounceTime(0),
    switchMap(([[season, round], page]) =>
      this.f1Api.getQualifyingBySeasonAndRound(season, round, page.pageSize, page.pageIndex * page.pageSize)
    ),
    map(results => ({
      results: new MatTableDataSource(results.MRData.RaceTable.Races[0].QualifyingResults?.map(result => ({
        ...result,
        driver: result.Driver.givenName + ' ' + result.Driver.familyName,
      }))),
      total: results.MRData.total
    }))
  )
  protected readonly columnsToDisplay = ['position', 'driver', 'Q1', 'Q2', 'Q3'];

  constructor(
    private f1Api: F1ApiService,
    protected paginatorService: PaginatorService,
    private racesService: RacesService
  ) {
  }
}
