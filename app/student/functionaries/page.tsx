import { FunctionariesSectionPage } from '../../components/SectionBlocks';

export default function Page() {
  return (
    <FunctionariesSectionPage
      titleEn="Student Functionaries"
      titleHi="छात्र पदाधिकारी"
      subtitleEn="Student welfare functionaries, nodal officers, and support staff"
      subtitleHi="छात्र कल्याण पदाधिकारी, नोडल अधिकारी और सहायक स्टाफ"
      endpoint={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/v1/students/functionaries`}
    />
  );
}
