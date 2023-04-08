import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useAccount } from '../../hooks/account/useAccount'
import ShowTransactions from '../../components/ShowTransactions'

type DocumentType = {
  Key: string
}

let fixedExpenses:any = {}
let variableExpenses:any = {}

const UserDetails = () => {
  const router = useRouter()
  const { userId } = router.query
  const {getAccount, account, isLoading} = useAccount()

  const tabs = [
    { name: 'Variable' },
    { name: 'Fixed' }
  ]

  // current tab state
  const [activeTab, setActiveTab] = useState(tabs[0])

  // useEffect 
  useEffect(() => {
    getAccount()
  },[])

  useEffect(() => {
    console.log('account: ', account)
    account && account.categories.map(category => {
        fixedExpenses[category.name] = category.fixedExpenses
        variableExpenses[category.name] = category.variableExpenses
    })
    
  },[account])
  
  // classNames function for active and non-active tab
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }

  // handler function for selecting other tab
  function onSelectTab(tab: typeof tabs[0]){
    if(tab.name === 'Wallet Info'){
      
    }
    if(tab.name === 'Documents' && userId && userId !== ''){
      
    }
    setActiveTab(tab)
  }

  return (
    <>
    <div className="relative border-b border-gray-200 p-5 sm:pb-0">
      <div className="md:flex md:items-center md:justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Expenses Categories</h3>
        <div className="mt-3 flex md:absolute md:top-3 md:right-0 md:mt-0">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Share
          </button>
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue={tabs.find((tab) => tab.name === activeTab.name)?.name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                onClick={() => onSelectTab(tab)}
                className={classNames(
                  tab.name === activeTab.name
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-md cursor-pointer'
                )}
                aria-current={tab.name === activeTab.name ? 'page' : undefined}
              >
                {tab.name}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>


{
      activeTab.name === 'Variable' && (
        <section aria-labelledby="applicant-information-title">

        {
          variableExpenses && Object.keys(variableExpenses).map((item: string) => {
            return (
              <div key={item}>
                <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                    {item}
                  </h2>
                </div>
                <ShowTransactions data={variableExpenses[item]} />

              </div>
              </div>
            )
          })
        }

      </section>
      )
    }

    {
      activeTab.name === 'Fixed' && (
        <section aria-labelledby="applicant-information-title">

        {
          fixedExpenses && Object.keys(fixedExpenses).map((item: string) => {
            return (
              <div key={item}>
                <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                    {item}
                  </h2>
                </div>
                <ShowTransactions data={fixedExpenses[item]} />

              </div>
              </div>
            )
          })
        }

      </section>
      )
    }



    </>
  )
}

export default UserDetails