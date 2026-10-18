const paths = {
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="7.3" />
      <path d="m16 16 5 5" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  bag: (
    <>
      <path d="M5 7h14l1 14H4L5 7Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </>
  ),
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  minus: <path d="M5 12h14" />,
  plus: <path d="M5 12h14M12 5v14" />,
  trash: (
    <>
      <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  truck: (
    <>
      <path d="M2 5h12v12H2zM14 9h4l4 5v3h-8" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  shield: (
    <>
      <path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  diamond: (
    <>
      <path d="m3 8 4-5h10l4 5-9 13L3 8ZM3 8h18M7 3l5 18 5-18" />
    </>
  ),
  return: (
    <>
      <path d="M3 10a9 9 0 1 1 1 8M3 3v7h7" />
    </>
  ),
  play: <path d="M7 4.5v15l12-7.5-12-7.5Z" />,
};
export default function Icon({ name, size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
