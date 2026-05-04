import NextLink from './NextLink';
import Image from 'next/image';

/**
 * About Component
 * Displays a section with an image or video on one side and text content on the other.
 * 
 * Props:
 * - heading, headingH1: Headings
 * - subHeading: Uppercase section title
 * - para, para2, para3: Paragraphs
 * - imgPosition: 'right' or 'left' (to switch layout)
 * - src, src1: Image source and blur placeholder
 * - alt: Alt text for image
 * - btnTitle, btnUrl: Button content
 * - video: Optional video { src }
 * - span, afterSpan: Highlighted inline span text
 */
const About = ({
  heading,
  headingH1,
  subHeading,
  para,
  para2,
  para3,
  imgPosition = 'left',
  src,
  src1,
  alt = '',
  btnTitle,
  btnUrl,
  video,
  span,
  afterSpan
}) => {
  const renderMedia = () => {
    if (video?.src) {
      return (
        <video
          className="w-full rounded-2xl object-cover"
          autoPlay
          muted
          loop
          playsInline
          src={video.src}
        />
      );
    }

    return (
      <Image
        alt={`${alt} | HRMate`}
        src={src}
        width={600}
        height={700}
        className="h-auto w-full rounded-2xl object-cover"
        priority
        placeholder="blur"
        blurDataURL={src1}
      />
    );
  };

  return (
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
      <div className={`lg:col-span-5 ${imgPosition === 'right' ? 'lg:order-2' : 'lg:order-1'}`}>
        <div>
          <figure className="overflow-hidden rounded-2xl bg-white shadow-md">
            {renderMedia()}
          </figure>
        </div>
      </div>

      <div className={`lg:col-span-7 ${imgPosition === 'right' ? 'lg:order-1' : 'lg:order-2'}`}>
        {subHeading && <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">{subHeading}</h3>}

        {headingH1 && (
          <h1 className="mb-3 mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
            {headingH1}
            <span className="text-[#0b1f3a]">{span}</span>
            {afterSpan || ''}
          </h1>
        )}

        {heading && (
          <h2 className="mb-3 mt-3 text-3xl font-bold text-slate-900 md:text-5xl">
            {heading}
            <span className="text-[#0b1f3a]">{span}</span>
            {afterSpan || ''}
          </h2>
        )}

        {para && <p className="text-justify text-slate-600">{para}</p>}
        {para2 && <p className="mb-3 text-justify text-slate-600">{para2}</p>}
        {para3 && <p className="mb-3 text-justify text-slate-600">{para3}</p>}

        {btnTitle && btnUrl && (
          <div className="mt-5">
            <NextLink
              title={btnTitle}
              href={btnUrl}
              className="inline-flex rounded-md bg-[#0b1f3a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#071425]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
