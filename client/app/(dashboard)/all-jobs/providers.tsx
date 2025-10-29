'use client';

import { AllJobsContext } from '@/context/AllJobsContext';
import { customFetch } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const jobStatus = searchParams.get('jobStatus') ?? 'all';
  const jobType = searchParams.get('jobType') ?? 'all';
  const sort = searchParams.get('sort') ?? 'newest';
  const page = searchParams.get('page');
  const params = {
    search,
    jobStatus,
    jobType,
    sort,
    page,
  };

  const userQuery = {
    queryKey: ['jobs', search, jobStatus, jobType, sort, page],
    queryFn: async () => {
      const { data } = await customFetch.get('/jobs', {
        params: params,
      });

      return data;
    },
  };

  const { data, isLoading } = useQuery(userQuery);

  const response = data ?? ({} as AllJobsResponse);

  return (
    <AllJobsContext.Provider value={{ searchParams: params, data: response, isLoading }}>
      {children}
    </AllJobsContext.Provider>
  );
}
