'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllJobsContext } from './AllJobsContext';

type AllJobsProviderProps = {
  children: React.ReactNode | string;
  searchParams: SearchParams;
  data: any;
};

export function AllJobsProvider({ children, searchParams, data }: AllJobsProviderProps) {
  // const { search, jobStatus, jobType, sort, page } = searchParams;

  return (
    <AllJobsContext.Provider value={{ searchParams, data }}>{children}</AllJobsContext.Provider>
  );
}
