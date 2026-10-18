import InquiryForm from '@/components/InquiryForm';
export const metadata = { title: 'Sell / trade' };
export default function Trade() {
  return (
    <section className="container section inquiry-layout">
      <div>
        <p className="eyebrow">AURA + TRADE</p>
        <h1>
          A new chapter
          <br />
          for your watch.
        </h1>
        <p>
          A preview of a future sell-and-trade inquiry experience. Share fictional watch details to
          explore the form.
        </p>
        <ol className="trade-steps">
          <li>Describe the watch.</li>
          <li>Preview the inquiry.</li>
          <li>Explore your next signature.</li>
        </ol>
        <p className="demo-note">
          No valuation, authentication, offer or trade is provided. This is an interface
          demonstration only.
        </p>
      </div>
      <InquiryForm trade />
    </section>
  );
}
