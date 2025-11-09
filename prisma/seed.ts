import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.client.createMany({
    data: [
      { title: 'شرکت نمونه', tin: '0123456789' },
      { title: 'مشتری تست', tin: '9876543210' }
    ],
    skipDuplicates: true
  })
  console.log('Seed finished.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })