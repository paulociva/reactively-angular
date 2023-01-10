import {Result} from "./result";
import {QualifyingResults} from "../qualifying-results/qualifying-results";

export interface Race {
  season: string
  round: string
  url: string
  raceName: string
  Results?: Result[]
  QualifyingResults?: QualifyingResults[]
}
