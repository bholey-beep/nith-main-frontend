import { ActivitiesSectionPage } from '../../components/SectionBlocks';

export default function Page() {
  return (
    <ActivitiesSectionPage
      titleEn="Student Activities"
      titleHi="छात्र गतिविधियां"
      subtitleEn="Student welfare, cultural, and sports initiatives at NITH"
      subtitleHi="एनआईटी में छात्र कल्याण, सांस्कृतिक और खेल पहल"
      endpoint={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/v1/students/activities`}
    />
  );
}
