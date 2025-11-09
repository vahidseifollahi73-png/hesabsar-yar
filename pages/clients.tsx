import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

type Client = {
  id: string
  title: string
  tin?: string | null
  createdAt: string
  updatedAt: string
}

const ClientsPage: NextPage = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [tin, setTin] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchClients = async () => {
    setLoading(true)
    setError(null)
    try {
      // ابتدا تلاش برای API داخلی (در صورت اجرای سرور)
      const res = await fetch('/api/clients')
      if (!res.ok) throw new Error('api_failed')
      const data = (await res.json()) as Client[]
      setClients(data)
    } catch {
      // fallback به فایل استاتیک public/clients.json برای پیش‌نمایش روی GitHub Pages
      try {
        const res2 = await fetch('/clients.json')
        if (!res2.ok) throw new Error('static_failed')
        const data2 = (await res2.json()) as Client[]
        setClients(data2)
      } catch (err: any) {
        setError('خطا در بارگذاری داده‌ها')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return setError('نام مشتری لازم است')
    setSubmitting(true)
    setError(null)
    try {
      // در حالت استاتیک امکان POST وجود ندارد؛ فقط فرم را در پیش‌نمایش پاک می‌کنیم و عنصر جدید را به لیست محلی اضافه می‌کنیم
      const newClient: Client = {
        id: String(Math.random()).slice(2),
        title: title.trim(),
        tin: tin.trim() || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      setClients(prev => [newClient, ...prev])
      setTitle('')
      setTin('')
    } catch (err: any) {
      setError(err.message || 'خطا')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این مشتری مطمئن هستید؟')) return
    // در پیش‌نمایش استاتیک فقط از لیست محلی حذف می‌کنیم
    setClients(prev => prev.filter(c => c.id !== id))
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">مشتریان</h2>

      <section className="mb-6">
        <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-700 mb-1">نام مشتری</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2 border rounded bg-white"
              placeholder="مثال: شرکت نمونه"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">شناسه / ثبت (TIN)</label>
            <input
              value={tin}
              onChange={e => setTin(e.target.value)}
              className="w-full p-2 border rounded bg-white"
              placeholder="اختیاری"
            />
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? 'در حال ثبت...' : 'ثبت مشتری جدید'}
            </button>
          </div>
        </form>
        {error && <div className="mt-2 text-red-600">{error}</div>}
      </section>

      <section>
        {loading ? (
          <div>در حال بارگذاری...</div>
        ) : clients.length === 0 ? (
          <div className="p-4 bg-white rounded shadow">مشتری‌ای ثبت نشده است.</div>
        ) : (
          <div className="space-y-3">
            {clients.map(client => (
              <div key={client.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                <div>
                  <div className="font-medium">{client.title}</div>
                  <div className="text-sm text-gray-500">شناسه: {client.tin || '—'}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-2">ثبت‌شده: {dayjs(client.createdAt).format('YYYY-MM-DD')}</div>
                  <div className="space-x-2">
                    <button
                      onClick={() => navigator.clipboard?.writeText(client.id)}
                      title="کپی شناسه"
                      className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                    >
                      کپی شناسه
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
                      title="حذف"
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default ClientsPage