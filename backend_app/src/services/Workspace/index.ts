import { Prisma } from '../../lib/prisma'

export const WorkspaceService = {
  async clearTables() {
    await Prisma.tempAD.deleteMany()
    await Prisma.tempBIT.deleteMany()
    await Prisma.tempDHCP.deleteMany()
    await Prisma.tempKACE.deleteMany()
    await Prisma.report.deleteMany()
  },
}
