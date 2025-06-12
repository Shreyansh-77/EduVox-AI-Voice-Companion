import CompanionForm from '@/components/ui/CompanionForm'
import React from 'react'

const page = () => {
  return (
    <main className="min-lg:w-1/3 min:md:w-2/3 items-center justify-center mx-auto my-10 p-4 bg-white rounded-lg shadow-lg">
      <article>
          <h1>Companion Builder</h1>
          <br/>
          <CompanionForm/>
      </article>
    </main>
  )
}

export default page