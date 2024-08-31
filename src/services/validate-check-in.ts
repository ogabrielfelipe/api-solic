import { CheckInRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { requirements_non_functional } from '@/config'
import { LateCheckInValidateError } from './errors/late-checkIn-validate-error'

interface ValidateCheckInRequest {
  checkInId: string
}

interface ValidateCheckInResponse {
  checkIn: CheckIn
}

export class ValidateCheckInService {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFound()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      requirements_non_functional.type_distance_time_checkIn,
    )

    if (
      distanceInMinutesFromCheckInCreation >
      requirements_non_functional.distance_time_checkIn
    ) {
      throw new LateCheckInValidateError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
