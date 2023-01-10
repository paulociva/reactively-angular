import {Driver} from "../drivers/driver";

export interface QualifyingResults {
  number: string
  position: string
  Q1: string
  Q2?: string
  Q3?: string
  Driver: Driver
}
