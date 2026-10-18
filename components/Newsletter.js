'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function submit(event) {
    event.preventDefault();
    // Demo acknowledgement only. No email is stored or sent.
    setMessage('Thanks for your interest. This demo does not subscribe or store your email.');
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <section className="relative overflow-hidden border-t border-[#0d2e28] bg-[#123c35] text-[#f4f0e6]">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-16 sm:py-20 md:grid-cols-2 md:gap-16 md:py-24 lg:py-28">
        {/* ---- left: copy ---- */}
        <div>
          <p className="mb-5 flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[4px] text-[#e1c27f]">
            <span className="h-px w-8 bg-[#e1c27f]" />
            The Aurade Letter
          </p>

          <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.5px] text-[#f4f0e6] sm:text-[2.5rem] md:text-[2.75rem]">
            A little perspective.{' '}
            <span className="italic font-normal text-[#e1c27f]">
              In your inbox
            </span>
            .
          </h2>

          <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-[#b9c9c1]">
            Collection notes, stories and considered discoveries —
            delivered slowly, never loudly.
          </p>
        </div>

        {/* ---- right: form ---- */}
        <div className="md:justify-self-end md:w-full md:max-w-md">
          <form onSubmit={submit} className="w-full">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>

            <div className="group relative">
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email address"
                required
                maxLength={254}
                autoComplete="email"
                className="peer w-full border-b border-[#2c5a52] bg-transparent px-0 py-4 pr-32 text-[1.05rem] text-[#f4f0e6] placeholder:text-[#6f8a82] transition-colors duration-200 focus:border-[#e1c27f] focus:outline-none"
              />

              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#e1c27f] px-5 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[1.5px] text-[#123c35] transition-all duration-200 hover:bg-[#f4f0e6] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e1c27f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#123c35]"
              >
                Join <span aria-hidden="true" className="ml-1 inline-block">↗</span>
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2 text-[0.72rem] text-[#8fa8a0]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Demo form — no subscription is created.</span>
            </div>

            <p
              role="status"
              aria-live="polite"
              className={`mt-4 overflow-hidden text-[0.85rem] leading-relaxed text-[#e1c27f] transition-all duration-300 ${
                submitted ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              {message}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}