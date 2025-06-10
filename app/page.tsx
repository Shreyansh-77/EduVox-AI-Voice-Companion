import React from 'react'
import {Button} from "@/components/ui/button";
import CompanionCard from '@/components/ui/CompanionCard';
import CompanionList from '@/components/ui/CompanionList';
import CTA from '@/components/ui/CTA';
import { recentSessions } from '@/constants';

const Page = () => {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Popular Companions</h1>
      <section className="home-section">
        <CompanionCard  
          id='1'
          name='Math Tutor'
          topic='Algebra Basics'
          subject='Math'
          duration={30}
          color='yellow'
        />
        <CompanionCard  
          id='2'
          name='Science Explorer'
          topic='Physics Fundamentals'
          subject='Science'
          duration={45}
          color='cyan'
        />
        <CompanionCard  
          id='3'
          name='History Guide'
          topic='Ancient Civilizations'
          subject='History'
          duration={60}
          color='pink'
        />
      </section>
      
      <section className='home-section'>
        <CompanionList
          title='My Companions'
          companions={recentSessions}
          className='w-2/3 max-lg:w-full'
        />
        <CTA/>
      </section>
    </main>
  )
}

export default Page