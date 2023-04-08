import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContextProvider } from '../context/UserContext'
import Layout from '../components/Layout'
import Layout2 from '../components/Layout'
import Notify from '../components/Notify'
import { NotifyContextProvider } from '../context/NotifyContext'


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <UserContextProvider> {/** User Context */}
      <NotifyContextProvider> {/** Notify Context */}
      {/** Layout Components */}
      {/* <Layout >  */}
      <Layout2>
      <Component {...pageProps} />
      </Layout2>

      {/* </Layout> */}
      <Notify />
      </NotifyContextProvider>
    </UserContextProvider>
  )
}

export default MyApp
