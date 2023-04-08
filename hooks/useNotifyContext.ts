import { NotifyContext } from '../context/NotifyContext'
import { useContext } from 'react'

export const useNotifyContext = () => {
  const context = useContext(NotifyContext)


  if(!context){
    throw Error('useNotifyContext must be used inside an NotifyContextProvider')
  }

  const createNotification = (isSuccessArg: boolean,msgArg: string, descArg: string = "") => {
    context.setIsSuccess(isSuccessArg),
    context.setMsg(msgArg),
    context.setDesc(descArg),
    context.setShow(true)
  }

  return {...context, createNotification}
}
