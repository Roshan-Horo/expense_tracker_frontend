import { useRouter } from 'next/router'
import { useState } from 'react'
import { CONNECTION_FAILED, CONNECTION_FAILED_DESC, SIGNUP_DESC, SIGNUP_MSG, ACCOUNT_CREATED, SUCCESS, FAILED, EXPENSE_ADDED_MSG, EXPENSE_ADDED_DESC } from '../../constants/notifyConstants'
import { useAuthContext } from '../useAuthContext'
import { useNotifyContext } from '../useNotifyContext'
import { CREATE_USER_ACCOUNT_PATH, GET_USER_ACCOUNT_PATH} from '../../constants/apiPathConstants'
import {AccountType, ExpenseType} from '../../pages/onboard/index'

type AddExpenseType = {
  _id: string,
  fixedExpenses: ExpenseType[],
  variableExpenses: ExpenseType[]
}

export const useAccount = () => {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [account, setAccount] = useState<AccountType | null>(null)
  const { user } = useAuthContext()
  const { createNotification } = useNotifyContext()

  const createAccount = async (data: AccountType) => {
    try {
      setIsLoading(true)
      setError(null)
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${CREATE_USER_ACCOUNT_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify(data)
      })
  
      const json = await res.json()
  
      if(!res.ok){
        setIsLoading(false)
        setError(json.msg)
        createNotification(false, "Something Wrong", json.msg)
      }
  
      if(res.ok){
        if(json.status){
  
          // show signup notification
          createNotification(true, SUCCESS ,ACCOUNT_CREATED)
    
          setIsLoading(false)
        }else{
          createNotification(false, FAILED, json.msg)
        }

      } 
    } catch (error) {
      // show error to user
      console.log('error : ', error)
      createNotification(false, CONNECTION_FAILED, CONNECTION_FAILED_DESC)
      setIsLoading(false)
    }

  }

  const getAccount = async () => {
    try {
      setIsLoading(true)
      setError(null)
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${GET_USER_ACCOUNT_PATH}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
      })
  
      const json = await res.json()
  
      if(!res.ok){
        setIsLoading(false)
        setError(json.msg)
        createNotification(false, "Something Wrong", json.msg)
      }
  
      if(res.ok){
        if(json.status){
  
          // show signup notification
          // createNotification(true, SUCCESS ,ACCOUNT_CREATED)
          setAccount(json.data)
          setIsLoading(false)
        }

      } 
    } catch (error) {
      // show error to user
      console.log('error : ', error)
      createNotification(false, CONNECTION_FAILED, CONNECTION_FAILED_DESC)
      setIsLoading(false)
    }

  }

  const addExpense = async (data: { data: AddExpenseType[]}) => {
    try {
      setIsLoading(true)
      setError(null)
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${GET_USER_ACCOUNT_PATH}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify(data)
      })
  
      const json = await res.json()
  
      if(!res.ok){
        setIsLoading(false)
        setError(json.msg)
        createNotification(false, "Something Wrong", json.msg)
      }
  
      if(res.ok){
        if(json.status){
  
          // show signup notification
          createNotification(true, EXPENSE_ADDED_MSG, EXPENSE_ADDED_DESC)
    
          setIsLoading(false)
        }else{
          createNotification(false, FAILED, json.msg)
        }

      } 
    } catch (error) {
      // show error to user
      console.log('error : ', error)
      createNotification(false, CONNECTION_FAILED, CONNECTION_FAILED_DESC)
      setIsLoading(false)
    }  
  }

  return { createAccount, isLoading, error, getAccount, account, addExpense}
}
