import { requirements_non_functional } from '@/config'

export class LateCheckInValidateError extends Error {
  constructor() {
    super(
      `Check-in cannot be validated after ${requirements_non_functional.distance_time_checkIn} ${requirements_non_functional.type_distance_time_checkIn}`,
    )
  }
}
