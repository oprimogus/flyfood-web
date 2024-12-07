import LoggedHeader from '@/components/header/logged-header';
import { getCustomerV1 } from '@/service/flyfood-api/service';
import type { Customer } from '@/service/flyfood-api/types';

export default async function Home() {
  const customer = await getCustomerV1();
  return <LoggedHeader customer={customer as Customer} />;
}
