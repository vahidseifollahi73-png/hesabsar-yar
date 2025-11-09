import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">حسابرِس‌یار</h1>
        <p className="text-gray-600 mt-2">دستیار وب برای تسهیل فرایندهای حسابرسی و گزارش‌گیری</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/clients">
          <a className="p-4 bg-white rounded shadow hover:shadow-md">مشتریان</a>
        </Link>
        <Link href="/invoices">
          <a className="p-4 bg-white rounded shadow hover:shadow-md">اسناد / فاکتورها</a>
        </Link>
        <Link href="/reports">
          <a className="p-4 bg-white rounded shadow hover:shadow-md">گزارش‌ها</a>
        </Link>
        <Link href="/audit-log">
          <a className="p-4 bg-white rounded shadow hover:shadow-md">تاریخچه (Audit Log)</a>
        </Link>
      </section>
    </main>
  )
}

export default Home