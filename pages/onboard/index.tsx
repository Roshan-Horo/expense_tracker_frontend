import {useState, useEffect} from 'react'
import Category from '../../components/Category'
import { useAccount } from '../../hooks/account/useAccount'

export type AccountType = {
  totalIncome: number,
  name: string,
  categories: CategoryType[]
}

export type CategoryType = {
  _id?: string,
  name: string,
  valueInPercent: number,
  totalInitialBalance: number,
  totalFixedAmount?: number,
  totalVariableAmount?: number,
  currentBalance?: number,
  fixedExpenses?: ExpenseType[],
  variableExpenses?: ExpenseType[]
}

export type ExpenseType = {
  name: string,
  value: number,
  description?: string
}

export type CategoryPropType = {
  totalIncome: number,
  category: CategoryType, 
  data: AccountType,
  setData: React.Dispatch<React.SetStateAction<AccountType>>
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const {createAccount, isLoading} = useAccount()

  const [data, setData] = useState<AccountType>({
  totalIncome: 25000,
  name: "50/30/20 - Expenses/Needs/Savings",
  categories: [
      {
        name: "Expenses",
        valueInPercent: 50,
        totalInitialBalance: 12500,
        fixedExpenses: [],
        variableExpenses: []
      },
      {
        name: "Needs",
        valueInPercent: 30,
        totalInitialBalance: 7500,
        fixedExpenses: [],
        variableExpenses: []
      },
      {
        name: "Savings & Investing",
        valueInPercent: 20,
        totalInitialBalance: 5000,
        fixedExpenses: [],
        variableExpenses: []
      },
  ]
})
  const [isTotal100, setIsTotal100] = useState(() => {
    const totalPercent = data.categories.reduce((acc, current) => acc += current.valueInPercent, 0 )

    return totalPercent === 1000
  })

  useEffect(() => {
    const totalPercent = data.categories.reduce((acc, current) => acc += current.valueInPercent, 0 )
    
    if(totalPercent === 100){
      setIsTotal100(true)
    }else{
      setIsTotal100(false)
    }
  },[data])

  // function handler
  async function handleSave(e: any){
    e.preventDefault()
    await createAccount(data)
  }

  return (
   <>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
    <h1 className="text-2xl font-semibold text-gray-900">Manage Account</h1>
    </div>
      <div className="mx-auto flex items-center justify-center px-4 sm:px-6 md:px-8">
        {/* Replace with your content */}    
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSave}>
          <div className="space-y-8 divide-y divide-gray-200">

            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Financial Information</h3>
                <p className="mt-1 text-sm text-gray-500">Use all your different Income Source and different expenses based on categorization.</p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="totalIncome" className="block text-sm font-medium text-gray-700">
                    Total Monthly Income 
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="totalIncome"
                      value={data.totalIncome}
                      onChange={(e) => setData({...data, totalIncome: Number(e.target.value)})}
                      id="totalIncome"
                      autoComplete="given-name"
                      className="block p-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="account_name" className="block text-sm font-medium text-gray-700">
                    Account Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="account_name"
                      value={data.name}
                      onChange={(e) => setData({...data, name: e.target.value})}
                      id="account_name"
                      autoComplete="given-name"
                      className="block p-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Expense Categories</h3>
                <p className="mt-1 text-sm text-gray-500">Your Income is divided into different Categories. {"(default : 50/30/20 Rule)"}</p>
              </div>

              {
                <ul role="list" className="divide-y divide-gray-200">
                {data && data.categories.map((category) => (
                  <li key={category.name} className="py-4">
                    <Category totalIncome={data.totalIncome} category={category} data={data} setData={setData} />
                  </li>
                ))}
              </ul>
              }


            </div>

          </div>

          <div className="pt-5">
            {!isTotal100 && (
              <div className="rounded-md border text-center border-red-400 p-2 text-sm font-medium text-red-400">
                Total Income Percent must be 100
              </div>
            )}
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isTotal100}
                className={classNames( 
                  isTotal100 
                  ? "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                  : "bg-gray-500 cursor-not-allowed"
                  ,"ml-3 inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2")}
              >
                Save
              </button>
            </div>
          </div>
        </form>   
    </div>
   </>


  )
}
