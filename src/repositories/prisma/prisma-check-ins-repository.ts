import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'
import { requirements_non_functional as rnf } from '@/config/index'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInRepository {
  async findById(checkInId: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    })
    return checkIn
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })
    return checkIn
  }

  async save(checkIn: CheckIn) {
    const checkInSave = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    })
    return checkInSave
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const CheckIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: rnf.items_page,
      skip: (page - 1) * rnf.items_page,
    })
    return CheckIns
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })
    return count
  }
}
