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

  crown: (
    <>
      <svg viewBox="0 0 576 512" className="h-[1em] fill-[rgb(121,103,3)]">
        <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 1<PASSWORD>"></path>
      </svg>
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
