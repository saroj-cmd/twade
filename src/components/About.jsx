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
  
  // Render either video or image based on `video` prop
  const renderMedia = () => {
    if (video?.src) {
      return (
        <video
          className="mr-5"
          style={{ maxWidth: '100%', borderRadius: '10px' }}
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
        className="position-static about-media-image"
        priority
        placeholder="blur"
        blurDataURL={src1}
      />
    );
  };

  return (
    <div className="row gx-lg-8 align-items-center">
      {/* Media (image or video) column */}
      <div className={`col-lg-5 about-us-image ${imgPosition === 'right' ? 'order-lg-2' : 'order-lg-1'}`}>
        <div className="about-img">
          <figure className="reveal image-anime rounded-xl imgs">
            {renderMedia()}
          </figure>
        </div>
      </div>

      {/* Text content column */}
      <div className={`col-lg-7 ${imgPosition === 'right' ? 'order-lg-1' : 'order-lg-2'}`}>
        {subHeading && <h3 className="fs-15 text-uppercase">{subHeading}</h3>}

        {headingH1 && (
          <h1 className="fs-46 fw-bold mb-3 mt-4">
            {headingH1}
            <span>{span}</span>
            {afterSpan || ''}
          </h1>
        )}

        {heading && (
          <h2 className="fs-46 fw-bold mb-3 mt-3">
            {heading}
            <span>{span}</span>
            {afterSpan || ''}
          </h2>
        )}

        {para && <p className="text-justify">{para}</p>}
        {para2 && <p className="mb-3 text-justify">{para2}</p>}
        {para3 && <p className="mb-3 text-justify">{para3}</p>}

        {btnTitle && btnUrl && (
          <div className="mt-5">
            <NextLink
              title={btnTitle}
              href={btnUrl}
              className="btn btn-md bg-primary text-white rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
