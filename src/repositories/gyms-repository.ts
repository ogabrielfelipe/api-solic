import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  userLatitude: number
  userLongitude: number
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
  searchMany(query: string, page: number): Promise<Gym[]>
  findById(gymId: string): Promise<Gym | null>
}
