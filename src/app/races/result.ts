import {Driver} from "../drivers/driver";

export interface Result {
  position: string
  points: string

  Time?: { time: string }
  Driver: Driver
}
