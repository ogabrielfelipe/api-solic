import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { prisma } from '@/lib/prisma'

import { requirements_non_functional as rnf } from '@/config/index'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })
    return gym
  }

  async findManyNearby({ userLatitude, userLongitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
       SELECT * from gyms
       WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) ) <= ${rnf.nearby_distance_gym}
    `
    return gyms
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: rnf.items_page,
      skip: (page - 1) * rnf.items_page,
    })
    return gyms
  }

  async findById(gymId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    })
    return gym
  }
}
