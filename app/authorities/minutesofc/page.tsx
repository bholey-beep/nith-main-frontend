import AuthorityMinutes from '@/app/components/AuthorityMinutes';

export default function MinutesOfFC() {
  return (
    <AuthorityMinutes
      title="Minutes of the Meetings of the Finance Committee"
      titleHi="वित्त समिति (FC) की बैठकों का कार्यवृत्त"
      apiBase="fc"
    />
  );
}
