import { useAuthContext } from "../../hooks/useAuthContext"
import {useState} from 'react'
import { useNotifyContext } from "../../hooks/useNotifyContext"
import { useLogin } from "../../hooks/user/useLogin"

export type UpdateLocationType = {
  line1: string,
  line2: string,
  state: string,
  city: string,
  pincode: number
}

export default function Settings(){


  return (
    <>
     
     <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Edit Profile</h1>
     </div>

     <div>

     </div>

    </>
  )
}