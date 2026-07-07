// src/app/about/api/api.ts

export interface AboutNithData {
  id: number;
  title: string;
  description: string;
}

type AboutNithResponse = {
  success: boolean;
  data: AboutNithData;
};

export type Homepage = {
  HeroMain: string;
  HeroSub: string;
  HeroDesc: string;
};
export async function getAboutNithData(id: number): Promise<AboutNithData> {
  try {
    const response = await fetch(
      `http://localhost:4000/v1/about-nith/${id}`,
      {
        next: { revalidate: 3600 }, // cache for 1 hour (remove if you want always fresh)
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch about-nith data with ID: ${id}`
      );
    }

    const result: AboutNithResponse = await response.json();

    return result.data;
  } catch (error) {
    console.error(`Error fetching about-nith ID ${id}:`, error);
    throw error;
  }
}

export async function getHomepageData(): Promise<Homepage> {
  const response = await fetch('http://localhost:4000/v1/homepage/', {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch homepage data');
  }

  const result = await response.json();
  return result.data || result;
}