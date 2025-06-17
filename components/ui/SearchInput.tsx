"use client"
import Image from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils"
import React, { useEffect, useState } from 'react'

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || '';

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {

        if (searchQuery) {
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "your_query_key",
                value: searchQuery,
            });

            router.push(newUrl, { scroll: false });
        } else {
            if (pathname === '/companions') {
                const newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['topic'],
                });
                router.push(newUrl, { scroll: false });
            }
        }
        },500)

    }, [searchQuery, router, searchParams, pathname]);

    return (
        <div className='relative input rounded-lg items-center w-full flex justify-center flex gap-2 px-2 py-1.5 h-fit'>
            <Image src="/icons/search.svg" alt="search icon" width={15} height={15} />

            <input
                value={searchQuery}
                placeholder="Search Companion"
                className="input"
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )
}

export default SearchInput