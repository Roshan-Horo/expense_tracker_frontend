
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
  BanknotesIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
import { useLogout } from '../hooks/user/useLogout'
import { useRouter } from 'next/router'
import { useAuthContext } from '../hooks/useAuthContext'

const AdminNavs = [
  { name: 'Dashboard', icon: HomeIcon, current: true, href: '/dashboard' },
  {
    name: 'Users',
    icon: UsersIcon,
    current: false,
    children: [
      { name: 'Customers',current: false, href: '/users/customers' },
      { name: 'Managers', current: false, href: '/users/managers' },
    ],
  },
  {
    name: 'Warehouses',
    icon: HomeModernIcon,
    current: false,
    href: '/warehouses'
  },
  {
    name: 'Requests',
    icon:   ChatBubbleLeftIcon,
    current: false,
    href: '/requests'
  },
  {
    name: 'Reports',
    icon: ChartBarIcon,
    current: false,
    href: '/reports'
  },
  {
    name: 'Settings',
    icon: Cog6ToothIcon,
    current: false,
    children: [
      { name: 'Edit Profile', current: false, href: '/settings/edit_profile' },
    ],
  }

]

const UserNavs = [
  { name: 'Dashboard', icon: HomeIcon, current: true, href: '/dashboard' },
  {
    name: 'Onboard',
    icon: UserCircleIcon,
    current: false,
    href: '/onboard'
  },
  {
    name: 'Expenses',
    icon: BanknotesIcon,
    current: false,
    href: '/expenses'
  },
  {
    name: 'Settings',
    icon: Cog6ToothIcon,
    current: false,
    children: [
      { name: 'Edit Profile', current: false, href: '/settings/edit_profile' },
    ],
  }

]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ children}: {children: React.ReactNode}) {
  const router = useRouter()
  const {user} = useAuthContext()
  const [navigation, setNavigation] = useState(UserNavs)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const {logout} = useLogout()

  //useEffect
  // useEffect(() => {
  //   if(user?.userRole !== 'ADMIN'){
  //     setNavigation(UserNavs)
  //   }
  // },[user])

  function handleLogout(){
    logout()
  }

  const handleNavigationClick = (navigationIndex: number, childNavigationIndex?: number) => {
    let currentPath: string = '';
    const updatedNavigation = navigation.map((nav, index) => {
      if (index === navigationIndex) {
        nav.current = true;
        if (nav.children) {
          nav.children.forEach((childNav, childIndex) => {
            if(childNavigationIndex !== undefined){
              if (childIndex === childNavigationIndex) {
                childNav.current = true;
                currentPath = childNav.href;
              } else {
                childNav.current = false;
              }
            }
          });
        }else{
          currentPath = nav.href
        }
      } else {
        nav.current = false;
        if (nav.children) {
          nav.children.forEach((childNav) => {
            childNav.current = false;
          });
        }
      }
      return nav;
    });
    setNavigation(updatedNavigation);
    if(currentPath !== 'undefined'){
      router.push(currentPath)
    }
    setSidebarOpen(false)

  };

  return (
    <>
         <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
  
              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                          type="button"
                          className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="sr-only">Close sidebar</span>
                          <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                      <div className="flex flex-shrink-0 items-center px-4">
                        {/* <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                          alt="Your Company"
                        /> */}
                        <span className="sr-only">App</span>
                      </div>
                      <nav className="mt-5 space-y-1 px-2">
                        {navigation.map((item, index) => 
  
                        !item.children ? (
                          <div key={item.name}>
                            <button
                              onClick={() => handleNavigationClick(index)}
                              className={classNames(
                                item.current
                                  ? 'bg-indigo-800 text-white'
                                  : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75',
                                'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  item.current ? 'text-indigo-300' : 'text-white group-hover:text-white',
                                  'mr-3 flex-shrink-0 h-6 w-6'
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </button>
                          </div>
                        ) : (
                          <>
                          <Disclosure as="div" key={index} className="space-y-1">
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  onClick={() =>  handleNavigationClick(index)}
                                  className={classNames(
                                    item.current
                                      ? 'bg-indigo-800 text-white'
                                      : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75',
                                    'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md'
                                  )}
                                >
                                  <item.icon
                                    className="mr-3 h-6 w-6 flex-shrink-0 text-white"
                                    aria-hidden="true"
                                  />
                                  <span className="flex-1">{item.name}</span>
                                  <svg
                                    className={classNames(
                                      open ? 'bg-indigo-800 text-white rotate-90' : 'text-white',
                                      'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400'
                                    )}
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                  >
                                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                                  </svg>
                                </Disclosure.Button>
                                <Disclosure.Panel className="space-y-1">

                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                            {item.children.map((subItem, childIndex) => (
                            item.current && (
                            <button
                              onClick={() => handleNavigationClick(index, childIndex)}
                              key={subItem.name}
                              className={classNames(subItem.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75', 'group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium')}
                            >
                              {subItem.name}
                            </button> )
                          ))} 
                          </>
                        )
                        
                        )}
                      </nav>
                    </div>
                    <div className="flex flex-shrink-0 border-t border-indigo-800 p-4">
                      {/* <a href="#" className="group block flex-shrink-0">
                        <div className="flex items-center">
                          <div>
                            <img
                              className="inline-block h-10 w-10 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-base font-medium text-white">Tom Cook</p>
                            <p className="text-sm font-medium text-indigo-200 group-hover:text-white">View profile</p>
                          </div>
                        </div>
                      </a> */}
  
                          <div className="w-full">
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                false
                                  ? 'bg-indigo-800 text-white'
                                  : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75',
                                'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                              )}
                            >
                              <ArrowLeftOnRectangleIcon
                                className={classNames(
                                  false ? 'text-indigo-300' : 'text-white group-hover:text-white',
                                  'mr-3 flex-shrink-0 h-6 w-6'
                                )}
                                aria-hidden="true"
                              />
                              Logout
                            </button>
                          </div>
  
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
                <div className="w-14 flex-shrink-0" aria-hidden="true">
                  {/* Force sidebar to shrink to fit close icon */}
                </div>
              </div>
            </Dialog>
          </Transition.Root>
  
          {/* Static sidebar for desktop */}
          <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex min-h-0 flex-1 flex-col bg-indigo-700">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                    alt="Your Company"
                  /> */}
                  <span className="text-4xl font-bold tracking-wider text-gray-400"><span className="text-white">A</span>pp</span>
                </div>
                <nav className="mt-5 flex-1 space-y-1 px-2">
                  {navigation.map((item, index) => 
  
                  !item.children ? (
                    <div key={item.name}>
                      <button
                        onClick={() => handleNavigationClick(index)}
                        className={classNames(
                          item.current
                            ? 'bg-indigo-800 text-white'
                            : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75',
                          'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? 'text-indigo-300' : 'text-white group-hover:text-white',
                            'mr-3 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </button>
                    </div>
                  ) : (
                    <>
                    <Disclosure as="div" key={index} className="space-y-1">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            onClick={() =>  handleNavigationClick(index)}
                            className={classNames(
                              item.current
                                ? 'bg-indigo-800 text-white'
                                : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75',
                              'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md'
                            )}
                          >
                            <item.icon
                              className="mr-3 h-6 w-6 flex-shrink-0 text-white"
                              aria-hidden="true"
                            />
                            <span className="flex-1">{item.name}</span>
                            <svg
                              className={classNames(
                                open ? 'bg-indigo-800 text-white rotate-90' : 'text-white',
                                'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400'
                              )}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                            </svg>
                          </Disclosure.Button>
                          <Disclosure.Panel className="space-y-1" >
                            {/* {item.children.map((subItem, childIndex) => (
                              <Disclosure.Button
                                onClick={() => handleNavigationClick(index, childIndex)}
                                key={subItem.name}
                                as="button"
                                className={classNames(subItem.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75', 'group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium')}
                              >
                                {subItem.name}
                              </Disclosure.Button>
                            ))}  */}
                          </Disclosure.Panel>
                        </>
                       )}
                    </Disclosure>
                     {item.children.map((subItem, childIndex) => (
                        item.current && (
                        <button
                          onClick={() => handleNavigationClick(index, childIndex)}
                          key={subItem.name}
                          className={classNames(subItem.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75', 'group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium')}
                        >
                          {subItem.name}
                        </button> )
                      ))} 
                    </>
                  )
                  
                  )}
                </nav>
              </div>
              <div className="flex flex-shrink-0 border-t border-indigo-800 p-4">
                {/* <a href="#" className="group block w-full flex-shrink-0">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">Tom Cook</p>
                      <p className="text-xs font-medium text-indigo-200 group-hover:text-white">View profile</p>
                    </div>
                  </div>
                </a> */}
  
                          <div className="w-full">
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                false
                                  ? 'bg-indigo-800 text-white'
                                  : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75',
                                'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                              )}
                            >
                              <ArrowLeftOnRectangleIcon
                                className={classNames(
                                  false ? 'text-indigo-300' : 'text-white group-hover:text-white',
                                  'mr-3 flex-shrink-0 h-6 w-6'
                                )}
                                aria-hidden="true"
                              />
                              Logout
                            </button>
                          </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col md:pl-64">
            <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
              <button
                type="button"
                className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>


            <main className="flex-1">
              <div className="py-6">

              {children}

              </div>
            </main>

          </div>
        </div>
    </>
  )
}
