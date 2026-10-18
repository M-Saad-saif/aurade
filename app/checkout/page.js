import CheckoutForm from '@/components/CheckoutForm';
export const metadata = {
  title: 'Demo checkout',
  robots: { index: false, follow: false },
};
export default function CheckoutPage() {
  return <CheckoutForm />;
}
