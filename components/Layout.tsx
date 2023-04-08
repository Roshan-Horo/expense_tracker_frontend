/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
  Cog6ToothIcon,
  ChatBubbleLeftIcon,
  HomeModernIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
import Header from './Header'
import { useAuthContext } from '../hooks/useAuthContext'
import { useRouter } from 'next/router'
import Sidebar from './Sidebar'

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, current: false, href: '#' },
  {
    name: 'Users',
    icon: UsersIcon,
    current: false,
    children: [
      { name: 'Customers', href: '#' },
      { name: 'Managers', href: '#' },
    ],
  },
  {
    name: 'Warehouses',
    icon: HomeModernIcon,
    current: true,
  },
  {
    name: 'Requests',
    icon:   ChatBubbleLeftIcon,
    current: false,
    children: [
      { name: 'All Requests', href: '#' },
      { name: 'Pending', href: '#' },
      { name: 'Approved', href: '#' },
      { name: 'Declined', href: '#' },
    ],
  },
  {
    name: 'Reports',
    icon: ChartBarIcon,
    current: false,
  },
  {
    name: 'Settings',
    icon: Cog6ToothIcon,
    current: false,
    children: [
      { name: 'Edit Profile', href: '#' },
    ],
  },

]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout({children}: {children: React.ReactNode}) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, dispatch } = useAuthContext()

  useEffect(() => {
    const storedUserData = localStorage.getItem('user')
    if(storedUserData){
      const data = JSON.parse(storedUserData)
      dispatch({ type: 'LOGIN', payload: data})
      router.push('/dashboard')
    }
  },[])

  useEffect(() => {
    if(user){
      router.push('/dashboard')
    }else{
      router.push('/')
    }
  },[user])

  return (
    <>
      {
        user ? (
          <Sidebar>
            {children}
          </Sidebar>
        ) : (
          <div>
            <Header />

            {children}
          </div>
        )
      }

    </>
  )
}
