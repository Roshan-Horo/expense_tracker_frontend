import { useEffect } from "react"
import BalanceCard from "../../components/BalanceCard"
import { useAccount } from "../../hooks/account/useAccount"
import { useRouter } from "next/router"

export default function Dashboard(){
  console.log('dashboard')
  const router = useRouter()
  const {getAccount, account} = useAccount()

  useEffect(() => {
    getAccount()
  },[])

  useEffect(() => {
    console.log('account: ', account)
  },[account])

  return (
    <>
     <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
     </div>
      <div className="mx-auto flex-col w-full items-center justify-center px-4 sm:px-6 md:px-8">
        {/* Replace with your content */} 
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
        {
          account && account.categories.map(category => (

            <BalanceCard
             key={category._id}
             getAccount={getAccount}
             id={category._id ?? category.name}
             name={category.name}
             currentBalance={category.currentBalance === 0 ? category.totalInitialBalance : category.currentBalance ?? 0}
             totalInitialBalance={category.totalInitialBalance}
            />

          ))
        }
        </div>

        {
          !account && (
            <>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                {/* Card */}
                
                <div className="w-full max-w-sm bg-blue-600 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex flex-col items-center p-10">
                      {/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/> */}

                      <div className="font-medium mb-4 dark:text-gray-400"></div>
                      <h5 className="mb-4 text-6xl font-sm text-gray-900 dark:text-white">No Account Found</h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400"></span>
                      <div className="flex mt-4 space-x-3 md:mt-6">
                          <button onClick={() => router.push('/onboard')} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Create Account
                          </button>
                      </div>
                  </div>
                </div>

                
              </div>
              </div>
            </>
          )
        }

     </div>
    </>
  )
}