import InquiryForm from '@/components/InquiryForm';
import Icon from '@/components/Icon';

export const metadata = { title: 'Contact' };

export default function Contact() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">

        <div className="flex flex-col">
          <p className="mb-4 flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70]">
            <span className="h-px w-6 bg-[#123c35]" />
            Lets talk time
          </p>
          
          <h1 className="text-[2.5rem] font-semibold leading-[1.05] tracking-[-1px] text-[#123c35] sm:text-[3.5rem] lg:text-[4rem]">
            A conversation <br className="hidden sm:block" />
            starts <em className="font-serif italic text-[#5e7a70]">here.</em>
          </h1>
          
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-[#4d6b62]">
            Questions about the concept, collection, or shopping experience? 
            Wed love to hear from you. Drop us a line using the form.
          </p>

          <div className="mt-10 flex max-w-md items-start gap-4 rounded-sm border border-[#d8e3dd] bg-[#f0f5f2] p-5">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#5e7a70] shadow-sm">
              <Icon name="shield" size={16} />
            </div>
            <div>
              <p className="text-[0.85rem] font-semibold text-[#123c35]">
                Replies on WhatsApp
              </p>
              <p className="mt-1 text-[0.8rem] leading-relaxed text-[#5e7a70]">
                Send your name and message and well reply to you directly on WhatsApp.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-[#d8e3dd] pt-8">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[2px] text-[#123c35]">
              Other ways to reach us
            </p>
            <div className="flex flex-col gap-3">
              <a 
                href="https://tiktok.com/@saadsaifsheikh" 
                target="_blank" 
                rel="noreferrer"
                className="group flex w-fit items-center gap-3 text-[0.9rem] text-[#5e7a70] transition-colors hover:text-[#123c35]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f5f2] transition-colors group-hover:bg-[#123c35] group-hover:text-[#e1c27f]">
                  <Icon name="tiktok" size={14} />
                </span>
                @saadsaifsheikh
              </a>
              
              <a 
                href="https://instagram.com/saadsaifsheikh" 
                target="_blank" 
                rel="noreferrer"
                className="group flex w-fit items-center gap-3 text-[0.9rem] text-[#5e7a70] transition-colors hover:text-[#123c35]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f5f2] transition-colors group-hover:bg-[#123c35] group-hover:text-[#e1c27f]">
                  <Icon name="instagram" size={14} />
                </span>
                @saadsaifsheikh
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-[#d8e3dd] bg-white p-6 shadow-[0_12px_40px_-16px_rgba(18,60,53,0.1)] sm:p-10">
          <InquiryForm />
        </div>

      </div>
    </section>
  );
}