import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>حسابرِس‌یار</title>
      </Head>
      <div dir="rtl" className="min-h-screen bg-gray-50 text-gray-900">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp