import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, map, switchMap, tap} from "rxjs";

import {SeasonService} from "../season/season.service";
import {F1ApiService} from "../f1-api/f1-api.service";

@Injectable({
  providedIn: 'root'
})
export class RacesService {
  selectedRaceRound = new BehaviorSubject('1');
  selectedRaceRound$ = this.selectedRaceRound.asObservable();
  selectedSeasonAndRaceRound$ = combineLatest([
    this.seasonService.selectedSeason$,
    this.selectedRaceRound$
  ]);
  allRaces$ = this.seasonService.selectedSeason$.pipe(
    tap(() => this.selectedRaceRound.next('1')),
    switchMap(season => this.f1Api.getRacesBySeason(season, 100)),
    map(racesRes => racesRes.MRData.RaceTable.Races)
  );

  constructor(
    private f1Api: F1ApiService,
    private seasonService: SeasonService
  ) {
  }
}
