import {Component} from '@angular/core';
import {SeasonService} from "./season/season.service";
import {RacesService} from "./races/races.service";
import {ActivationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`:host {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin: 0 auto;
      position: relative;
      max-width: 1260px;
      padding: 0 2.5em;

      .mat-toolbar {
        margin-bottom: 1em;
        gap: 1em;
      }
    }`]
})
export class AppComponent {

  showRaceSelector$ = this.router.events.pipe(
    filter((event) => event instanceof ActivationEnd),
    map(event => (event as ActivationEnd).snapshot.data['showRaceSelector'] || false),
  )

  constructor(
    protected racesService: RacesService,
    protected router: Router,
    protected seasonService: SeasonService
  ) {
  }
}
