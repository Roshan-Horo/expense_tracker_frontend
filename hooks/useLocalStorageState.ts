import {useState, useEffect, useRef} from 'react'

export default function useLocalStorageState(key : string,defaultValue : any, {serialize = JSON.stringify, deserialize = JSON.parse} = {}){
  const [state, setState] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if(valueInLocalStorage){
       return deserialize(valueInLocalStorage)
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = useRef(key)
  
  useEffect(() => {
    const prevKey = prevKeyRef.current
    if(prevKey !== key){
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    localStorage.setItem(key, serialize(state))

  },[state,key,serialize])

  return [state, setState]
}