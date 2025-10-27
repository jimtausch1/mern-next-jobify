import JobsList from './JobsList';
import Providers from './providers';
import SearchForm from './SearchForm';

export default async function AllJobsPage() {
  return (
    <Providers>
      <SearchForm />
      <JobsList />
    </Providers>
  );
}
