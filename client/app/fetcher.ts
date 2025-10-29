'use client';

const baseURL = 'http://localhost:3000/api/ext';

export const fetchData = async () => {
  // const res = await customFetch.get('/jobs/stats');
  // return res.data;

  const data = await fetch(`${baseURL}/jobs/stats`);
  return await data.json();
};
