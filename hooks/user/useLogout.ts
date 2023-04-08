import { useRouter } from 'next/router'
import { LOGOUT_DESC, LOGOUT_MSG } from '../../constants/notifyConstants'
import { useAuthContext } from '../useAuthContext'
import { useNotifyContext } from '../useNotifyContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { createNotification } = useNotifyContext()
  const router = useRouter()
  
  const logout = () => {
    // clear the localStorage about the user info, cardholder info and wallet info
    localStorage.removeItem('user')

    // update the user info 
    dispatch({ type: 'LOGOUT'})

    // show logout notification
    createNotification(true, LOGOUT_MSG, LOGOUT_DESC);

    // send to the login page
    router.push('/')
  }

  return { logout }
}