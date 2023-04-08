import { createContext, ReactNode, useEffect, useReducer, useState, useContext } from 'react'
import { LOGIN, LOGOUT} from '../constants/contextConstants'

export type AuthUser = {
  email: string,
  isAdmin: boolean
  mobile: string,
  name: {
    first: string,
    middle: string,
    last: string
  }
  token: string,
  _id: string
}

type UserContextType = {
  user: AuthUser | null,
  dispatch: React.Dispatch<ActionType>
}

type UserContextProviderprops = {
  children: ReactNode
}

// reducer
type UserState = {
  user: AuthUser | null,
}

const initialUserState = {
  user: null,
}

type UpdateActionType = {
  type: 'LOGIN',
  payload: AuthUser
}

type NoUpdateActionType = {
  type: 'LOGOUT'
}


type ActionType = UpdateActionType | NoUpdateActionType 

const userReducer = (state: UserState, action: ActionType) => {
  switch(action.type) {
    case LOGIN:
      return { ...state, user: action.payload}
    case LOGOUT: 
      return { ...state, user: null}
    default:
      return state
  }
}


export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderprops) => {

  const [state, dispatch] = useReducer(userReducer, initialUserState)

  return (
    <UserContext.Provider value={{ ...state, dispatch}}>
      { children }
    </UserContext.Provider>
  )

}
