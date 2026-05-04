import { Fragment, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import PageProgress from 'components/PageProgress';
import Hero from 'components/Hero';
import About from 'components/About';
import ImageCard from 'components/ImageCard';
import Image from 'next/image';
import { Award, BriefcaseBusiness, Building2, CheckCircle2, Headphones, ShieldCheck, Smile, Star, Users } from 'lucide-react';
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
  const getIcon = (iconClass) => {
    if (iconClass?.includes('building')) return Building2;
    if (iconClass?.includes('briefcase')) return BriefcaseBusiness;
    if (iconClass?.includes('smile')) return Smile;
    if (iconClass?.includes('star')) return Star;
    if (iconClass?.includes('headphones')) return Headphones;
    return Users;
  };

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

      <main className="overflow-hidden" id="home">
        {/* Hero Section */}
        <Hero />


        {/* remove this if you want to use video here */}
        <section className="bg-slate-50">
          <div className="relative mx-auto max-w-6xl px-4 md:px-6">
            <figure
              data-delay="250"
              data-cues="fadeIn"
              className="relative -mt-10 flex aspect-[16/9] min-h-[220px] justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg md:-mt-16 md:min-h-[420px]"
            >
              <Image
                src="/img/sections/hero-green-premium.jpg"
                alt="Professional team collaboration"
                fill
                className="h-full w-full object-cover"
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
        <section id="about">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-14">
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
        <section className="bg-slate-50" id="services">
          <div className="mx-auto max-w-6xl px-4 pb-12 md:px-6 md:pb-16">
            <div className="mb-5 text-center md:mb-0">
              <h2 className="mb-3 mt-3 text-3xl font-bold text-slate-900 md:text-5xl">
                Our <span>Training & Career Services</span>
              </h2>
              <p className="mx-auto max-w-3xl text-slate-600">
                Practical programs designed to build skills, confidence, and placement outcomes for aspiring IT professionals.
              </p>
            </div>
            <div className="mt-10">
              <ImageCard arr={homeSolutionsCardData} />
            </div>
          </div>
        </section>

        <section id="recruitment">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-14">
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl">
                Recruitment Solutions for <span>Growing Teams</span>
              </h2>
              <p className="mx-auto mb-0 max-w-3xl text-slate-600">
                Inspired by global manpower best practices, we deliver fast access to qualified talent through direct hiring,
                flexible staffing, and onsite workforce support.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recruitmentServices.map((service) => (
                <div key={service.id}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                      {(() => {
                        const Icon = getIcon(service.icon);
                        return <Icon size={20} />;
                      })()}
                    </span>
                    <h3 className="mb-2 text-2xl font-semibold text-slate-900">{service.title}</h3>
                    <p className="mb-0 text-slate-600">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="mb-3 text-center text-2xl font-bold text-slate-900">
                Areas of <span>Recruitment Expertise</span>
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {recruitmentExpertise.map((area) => (
                  <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700" key={area}>
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-14">
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  Why Choose <span>Us</span>
                </h2>
                <ul className="space-y-3">
                  {keyStrengths.map((point) => (
                    <li key={point} className="flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-slate-700">
                      <CheckCircle2 size={18} className="mt-0.5 text-emerald-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
                  <h3 className="mb-3 text-2xl font-semibold text-slate-900">Mission</h3>
                  <p className="mb-4 text-slate-600">{aboutContent.mission}</p>
                  <h3 className="mb-3 text-2xl font-semibold text-slate-900">Vision</h3>
                  <p className="mb-0 text-slate-600">{aboutContent.vision}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-14">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="text-center lg:col-span-5">
                <Image
                  src="/img/sections/founder-photo.png"
                  alt="Founder of Tawade Consultancy Services"
                  width={520}
                  height={520}
                  className="mx-auto h-auto w-full max-w-md rounded-2xl object-cover shadow-md"
                  sizes="(max-width: 991px) 80vw, 420px"
                />
              </div>
              <div className="lg:col-span-7">
                <h2 className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl">
                  Meet Our Founder <span>Jaitreeth Tawade</span>
                </h2>
                <p className="mb-3 text-slate-600">
                  Tawade Consultancy Services is built on a vision to create practical career pathways and
                  dependable support for every learner and organization we serve.
                </p>
                <p className="mb-0 text-slate-600">
                  Through industry-focused training, mentorship, and placement guidance, our leadership is
                  committed to turning potential into real professional growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-12 text-center md:px-6 md:py-14">
            <h2 className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Industries We <span>Support</span>
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-slate-600">Training talent and delivering practical solutions across diverse industry domains.</p>
            <div className="flex flex-wrap justify-center gap-2">
              {industries.map((item) => (
                <span key={item} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-14">
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl">
                Our Process to Build <span>Your Career</span>
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {workflowSteps.map((step) => (
                <div key={step.id}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0b1f3a] text-sm font-semibold text-white">{step.id}</span>
                    <h3 className="mb-2 text-xl font-semibold text-slate-900">{step.title}</h3>
                    <p className="mb-0 text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-14">
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl">
                Trusted by Learners, <span>Driven by Results</span>
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {achievements.map((item) => (
                <div key={item.id}>
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                    <span className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                      {(() => {
                        const Icon = getIcon(item.icon);
                        return <Icon size={20} />;
                      })()}
                    </span>
                    <h3 className="text-3xl font-bold text-slate-900">
                      <AnimatedMetric value={item.value} suffix={item.suffix} decimals={item.decimals} />
                    </h3>
                    <p className="mb-0 text-slate-600">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-3xl font-bold text-slate-900">Trusted Expertise</h3>
              <p className="mb-0 text-slate-600">Professional standards that strengthen every training and consulting engagement.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <ShieldCheck size={20} />
                </span>
                <p className="mb-0">Quality Focused</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Award size={20} />
                </span>
                <p className="mb-0">Industry Aligned</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Users size={20} />
                </span>
                <p className="mb-0">Expert Mentors</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <BriefcaseBusiness size={20} />
                </span>
                <p className="mb-0">Career Outcomes</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-14">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <h2 className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl">
                  Contact <span>Our Team</span>
                </h2>
                <p className="mb-6 text-slate-600">
                  Start your IT career journey with free guidance, course counseling, and placement-focused support.
                </p>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="mb-2 text-slate-700">
                    <strong>Email:</strong> {contactDetails.email}
                  </p>
                  <p className="mb-0 text-slate-700">
                    <strong>Address:</strong> {contactDetails.address}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-6">
                <Image
                  src="/img/sections/pro-contact-discussion.jpg"
                  alt="Professional consultation with IT career mentor"
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-2xl object-cover shadow-md"
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
