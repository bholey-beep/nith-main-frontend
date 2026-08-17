import { ActivitiesSectionPage } from '../../../components/SectionBlocks';

export default function Page() {
  return (
    <ActivitiesSectionPage
      titleEn="Academic Activities"
      titleHi="शैक्षणिक गतिविधियां"
      subtitleEn="Academic planning, admissions coordination, and examination support"
      subtitleHi="शैक्षणिक योजना, प्रवेश समन्वय और परीक्षा सहायता"
      endpoint={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/v1/academics/activities`}
    />
  );
}
