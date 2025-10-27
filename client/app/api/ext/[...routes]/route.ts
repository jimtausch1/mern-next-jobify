import { auth } from '@/auth';
import axios, { RawAxiosRequestHeaders } from 'axios';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const baseServiceUrl = 'http://localhost:5000/api/v1/';

async function getApiUrl(routes: string | string[]) {
  const serviceUrl = Array.isArray(routes) ? routes.join('/') : routes[0];

  const url = `${baseServiceUrl}${serviceUrl}`;

  return url;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ routes: string | string[] }> }
) {
  const { routes } = await params;
  const searchParams = request.nextUrl.searchParams;
  const session = await auth(); // Get the current session
  const sessionToken = request.cookies.get('authjs.session-token')?.value;
  const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
  const decodedToken = await getToken({ req: request, secret: NEXTAUTH_SECRET });

  if (!session || !sessionToken || !NEXTAUTH_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const externalApiUrl = await getApiUrl(routes);

  const apiInstance = axios.create({
    baseURL: externalApiUrl, // Optional: Set a base URL
    timeout: 5000, // Optional: Set a request timeout
    params: searchParams,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${decodedToken.jwt}`, // Example: Authorization header
      'X-Custom-Header': `${session.user.id}`, // Example: Custom header
    },
  });

  try {
    const { data } = await apiInstance(externalApiUrl);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching external data:', error);
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ routes: string | string[] }> }
) {
  const { routes } = await params;
  const loginRequest = routes.includes('login');
  const session = await auth(); // Get the current session
  const sessionToken = request.cookies.get('authjs.session-token')?.value;
  const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

  if ((!session || !sessionToken || !NEXTAUTH_SECRET) && !loginRequest) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const externalApiUrl = await getApiUrl(routes);

  const headers: RawAxiosRequestHeaders = {
    'Content-Type': 'application/json',
  };

  const decodedToken = await getToken({ req: request, secret: NEXTAUTH_SECRET });
  const reqBody = await request.json();

  if (!loginRequest && decodedToken) {
    headers.Authorization = `Bearer ${decodedToken.jwt}`;
    headers['X-Custom-Header'] = session.user.id;
  }

  const apiInstance = axios.create({
    baseURL: externalApiUrl,
    timeout: 5000,
    headers: headers,
  });

  try {
    const { data } = await apiInstance.post(externalApiUrl, reqBody);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error posting external data:', error);
    return NextResponse.json({ message: 'Error posting data' }, { status: 500 });
  }
}
