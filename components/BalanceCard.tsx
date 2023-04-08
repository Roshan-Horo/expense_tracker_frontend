import { useState } from "react"
import AddExpense from "./AddExpense"
import { useAccount } from "../hooks/account/useAccount"
import { useRouter } from "next/router"

export type ExpenseType = {
  name: string,
  value: string,
  description?: string
}

export default function BalanceCard({ id,name, currentBalance, totalInitialBalance, getAccount} : 
  {id: string,name: string, currentBalance: number, totalInitialBalance: number, getAccount: () => void}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const {addExpense} = useAccount()

  const [newExpense, setNewExpense] = useState<ExpenseType>({
    name: '',
    value: '',
    description: ''
  })

  async function handleAddExpese(e : any){
    e.preventDefault()
    let sendData = {
      data: [{
      _id: id,
      variableExpenses: [{...newExpense, value: Number(newExpense.value)}],
      fixedExpenses: []
      }]
    }
    console.log('expense : ', sendData)

    await addExpense(sendData)
    await getAccount()
    setNewExpense({
      name: '',
      value: '',
      description: ''
    })

    setOpen(false)

  }


  return (
    // <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
    <div>
     <div className="">
          {/* Card */}
          
          <div className="w-full max-w-sm bg-blue-600 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="text-center py-2 dark:text-gray-400">{name}</div>
            <div className="w-full bg-gray-200 rounded-full h-0.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-0.5 rounded-full" style={{width: `${((currentBalance / totalInitialBalance ) * 100)}%`}}></div>
            </div>
            <div className="flex flex-col items-center p-10">
                {/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/> */}

                <div className="font-medium mb-4 dark:text-gray-400">Current Bal</div>
                <h5 className="mb-4 text-6xl font-large text-gray-900 dark:text-white">{currentBalance}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">/ {totalInitialBalance}</span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <button onClick={() => setOpen(true)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Add Expense
                    </button>
                </div>
            </div>
          </div>

          
        </div>

        {
          open && (<>
           <AddExpense 
            newExpense={newExpense} 
            setNewExpense={setNewExpense} 
            open={open} 
            setOpen={setOpen} 
            onSubmit={handleAddExpese}
          />
          </>)
        }
     </div>
  )
}
