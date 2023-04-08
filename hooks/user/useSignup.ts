import { useRouter } from 'next/router'
import { useState } from 'react'
import { CONNECTION_FAILED, CONNECTION_FAILED_DESC, SIGNUP_DESC, SIGNUP_MSG } from '../../constants/notifyConstants'
import { useAuthContext } from '../useAuthContext'
import { useNotifyContext } from '../useNotifyContext'
import { SIGNIN_PATH, SIGNUP_PATH} from '../../constants/apiPathConstants'

type UserData = {
  name: {
    first: string,
    middle: string,
    last: string
  }
  email: string,
  passcode: string,
  mobile: string,
}

export const useSignup = () => {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()
  const { createNotification } = useNotifyContext()

  const signup = async ({name, mobile, email, passcode }: UserData) => {
    try {
      setIsLoading(true)
      setError(null)
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${SIGNUP_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, mobile, email, passcode})
      })
  
      const json = await res.json()
  
      if(!res.ok){
        setIsLoading(false)
        setError(json.msg)
        createNotification(false, "Something Wrong", json.msg)
      }
  
      if(res.ok){
        if(json.status){
          // save user data into localstorage
          localStorage.setItem('user', JSON.stringify(json.data))

          // update the auth context
          dispatch({ type: 'LOGIN', payload: json.data })
  
          // show signup notification
          createNotification(true, SIGNUP_MSG, SIGNUP_DESC)
    
          setIsLoading(false)
          router.push('/dashboard')
        }else{
          createNotification(false, "Something Wrong", json.msg)
        }

      } 
    } catch (error) {
      // show error to user
      console.log('error : ', error)
      createNotification(false, CONNECTION_FAILED, CONNECTION_FAILED_DESC)
      setIsLoading(false)
    }

  }

  return { signup, isLoading, error}
}
