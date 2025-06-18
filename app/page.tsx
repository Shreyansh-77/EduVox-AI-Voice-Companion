import React from 'react'
import { Button } from "@/components/ui/button";
import CompanionCard from '@/components/ui/CompanionCard';
import CompanionList from '@/components/ui/CompanionList';
import CTA from '@/components/ui/CTA';
import { recentSessions } from '@/constants';
import { getAllCompanions, getCompanions, getPopularCompanions, getRecentSession } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Page = async () => {
  const companion = await getPopularCompanions(3);
  const recentSessionCompanions = await getCompanions({limit:10});


  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">New Companions</h1>
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