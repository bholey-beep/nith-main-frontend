import AuthorityMinutes from '@/app/components/AuthorityMinutes';

export default function MinutesOfSenate() {
  return (
    <AuthorityMinutes
      title="Minutes of the Meetings of the Senate"
      titleHi="सीनेट की बैठकों का कार्यवृत्त"
      apiBase="senate"
    />
  );
}
