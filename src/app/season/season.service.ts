import {Injectable} from '@angular/core';
import {BehaviorSubject, of} from "rxjs";

type AvalablesSeasons = '2022' | '2021' | '2020' | '2019' | '2018'

@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  availableSeasons$ = of<AvalablesSeasons[]>(['2022', '2021', '2020', '2019', '2018'])
  selectedSeason = new BehaviorSubject<AvalablesSeasons>('2022');
  selectedSeason$ = this.selectedSeason.asObservable();
}
