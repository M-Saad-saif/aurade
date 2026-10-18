import InquiryForm from '@/components/InquiryForm';
export const metadata = { title: 'Contact' };
export default function Contact() {
  return (
    <section className="container section inquiry-layout">
      <div>
        <p className="eyebrow">LET’S TALK TIME</p>
        <h1>
          A conversation
          <br />
          starts here.
        </h1>
        <p>
          Questions about the concept, collection or shopping experience? Explore this demonstration
          inquiry form.
        </p>
        <p className="demo-note">
          This demo does not have a customer service inbox. No message is delivered.
        </p>
      </div>
      <InquiryForm />
    </section>
  );
}
