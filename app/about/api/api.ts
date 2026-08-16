// src/app/about/api/api.ts

// Reusable function to fetch about-nith data by ID
export async function getAboutNithData(id: number) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/v1/about-nith/${id}`, {
      cache: 'no-store', // Always fresh data
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch about-nith data with ID: ${id}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data || data,
      id,
    };
  } catch (error) {
    console.error(`Error fetching about-nith ID ${id}:`, error);
    throw error;
  }
}

// TypeScript interface for type safety
export interface AboutNithData {
  id: number;
  title: string;
  description: string;
}
