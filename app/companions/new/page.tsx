import CompanionForm from '@/components/ui/CompanionForm'
import { newCompanionPermission } from '@/lib/actions/companion.actions';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect(`/sign-in`)

  const canCcreateCompanion = await newCompanionPermission();

  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center ">
      {canCcreateCompanion ? (
        <article className='w-full gap-4 flex flex-col'>
          <h1>Companion Builder</h1>
          <br />
          <CompanionForm />
        </article>) : (
          <article className='companion-limit'>
            <Image src="/images/limit.svg" alt="limit" width={360} height={230} />
            <div className='cta-badge'>Upgrade your plan</div>
            <h1>You've Reached Your Limit</h1>
            <p> Upgrade to create more companions and premium features.</p>
            <Link href="/subscription" className='btn btn-primary w-full justify-center'>Upgrade Account</Link>
 
          </article>
        )}
    </main>
  )
}

export default NewCompanion