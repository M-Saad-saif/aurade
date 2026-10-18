'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const password = new FormData(event.currentTarget).get('password');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.refresh();
    } else {
      setError((await res.json().catch(() => ({}))).error || 'Login failed.');
      setBusy(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-[460px] px-5 py-14 md:py-[88px]">
      <p className="mb-[18px] text-[10px] font-semibold uppercase tracking-[0.22em]">AURADE ADMIN</p>
      <h1 className="mb-6 text-5xl font-medium tracking-[-0.035em] md:text-6xl">Sign in</h1>
      <form onSubmit={onSubmit} className="my-6 grid grid-cols-1 gap-5">
        <label className="flex flex-col gap-2 text-xs font-semibold">
          Password
          <input className="w-full border border-[#e2ddd3] bg-[#fffdf9] p-3 text-sm" name="password" type="password" required autoComplete="current-password" />
        </label>
        <div>
          <button className="inline-flex min-h-[50px] items-center justify-center gap-5 rounded-[3px] border border-[#123c35] bg-[#123c35] px-6 py-3.5 text-[11px] font-semibold tracking-[0.055em] text-white transition-colors hover:bg-[#1b5147] disabled:cursor-not-allowed disabled:opacity-45" type="submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </div>
      </form>
      {error && (
        <p role="alert" className="mt-3 text-sm text-[#a23a2d]">
          {error}
        </p>
      )}
    </section>
  );
}
