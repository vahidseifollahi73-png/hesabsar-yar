import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id?: string }
  if (!id) return res.status(400).json({ error: 'missing_id' })

  try {
    if (req.method === 'GET') {
      const client = await prisma.client.findUnique({ where: { id } })
      if (!client) return res.status(404).json({ error: 'not_found' })
      return res.status(200).json(client)
    }

    if (req.method === 'DELETE') {
      // قبل از حذف: اطمینان از اینکه روابط (مثل فاکتورها) با cascade یا پاک‌سازی مناسب هندل شود.
      // این مثال ساده، سعی می‌کند رکورد را حذف کند؛ اگر FK وجود داشته باشد و مانع حذف شود، خطا برمی‌گردد.
      await prisma.client.delete({ where: { id } })
      return res.status(200).json({ success: true })
    }

    if (req.method === 'PUT') {
      const { title, tin } = req.body
      const updated = await prisma.client.update({
        where: { id },
        data: { title, tin }
      })
      return res.status(200).json(updated)
    }

    res.setHeader('Allow', ['GET', 'DELETE', 'PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (error: any) {
    console.error(error)
    // در صورت وجود محدودیت FK ممکن است خطا رخ دهد — پیام را به کاربر بفرست
    return res.status(500).json({ error: error.message || 'internal_error' })
  }
}