import Link from 'next/link'
import Image from 'next/image'
import NavItems from './navItems'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <Link href="/">
            <div className='flex items-center gap-2.5 cursor-pointer'>
                <Image
                    src="/favicon.ico" 
                    alt="Logo" 
                    width={46}
                    height={44} />
            </div>
        </Link>
        <div className='flex items-center gap-4'>
            <NavItems/>
            <p>Sign in</p>
        </div>
    </nav>
  )
}

export default Navbar
