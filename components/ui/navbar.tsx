import Link from 'next/link'
import Image from 'next/image'
import NavItems from './navItems'
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <Link href="/">
            <div className='flex items-center gap-2.5 cursor-pointer rounded-md'>
                <Image
                    src="icons/favicon.svg" 
                    alt="Logo" 
                    width={40}
                    height={40} 
                    className='rounded-2xl'/>
                <h1 className='text-xl font-bold'>EduVox</h1>
            </div>
        </Link>
        <div className='flex items-center gap-4'>
            <NavItems/>
            <SignedOut>
                <SignInButton>
                    <button  className="btn-signin ">
                        Sign In
                    </button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    </nav>
  )
}

export default Navbar
