import { useEffect, useState } from 'react'

type TransactionType = {
  name: string,
  value: number,
  description?: string
}

export default function ShowTransactions({data}: {data: TransactionType[]}) {

  // Date for the transactions
  if(data.length <= 0){
    return <div className="container p-2 mx-auto sm:p-4 text-gray-800">
      No Record
    </div>
  }else{

  }
  return (
    <>
      {/* Table for transactions */}
      <div className="container p-2 mx-auto sm:p-4 text-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <colgroup>
              <col></col>
              <col></col>
              <col></col>
              <col></col>
              <col></col>
            </colgroup>
            {/* Table Heading */}
            <thead className="bg-[#c4cacc7a]">
              <tr className="text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody>

              {/* Looping through each transactions for listing */}
              {
                data.reverse().map((list, index) => (
                  <tr key={index} className="border-b border-opacity-20 border-gray-700">
                    <td className="p-3">
                      <p>{list.name}</p>
                    </td>
                    <td className="p-3">
                      <p>{list.value}</p>
                    </td>
                    <td className="p-3">
                      <p>{list.description}</p>
                    </td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}