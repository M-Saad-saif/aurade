import OrderReceipt from '@/components/OrderReceipt';
export const metadata = {
  title: 'Order confirmation',
  robots: { index: false, follow: false },
};
export default async function SuccessPage({ searchParams }) {
  const { id } = await searchParams;
  return <OrderReceipt id={typeof id === 'string' ? id : ''} />;
}
