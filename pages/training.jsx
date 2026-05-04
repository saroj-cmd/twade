import Head from 'next/head';
import Image from 'next/image';
import { BriefcaseBusiness, ChartNoAxesColumn, CheckCircle2, GraduationCap, Landmark, Users } from 'lucide-react';
import NextLink from 'components/NextLink';

const trainingItems = [
  { title: 'Manpower Recruitment', icon: 'uil uil-users-alt' },
  { title: 'IT Training & Development', icon: 'uil uil-graduation-cap' },
  { title: 'HR Consultancy', icon: 'uil uil-briefcase-alt' },
  { title: 'Banking & Financial Services Support', icon: 'uil uil-university' },
  { title: 'Career Guidance & Placement Assistance', icon: 'uil uil-chart-line' }
];

const TrainingPage = () => {
  const getIcon = (iconClass) => {
    if (iconClass.includes('graduation')) return GraduationCap;
    if (iconClass.includes('university')) return Landmark;
    if (iconClass.includes('chart-line')) return ChartNoAxesColumn;
    if (iconClass.includes('briefcase')) return BriefcaseBusiness;
    return Users;
  };

  return (
    <>
      <Head>
        <title>Training Services | Tawade Consultancy Services</title>
        <meta
          name="description"
          content="Explore professional training and career services by Tawade Consultancy Services."
        />
      </Head>

      <main className="overflow-hidden">
        <section className="bg-[#0b1f3a]">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-12 pt-28 md:px-6 md:pb-14 md:pt-32 lg:grid-cols-12">
              <div className="text-center lg:col-span-5">
                <Image
                  src="/img/logo.png"
                  alt="Tawade Consultancy Services Logo"
                  width={260}
                  height={260}
                  className="mx-auto h-auto w-52 rounded-full border-2 border-white/70 p-2"
                />
              </div>

              <div className="text-white lg:col-span-7">
                <h1 className="mb-3 text-4xl font-bold leading-tight md:text-5xl">
                  Tawade Consultancy Services
                  <br />
                  <span className="text-amber-300">Your Trust Is Our Breath</span>
                </h1>
                <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">Our Training Services</h2>

                <div className="grid gap-3 md:grid-cols-2">
                  {trainingItems.map((item, idx) => (
                    <div key={item.title}>
                      <div className="flex items-center gap-3 rounded-xl border border-white/25 bg-white/10 p-3 backdrop-blur">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-200 text-amber-900">
                          {(() => {
                            const Icon = getIcon(item.icon);
                            return <Icon size={18} />;
                          })()}
                        </span>
                        <p className="mb-0 text-sm text-white md:text-base">
                          <strong>{idx + 1}.</strong> {item.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <NextLink href="/#contact" title="Contact Us" className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-300" />
                  <NextLink href="/#home" title="Back to Home" className="rounded-full border border-white px-5 py-2 text-sm font-semibold text-white hover:bg-white hover:text-[#0b1f3a]" />
                </div>
              </div>
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:px-6 md:py-14 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <Image
                  src="/img/sections/hero-services-banner.png"
                  alt="Training and consultancy services"
                  width={1400}
                  height={520}
                  className="h-auto w-full rounded-2xl object-cover shadow-md"
                />
              </div>
              <div className="lg:col-span-6">
                <h3 className="mb-3 text-3xl font-bold text-slate-900">Why Choose Our Training Programs?</h3>
                <p className="mb-3 text-slate-600">
                  We combine real-world projects, mentor-led sessions, and placement-focused preparation to
                  help learners become career-ready.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 text-emerald-600" />
                    <span>Practical, job-oriented learning modules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 text-emerald-600" />
                    <span>Experienced trainers across domains</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 text-emerald-600" />
                    <span>Resume guidance and mock interview support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 text-emerald-600" />
                    <span>Dedicated career and placement assistance</span>
                  </li>
                </ul>
              </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TrainingPage;
