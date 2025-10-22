'use client';

import { AllJobsProvider } from '@/context/AllJobsProvider';
import { customFetch } from '@/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

type AllJobsProviderProps = {
  children: React.ReactNode | string;
};

export default function Providers({ children }: AllJobsProviderProps) {
  const queryClient = useQueryClient();
  const [data, setData] = useState({});
  const searchParams = useSearchParams();
  const params = {
    search: searchParams.get('search') ?? '',
    jobStatus: searchParams.get('jobStatus') ?? 'all',
    jobType: searchParams.get('jobType') ?? 'all',
    sort: searchParams.get('sort') ?? 'newest',
    page: searchParams.get('page') ?? '1',
  };

  const { search, jobStatus, jobType, sort, page } = params;

  const userQuery = {
    queryKey: ['jobs', search, jobStatus, jobType, sort, page],
    queryFn: async () => {
      const { data } = await customFetch.get('/jobs', {
        params,
      });

      setData(data);
      console.log('client side request');
      return data;
    },
  };

  useQuery(userQuery);

  return (
    <AllJobsProvider data={data} searchParams={params}>
      {children}
    </AllJobsProvider>
  );
}
