import React from 'react'
import { Button } from "@/components/ui/button";
import CompanionCard from '@/components/ui/CompanionCard';
import CompanionList from '@/components/ui/CompanionList';
import CTA from '@/components/ui/CTA';
import { recentSessions } from '@/constants';
import { getAllCompanions, getRecentSession } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';

const Page = async () => {
  const companion = await getAllCompanions({ limit: 3 });
  const recentSessionCompanions = await getRecentSession(10);

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Popular Companions</h1>
      <section className="home-section">
        {companion.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section className='home-section'>
        <CompanionList
          title='My Companions'
          companions={recentSessionCompanions}
          className='w-2/3 max-lg:w-full'
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page