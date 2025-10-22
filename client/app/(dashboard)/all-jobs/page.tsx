import { customFetch } from '@/utils';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import JobsList from './JobsList';
import Providers from './providers';
import SearchForm from './SearchForm';

type AllJobsPageProps = {
  searchParams: Promise<SearchParams>;
};

export async function getJobs(searchParams: SearchParams) {
  const { data } = await customFetch.get('/jobs', {
    params: searchParams,
  });

  return data;
}

export default async function AllJobsPage({ searchParams }: AllJobsPageProps) {
  const searchParamsResult = await searchParams;
  const params = {
    search: searchParamsResult.search ?? '',
    jobStatus: searchParamsResult.jobStatus ?? 'all',
    jobType: searchParamsResult.jobType ?? 'all',
    sort: searchParamsResult.sort ?? 'newest',
    page: searchParamsResult.page ?? '1',
  };

  const { search, jobStatus, jobType, sort, page } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['jobs', search, jobStatus, jobType, sort, page],
    queryFn: await getJobs(params),
    staleTime: 60000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Providers>
        <SearchForm />
        <JobsList />
      </Providers>
    </HydrationBoundary>
  );
}
