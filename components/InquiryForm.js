'use client';
import { useState } from 'react';
import Icon from './Icon';
export default function InquiryForm({ trade = false }) {
  const [message, setMessage] = useState('');
  return (
    <form
      className="inquiry-form"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage(
          'Demo complete. Your inquiry was not sent or stored. Connect a secure backend to receive real inquiries.',
        );
        event.currentTarget.reset();
      }}
    >
      <div className="form-grid">
        <label>
          Name
          <input name="name" required maxLength={100} />
        </label>
        <label>
          Email
          <input name="email" type="email" required maxLength={254} />
        </label>
        {trade && (
          <>
            <label>
              Watch brand
              <input name="brand" required maxLength={100} />
            </label>
            <label>
              Model / reference
              <input name="model" required maxLength={100} />
            </label>
          </>
        )}
        <label className="span-two">
          {trade ? 'Tell us about your watch' : 'Your message'}
          <textarea name="message" rows={6} required minLength={10} maxLength={3000} />
        </label>
      </div>
      <p className="demo-note">Demo form. Use fictional details. Nothing is sent or stored.</p>
      <button className="button" type="submit">
        {trade ? 'Preview trade inquiry' : 'Preview inquiry'}
        <Icon name="arrow" />
      </button>
      <p role="status" className="form-message">
        {message}
      </p>
    </form>
  );
}
