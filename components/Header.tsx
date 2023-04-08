import {useRouter} from 'next/router'
/* This example requires Tailwind CSS v2.0+ */
const navigation = [
  { name: 'Solutions', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'Docs', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Header() {
  const router = useRouter()
  return (
    <header className="bg-indigo-600">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-2 lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Your Company</span>
              {/* <img className="h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="" /> */}
            </a>
            <div className="ml-10 hidden space-x-8 lg:block">
              {/* {navigation.map((link) => (
                <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
                  {link.name}
                </a>
              ))} */}
              <a href={'/'} className="text-base font-medium text-white hover:text-indigo-50">
              <span className="text-4xl font-bold tracking-wider text-gray-400"><span className="text-white">A</span>pp</span>
              </a>
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <button
              onClick={() => router.push('/')}
              className="inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
            >
              Sign in
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Sign up
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          {/* {navigation.map((link) => (
            <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
              {link.name}
            </a>
          ))} */}
           <a href={'/'} className="text-base font-medium text-white hover:text-indigo-50">
              <span className="text-4xl font-bold tracking-wider text-gray-400"><span className="text-white">S</span>tore<span className="text-white">I</span>t</span>
           </a>
        </div>
      </nav>
    </header>
  )
}
