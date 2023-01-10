import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Race} from "../races/race";
import {DriverStandings} from "../driver-standings/driver-standings";
import {Driver} from "../drivers/driver";

@Injectable({
  providedIn: 'root'
})
export class F1ApiService {

  private readonly BASE_URL = 'https://ergast.com/api/f1'

  constructor(private httpClient: HttpClient) {
  }

  getDriversBySeason(season: string, limit = 10, offset = 0) {
    return this.httpClient.get<{ MRData: { DriverTable: { Drivers: Driver[] }, total: number } }>
    (this.BASE_URL + `/${season}/drivers.json?limit=${limit}&offset=${offset}`)
  }

  getRacesBySeason(season: string, limit = 10, offset = 0) {
    return this.httpClient.get<{ MRData: { RaceTable: { Races: Race[] }, total: number } }>
    (this.BASE_URL + `/${season}.json?limit=${limit}&offset=${offset}`)
  }

  getResultsBySeasonAndRound(season: string, round: string) {
    return this.httpClient.get<{ MRData: { RaceTable: { Races: Race[] }, total: number } }>
    (this.BASE_URL + `/${season}/${round}/results.json`)
  }

  getQualifyingBySeasonAndRound(season: string, round: string, limit = 10, offset = 0) {
    return this.httpClient.get<{ MRData: { RaceTable: { Races: Race[] }, total: number } }>
    (this.BASE_URL + `/${season}/${round}/qualifying.json?limit=${limit}&offset=${offset}`)
  }

  getStandingsBySeasonAndRound(season: string, round: string, limit = 10, offset = 0) {
    return this.httpClient.get<{ MRData: { StandingsTable: { StandingsLists: [{ DriverStandings: DriverStandings[] }] }, total: number } }>
    (this.BASE_URL + `/${season}/${round}/driverStandings.json?limit=${limit}&offset=${offset}`)
  }

  getStatusBySeason(season: string) {
    return this.httpClient.get<{ MRData: { StatusTable: { Status: { status: string, count: string }[] } } }>
    (this.BASE_URL + `/${season}/status.json`)
  }
}

