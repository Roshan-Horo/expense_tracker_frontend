import {useState } from 'react'
import { useNotifyContext } from '../../hooks/useNotifyContext';
import { useSignup } from '../../hooks/user/useSignup';

export default function Signup() {
  const { signup, isLoading: loginLoading, error: loginError} = useSignup()
  const { createNotification } = useNotifyContext()

  const [data, setData] = useState({
    username: {
      first: "",
      middle: "",
      last: ""
    },
    email: '',
    passcode: '',
    confirm_passcode: '',
    mobile: ''
  })

  async function signupHandler(e: any){
   e.preventDefault();
   if(data.passcode === data.confirm_passcode){
    const {username: name, email, passcode, mobile} = data

    await signup({ name, email, passcode,  mobile})
   }else{
     createNotification(false, "Failed", "passcode and Confirm passcode Not Matched.")
   }
  }
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-6 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Signup for your account</h2>
          {/* <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              start your 14-day free trial
            </a>
          </p> */}
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-6 px-4 drop-shadow-lg sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={signupHandler}>

            <div>
                <label htmlFor="fitstname" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    id="firstname"
                    value={data.username.first}
                    onChange={(e) => setData({...data, username: {...data.username, first: e.target.value}})}
                    name="firstname"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    id="lastname"
                    value={data.username.last}
                    onChange={(e) => setData({...data, username: { ...data.username, last: e.target.value}})}
                    name="lastname"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    value={data.email}
                    onChange={(e) => setData({...data, email: e.target.value})}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                  Mobile No.
                </label>
                <div className="mt-1">
                  <input
                    id="mobile"
                    value={data.mobile}
                    onChange={(e) => setData({...data, mobile: e.target.value})}
                    name="mobile"
                    type="mobile"
                    autoComplete="mobile"
                    maxLength={10}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="passcode" className="block text-sm font-medium text-gray-700">
                  passcode
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    id="passcode"
                    value={data.passcode}
                    onChange={(e) => setData({...data, passcode: e.target.value})}
                    name="passcode"
                    autoComplete="current-passcode"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirm_passcode" className="block text-sm font-medium text-gray-700">
                  Confirm passcode
                </label>
                <div className="mt-1">
                  <input
                    id="confirm_passcode"
                    value={data.confirm_passcode}
                    onChange={(e) => setData({...data, confirm_passcode: e.target.value})}
                    name="confirm_passcode"
                    type="password"
                    autoComplete="confirm_passcode"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your passcode?
                  </a>
                </div>
              </div> */}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}
