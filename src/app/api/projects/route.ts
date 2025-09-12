import { getPaginatedProjects } from '@/lib/projects';
import { NextResponse } from 'next/server';

/**
 * @function GET
 * @description Handles GET requests to the /api/projects endpoint.
 * It retrieves paginated project data based on 'page' and 'perPage' query parameters.
 * @param {Request} request - The incoming Next.js request object.
 * @returns {Promise<NextResponse>} A promise that resolves to a Next.js response containing project data or an error.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('perPage') || '5', 10);
  const tag = searchParams.get('tag') || undefined;

  try {
    const data = await getPaginatedProjects(page, perPage, tag);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching paginated projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
