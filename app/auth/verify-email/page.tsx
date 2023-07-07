import { Card } from '@/modules/application/components/DesignSystem';
import VerifyEmail from '@/modules/application/components/VerifyEmail';

const VerifyEmailPage = ({ searchParams }) => (
  <div className="m-auto mt-28 flex max-w-2xl items-center justify-center">
    <Card>
      <VerifyEmail token={searchParams?.token} />
    </Card>
  </div>
);

export default VerifyEmailPage;
