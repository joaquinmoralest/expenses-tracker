import Head from 'next/head'
import Navbar from './Navbar/Navbar'

function Layout ({ title, siteTitle, description, children }) {
  return (
    <>
      <Head>
        <title>{`${title} | ${siteTitle}`}</title>
        <meta name="description" content={description} />
      </Head>

      <Navbar />
      {children}
    </>
  )
}

export default Layout
