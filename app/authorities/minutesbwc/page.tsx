import AuthorityMinutes from '@/app/components/AuthorityMinutes';

export default function MinutesOfBWC() {
  return (
    <AuthorityMinutes
      title="Minutes of the Meetings of the Building Works Committee"
      titleHi="भवन एवं निर्माण समिति (BWC) की बैठकों का कार्यवृत्त"
      apiBase="bwc"
    />
  );
}
