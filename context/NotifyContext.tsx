import { createContext, useState } from 'react'

type NotifyContextProviderProps = {
  children: React.ReactNode
}

type NotifyContextType = {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  msg: string,
  setMsg: React.Dispatch<React.SetStateAction<string>>,
  desc: string,
  setDesc: React.Dispatch<React.SetStateAction<string>>,
  isSuccess: boolean,
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>,
}

export const NotifyContext = createContext({} as NotifyContextType)

export const NotifyContextProvider = ({children}: NotifyContextProviderProps) => {
  const [show, setShow] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [msg, setMsg] = useState("Successfully saved!")
  const [desc, setDesc] = useState("")

  return (
    <NotifyContext.Provider value={{ show, setShow, msg, setMsg, desc, setDesc, isSuccess, setIsSuccess}}>
      {children}
    </NotifyContext.Provider>
  )
}