import {useState, useEffect} from 'react'
import {CategoryPropType} from '../pages/onboard/index'
import {dequal} from 'dequal'

export default function Category({totalIncome, category, data, setData}: CategoryPropType) {

  const [compData, setCompData] = useState(category)

  // handler function 
  function handleOnBlur(e: any){
    if(!dequal(category, compData)){
      // if user change name or %, then set the new data
      
      let currentCopy = {...data}
      let categoryIndex = 0
      // find the changed Index
      data.categories.forEach((item, index) => {
        if(item.name === category.name){
          categoryIndex = index
          return
        }
      })
      // update the copied state
      currentCopy.categories[categoryIndex] = compData
      setData(currentCopy)
    }
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="category_name" className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              value={compData.name}
              onChange={(e) => setCompData({...compData, name: e.target.value})}
              id="category_name"
              onBlur={handleOnBlur}
              autoComplete="given-name"
              className="block p-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="category_percent" className="block text-sm font-medium text-gray-700">
            % of Total Income
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="valueInPercent"
              value={compData.valueInPercent}
              onChange={(e) => setCompData({ ...compData, valueInPercent: Number(e.target.value), totalInitialBalance: ((Number(e.target.value) * data.totalIncome) / 100.0)})}
              id="category_percent"
              onBlur={handleOnBlur}
              autoComplete="given-name"
              className="block p-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <div className="block text-sm font-medium text-gray-400">
          Amount : {(compData.valueInPercent * totalIncome) / 100}
          </div>
        </div>

    </div>
  )
}
