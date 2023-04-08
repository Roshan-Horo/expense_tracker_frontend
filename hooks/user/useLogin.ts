import { useRouter } from 'next/router'
import { useState } from 'react'
import { CONNECTION_FAILED, CONNECTION_FAILED_DESC, LOGIN_DESC, LOGIN_MSG } from '../../constants/notifyConstants'
import { useAuthContext } from '../useAuthContext'
import { useNotifyContext } from '../useNotifyContext'
import { SIGNIN_PATH } from '../../constants/apiPathConstants'
import { ManagerData } from '../../data/state'
import { AuthUser } from '../../context/UserContext'

type UpdateLocationType = {
  line1: string,
  line2: string,
  state: string,
  city: string,
  pincode: number
}

export const useLogin = () => {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()
  const { createNotification } = useNotifyContext()

  const login = async (email: string, passcode: string) => {

    try {

      setIsLoading(true)
      setError(null)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${SIGNIN_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, passcode})
      })
  
      const json = await res.json()
  
      if(!res.ok){
        setIsLoading(false)
        setError(json.msg)
      }
  
      if(res.ok){

        if(json.status){
        // save the user info into localStorage
        localStorage.setItem('user', JSON.stringify(json.data))
  
        // update the user context
        dispatch({ type: 'LOGIN', payload: json.data})

        // show notification for Login
        createNotification(true, LOGIN_MSG, LOGIN_DESC)

        // send into dashboard page
        setIsLoading(false)
        router.push('/dashboard')
        }

      } 
    } catch (error) {
      // show error to user
      createNotification(false, CONNECTION_FAILED, CONNECTION_FAILED_DESC)
      setIsLoading(false)
    }

  }


  return { login, isLoading, error}
}
