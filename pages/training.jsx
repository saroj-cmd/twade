import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'components/NextLink';

const recruitmentItems = [
  { title: 'Executive Search & Leadership Hiring', icon: 'uil uil-search-alt' },
  { title: 'Permanent Staffing Solutions', icon: 'uil uil-briefcase-alt' },
  { title: 'Contract & Project-Based Hiring', icon: 'uil uil-users-alt' },
  { title: 'Screening, Assessment & Shortlisting', icon: 'uil uil-check-circle' },
  { title: 'Onboarding Coordination & Candidate Support', icon: 'uil uil-user-check' }
];

const RecruitmentPage = () => {
  return (
    <>
      <Head>
        <title>Recruitment Services | Tawade Consultancy Services</title>
        <meta
          name="description"
          content="Explore end-to-end recruitment services by Tawade Consultancy Services."
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
                <h2 className="fs-28 fw-bold mb-4 text-white">Our Recruitment Services</h2>

                <div className="row gy-3">
                  {recruitmentItems.map((item, idx) => (
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
                  src="/img/recruitment-banner.svg"
                  alt="Recruitment hiring pipeline illustration"
                  width={1400}
                  height={520}
                  className="training-support-image"
                />
              </div>
              <div className="col-lg-6">
                <h3 className="fs-34 fw-bold mb-3">Why Choose Our Recruitment Services?</h3>
                <p className="mb-3">
                  We combine market intelligence, rigorous screening, and fast coordination to help employers
                  hire the right talent with confidence.
                </p>
                <ul className="training-points-list">
                  <li>
                    <i className="uil uil-check-circle" />
                    <span>Role-focused sourcing aligned to your business goals</span>
                  </li>
                  <li>
                    <i className="uil uil-check-circle" />
                    <span>Experienced recruiters across key industry domains</span>
                  </li>
                  <li>
                    <i className="uil uil-check-circle" />
                    <span>Structured screening and interview coordination</span>
                  </li>
                  <li>
                    <i className="uil uil-check-circle" />
                    <span>Reliable onboarding support and hiring follow-through</span>
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

export default RecruitmentPage;
