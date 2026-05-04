import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'components/NextLink';

const trainingItems = [
  { title: 'Manpower Recruitment', icon: 'uil uil-users-alt' },
  { title: 'IT Training & Development', icon: 'uil uil-graduation-cap' },
  { title: 'HR Consultancy', icon: 'uil uil-briefcase-alt' },
  { title: 'Banking & Financial Services Support', icon: 'uil uil-university' },
  { title: 'Career Guidance & Placement Assistance', icon: 'uil uil-chart-line' }
];

const TrainingPage = () => {
  return (
    <>
      <Head>
        <title>Training Services | Tawade Consultancy Services</title>
        <meta
          name="description"
          content="Explore professional training and career services by Tawade Consultancy Services."
        />
      </Head>

      <main className="content-wrapper overflow-hidden">
        <section className="wrapper secondary-bg">
          <div className="container pt-18 pt-md-20 pb-12 pb-md-14">
            <div className="row gx-lg-10 gy-8 align-items-center">
              <div className="col-lg-5 text-center">
                <Image
                  src="/img/logo.png"
                  alt="Tawade Consultancy Services Logo"
                  width={260}
                  height={260}
                  className="training-hero-logo"
                />
              </div>

              <div className="col-lg-7 text-white">
                <h1 className="display-6 fw-bold mb-3">
                  Tawade Consultancy Services
                  <br />
                  <span>Your Trust Is Our Breath</span>
                </h1>
                <h2 className="fs-28 fw-bold mb-4 text-white">Our Training Services</h2>

                <div className="row gy-3">
                  {trainingItems.map((item, idx) => (
                    <div className="col-md-6" key={item.title}>
                      <div className="training-service-card">
                        <span className="training-service-icon">
                          <i className={item.icon} />
                        </span>
                        <p className="mb-0 training-service-title">
                          <strong>{idx + 1}.</strong> {item.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 d-flex flex-wrap gap-2">
                  <NextLink href="/#contact" title="Contact Us" className="btn btn-primary rounded-pill" />
                  <NextLink href="/#home" title="Back to Home" className="btn btn-outline-primary rounded-pill" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="wrapper bg-light">
          <div className="container py-12 py-md-14">
            <div className="row gx-lg-8 gy-8 align-items-center">
              <div className="col-lg-6">
                <Image
                  src="/img/sections/hero-services-banner.png"
                  alt="Training and consultancy services"
                  width={1400}
                  height={520}
                  className="training-support-image"
                />
              </div>
              <div className="col-lg-6">
                <h3 className="fs-34 fw-bold mb-3">Why Choose Our Training Programs?</h3>
                <p className="mb-3">
                  We combine real-world projects, mentor-led sessions, and placement-focused preparation to
                  help learners become career-ready.
                </p>
                <ul className="training-points-list">
                  <li>
                    <i className="uil uil-check-circle" />
                    <span>Practical, job-oriented learning modules</span>
                  </li>
                  <li>
                    <i className="uil uil-check-circle" />
                    <span>Experienced trainers across domains</span>
                  </li>
                  <li>
                    <i className="uil uil-check-circle" />
                    <span>Resume guidance and mock interview support</span>
                  </li>
                  <li>
                    <i className="uil uil-check-circle" />
                    <span>Dedicated career and placement assistance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TrainingPage;
