import Link from 'next/link';
import Icon from './Icon';

export default function SectionHeading({ eyebrow, title, href, label = 'Explore all' }) {
  return (
    <div className="flex flex-col gap-6 border-b border-[#d8e3dd] pb-6 sm:flex-row sm:items-end sm:justify-between">
      
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-3 flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70]">
            <span className="h-px w-6 bg-[#123c35]" />
            {eyebrow}
          </p>
        )}
        <h2 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.5px] text-[#123c35] sm:text-[2.5rem]">
          {title}
        </h2>
      </div>

      {href && (
        <Link 
          href={href} 
          className="group inline-flex shrink-0 items-center gap-2 text-[0.8rem] font-medium uppercase tracking-[1.5px] text-[#123c35] transition-colors hover:text-[#0d2e28]"
        >
          <span className="border-b border-transparent pb-1 transition-colors group-hover:border-[#123c35]">
            {label}
          </span>
          <Icon 
            name="arrow" 
            size={16} 
            className="transition-transform duration-300 group-hover:translate-x-1" 
          />
        </Link>
      )}

    </div>
  );
}