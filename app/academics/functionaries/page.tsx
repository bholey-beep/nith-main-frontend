import { FunctionariesSectionPage } from '../../../components/SectionBlocks';

export default function Page() {
  return (
    <FunctionariesSectionPage
      titleEn="Academic Functionaries"
      titleHi="शैक्षणिक पदाधिकारी"
      subtitleEn="Academic office sections, faculty in-charge roles, and staff assignments"
      subtitleHi="शैक्षणिक कार्यालय अनुभाग, संकाय प्रभारी भूमिकाएँ और स्टाफ नियुक्तियाँ"
      endpoint={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/v1/academics/functionaries`}
    />
  );
}
