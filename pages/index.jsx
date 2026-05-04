import { Fragment, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import PageProgress from 'components/PageProgress';
import Hero from 'components/Hero';
import About from 'components/About';
import ImageCard from 'components/ImageCard';
import Image from 'next/image';
import {
  aboutContent,
  achievements,
  contactDetails,
  homeSolutionsCardData,
  industries,
  keyStrengths,
  recruitmentExpertise,
  recruitmentServices,
  workflowSteps
} from '../src/data';

const Home = () => {
  const AnimatedMetric = ({ value, suffix = '', decimals = 0 }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const metricRef = useRef(null);

    useEffect(() => {
      const node = metricRef.current;
      if (!node) return undefined;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(node);
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (!hasStarted) return undefined;

      const duration = 1400;
      const start = performance.now();

      const animate = (currentTime) => {
        const progress = Math.min((currentTime - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(value * eased);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
      return undefined;
    }, [hasStarted, value]);

    return (
      <span ref={metricRef}>
        {displayValue.toFixed(decimals)}
        {suffix}
      </span>
    );
  };

  return (
    <Fragment>
      {/* Top page loader bar */}
      <PageProgress />

      {/* SEO Metadata */}
      <Head>
        <title>Tawade Consultancy Services | IT Training & Placement Support</title>
        <meta
          name="description"
          content="Tawade Consultancy Services provides practical IT training, mentorship, and placement support to help learners build successful careers."
        />
        <link rel="canonical" href="https://tawadeconsultancy.com/" />
      </Head>

      <main className="content-wrapper overflow-hidden" id="home">
        {/* Hero Section */}
        <Hero />


        {/* remove this if you want to use video here */}
        <section className="wrapper bg-light">
          <div className="container position-relative">
            <figure
              data-delay="250"
              data-cues="fadeIn"
              className="rounded mt-n17 mt-lg-n20 position-relative justify-content-center d-flex feature-image-frame"
            >
              <Image
                src="/img/sections/hero-green-premium.jpg"
                alt="Professional team collaboration"
                fill
                className="feature-image"
                sizes="(max-width: 991px) 100vw, 1140px"
              />
            </figure>
          </div>
        </section>
        {/* Uncomment This And Use Video here */}
        {/* Promotional Video Section */}
        {/* <section className="wrapper bg-light">
          <div className="container position-relative">
            <figure
              data-delay="250"
              data-cues="fadeIn"
              className="rounded mt-n17 mt-lg-n20 position-relative justify-content-center d-flex"
            >
              <video
                loop
                muted
                autoPlay
                playsInline
                preload="auto"
                poster="/img/movie.webp"
                className="w-100 rounded caption-overlay d-block video-large"
              >
                <source src="/img/movie.mp4" type="video/mp4" media="(max-width: 720px)" />
                <source src="/img/movie.mp4" type="video/mp4" media="(min-width: 721px)" />
                <p>Your browser does not support the video tag. Please consider upgrading.</p>
              </video>
            </figure>
          </div>
        </section> */}

        {/* About Section */}
        <section className="wrapper" id="about">
          <div className="container py-12 py-md-14">
            <About
              headingH1="About "
              span="Tawade Consultancy Services"
              para={aboutContent.paragraphs[0]}
              para2={aboutContent.paragraphs[1]}
              para3={aboutContent.paragraphs[2]}
              imgPosition="right"
              src1="/img/sections/about-hr-team.jpg"
              src="/img/sections/about-hr-team.jpg"
              alt="About Tawade Consultancy Services"
            />
          </div>
        </section>

        {/* HR Solutions Cards Section */}
        <section className="wrapper bg-light" id="services">
          <div className="container pb-12 pb-md-16">
            <div className="row text-center section mb-5 mb-md-0">
              <h2 className="fs-46 fw-bold mb-3 mt-3">
                Our <span>Training & Career Services</span>
              </h2>
              <p className="mx-auto services-intro">
                Practical programs designed to build skills, confidence, and placement outcomes for aspiring IT professionals.
              </p>
            </div>
            <div className="mt-10">
              <ImageCard arr={homeSolutionsCardData} />
            </div>
          </div>
        </section>

        <section className="wrapper" id="recruitment">
          <div className="container py-12 py-md-14">
            <div className="text-center mb-8">
              <h2 className="fs-38 fw-bold mb-3">
                Recruitment Solutions for <span>Growing Teams</span>
              </h2>
              <p className="mx-auto services-intro mb-0">
                Inspired by global manpower best practices, we deliver fast access to qualified talent through direct hiring,
                flexible staffing, and onsite workforce support.
              </p>
            </div>

            <div className="row gy-6">
              {recruitmentServices.map((service) => (
                <div className="col-lg-4" key={service.id}>
                  <div className="recruitment-card h-100">
                    <span className="recruitment-icon">
                      <i className={service.icon} />
                    </span>
                    <h3 className="fs-24 mb-2">{service.title}</h3>
                    <p className="mb-0">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="recruitment-expertise mt-8">
              <h3 className="fs-26 fw-bold mb-3 text-center">
                Areas of <span>Recruitment Expertise</span>
              </h3>
              <div className="recruitment-tags">
                {recruitmentExpertise.map((area) => (
                  <span className="recruitment-tag" key={area}>
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="wrapper">
          <div className="container py-12 py-md-14">
            <div className="row gx-lg-8 gy-8 align-items-start">
              <div className="col-lg-6">
                <h2 className="fs-38 fw-bold mb-4">
                  Why Choose <span>Us</span>
                </h2>
                <ul className="strength-list">
                  {keyStrengths.map((point) => (
                    <li key={point}>
                      <i className="uil uil-check-circle strength-icon" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-6">
                <div className="mission-vision-card p-4 p-md-5">
                  <h3 className="fs-28 mb-3">Mission</h3>
                  <p className="mb-4">{aboutContent.mission}</p>
                  <h3 className="fs-28 mb-3">Vision</h3>
                  <p className="mb-0">{aboutContent.vision}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="wrapper bg-light">
          <div className="container py-12 py-md-14">
            <div className="row gx-lg-8 gy-8 align-items-center">
              <div className="col-lg-5 text-center">
                <Image
                  src="/img/sections/founder-photo.png"
                  alt="Founder of Tawade Consultancy Services"
                  width={520}
                  height={520}
                  className="founder-photo"
                  sizes="(max-width: 991px) 80vw, 420px"
                />
              </div>
              <div className="col-lg-7">
                <h2 className="fs-38 fw-bold mb-3">
                  Meet Our Founder <span>Jaitreeth Tawade</span>
                </h2>
                <p className="mb-3">
                  Tawade Consultancy Services is built on a vision to create practical career pathways and
                  dependable support for every learner and organization we serve.
                </p>
                <p className="mb-0">
                  Through industry-focused training, mentorship, and placement guidance, our leadership is
                  committed to turning potential into real professional growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="wrapper bg-light">
          <div className="container py-12 py-md-14 text-center">
            <h2 className="fs-38 fw-bold mb-3">
              Industries We <span>Support</span>
            </h2>
            <p className="mx-auto services-intro mb-8">Training talent and delivering practical solutions across diverse industry domains.</p>
            <div className="industry-tags">
              {industries.map((item) => (
                <span key={item} className="industry-tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="wrapper">
          <div className="container py-12 py-md-14">
            <div className="text-center mb-8">
              <h2 className="fs-38 fw-bold mb-3">
                Our Process to Build <span>Your Career</span>
              </h2>
            </div>
            <div className="row gy-6">
              {workflowSteps.map((step) => (
                <div className="col-lg-3 col-md-6" key={step.id}>
                  <div className="process-card h-100">
                    <span className="process-number">{step.id}</span>
                    <h3 className="fs-22 mb-2">{step.title}</h3>
                    <p className="mb-0">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="wrapper bg-light">
          <div className="container py-12 py-md-14">
            <div className="text-center mb-8">
              <h2 className="fs-38 fw-bold mb-3">
                Trusted by Learners, <span>Driven by Results</span>
              </h2>
            </div>
            <div className="row gy-6">
              {achievements.map((item) => (
                <div className="col-lg-3 col-md-6" key={item.id}>
                  <div className="achievement-card text-center">
                    <span className="achievement-icon">
                      <i className={item.icon} />
                    </span>
                    <h3 className="achievement-metric">
                      <AnimatedMetric value={item.value} suffix={item.suffix} decimals={item.decimals} />
                    </h3>
                    <p className="mb-0">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="wrapper">
          <div className="container py-10 py-md-12">
            <div className="text-center mb-6">
              <h3 className="fs-30 fw-bold mb-2">Trusted Expertise</h3>
              <p className="mb-0 text-main">Professional standards that strengthen every training and consulting engagement.</p>
            </div>
            <div className="brand-badge-grid">
              <div className="brand-badge-card">
                <span className="brand-badge-icon">
                  <i className="uil uil-shield-check" />
                </span>
                <p className="mb-0">Quality Focused</p>
              </div>
              <div className="brand-badge-card">
                <span className="brand-badge-icon">
                  <i className="uil uil-award" />
                </span>
                <p className="mb-0">Industry Aligned</p>
              </div>
              <div className="brand-badge-card">
                <span className="brand-badge-icon">
                  <i className="uil uil-users-alt" />
                </span>
                <p className="mb-0">Expert Mentors</p>
              </div>
              <div className="brand-badge-card">
                <span className="brand-badge-icon">
                  <i className="uil uil-briefcase-alt" />
                </span>
                <p className="mb-0">Career Outcomes</p>
              </div>
            </div>
          </div>
        </section>

        <section className="wrapper" id="contact">
          <div className="container py-12 py-md-14">
            <div className="row gx-lg-8 gy-8 align-items-center">
              <div className="col-lg-6">
                <h2 className="fs-38 fw-bold mb-3">
                  Contact <span>Our Team</span>
                </h2>
                <p className="mb-6">
                  Start your IT career journey with free guidance, course counseling, and placement-focused support.
                </p>
                <div className="contact-card">
                  <p className="mb-2">
                    <strong>Email:</strong> {contactDetails.email}
                  </p>
                  <p className="mb-0">
                    <strong>Address:</strong> {contactDetails.address}
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <Image
                  src="/img/sections/pro-contact-discussion.jpg"
                  alt="Professional consultation with IT career mentor"
                  width={1200}
                  height={800}
                  className="contact-image"
                  sizes="(max-width: 991px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default Home;
