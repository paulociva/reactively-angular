import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {combineLatest, debounceTime, map, switchMap} from "rxjs";

import {F1ApiService} from "../f1-api/f1-api.service";
import {SeasonService} from "../season/season.service";
import {PaginatorService} from "../paginator/paginator.service";

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  providers: [PaginatorService],
  templateUrl: './drivers.component.html',
  styles: [`.mat-mdc-table {
      background-color: #f5f5f5;
    }`]
})
export class DriversComponent {
  vm$ = combineLatest([
    this.seasonService.selectedSeason$.pipe(
      this.paginatorService.resetPageIndex(this.paginatorService.paginator)
    ),
    this.paginatorService.paginator$
  ]).pipe(
    debounceTime(0),
    switchMap(([season, page]) =>
      this.f1Api.getDriversBySeason(season, page.pageSize, page.pageIndex * page.pageSize)
    ),
    map(drivers => ({
      results: new MatTableDataSource(drivers.MRData.DriverTable.Drivers.map(driver => ({
        driver: driver.givenName + ' ' + driver.familyName,
        nationality: driver.nationality,
        number: driver.permanentNumber
      }))),
      total: drivers.MRData.total
    }))
  );
  protected readonly columnsToDisplay: string[] = ['number', 'driver', 'nationality'];

  constructor(
    private f1Api: F1ApiService,
    protected paginatorService: PaginatorService,
    private seasonService: SeasonService
  ) {
  }
}
