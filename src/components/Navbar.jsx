// Navbar.jsx
import { Fragment, useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSticky from 'hooks/useSticky';
import Image from 'next/image';
import NextLink from 'components/NextLink';
import SocialLinks from 'components/SocialLinks';

const Navbar = (props) => {
  // Destructure props with defaults applied via defaultProps below
  const { navClassName, navOtherClass, fancy, stickyBox, logoAlt } = props;

  const sticky = useSticky(350);

  const [isNarrowViewport, setIsNarrowViewport] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mq = window.matchMedia('(max-width: 991.98px)');
    const sync = () => setIsNarrowViewport(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Narrow viewports: keep bar fixed so page scroll does not slide it away with body content
  const pinnedToTop = sticky || isNarrowViewport;

  const { pathname } = useRouter();
  const isHomePage = pathname === '/';
  const sectionLink = (id) => (isHomePage ? `#${id}` : `/#${id}`);

  // Ref for the main navbar element (used for measuring height, etc.)
  const navbarRef = useRef(null);

  // Determine which logo to display based on sticky state; fallback to provided logoAlt or default 'logo-light'
  const logo = sticky ? 'logo' : logoAlt ?? 'logo-light';

  // Predefined class applied when navbar is sticky/fixed
  const fixedClassName = 'navbar navbar-expand-lg center-nav transparent navbar-light navbar-clone fixed';
  const headerStyle = {
    background: pinnedToTop ? 'rgba(255, 255, 255, 0.98)' : 'rgba(248, 249, 250, 0.96)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderBottom: '1px solid #e0e0e0',
    boxShadow: pinnedToTop ? '0 8px 24px rgba(11, 31, 58, 0.06)' : '0 4px 16px rgba(11, 31, 58, 0.04)'
  };

  // Header content markup for both fancy and standard layouts
  const headerContent = (
    <Fragment>
      {/* Navbar Brand / Logo */}
      <div className="navbar-brand">
        <NextLink
          href="/"
          title={
            <span className="d-inline-flex align-items-center brand-lockup">
              <Image
                alt="Tawade Consultancy logo"
                src={`/img/${logo}.png`}
                width={384}
                height={384}
                sizes="(max-width: 992px) 82px, 110px"
                className="my-2 rounded-circle border border-2 p-1 site-navbar-logo-medallion"
                style={{ borderColor: 'var(--brand-navy, #0b1f3a)' }}
                priority
              />
              <span className="brand-text-block ms-2">
                <span className="brand-title-line">
                  Tawade <span className="brand-divider">|</span>
                </span>
                <span className="brand-subtitle-line">Consultancy Services</span>
                <span className="brand-tagline-line">Your Trust Is Our Breath</span>
              </span>
            </span>
          }
        />
      </div>

      {/* Drawer: Bootstrap 5 navbar+offcanvas uses .offcanvas only — do NOT combine .navbar-collapse here
          (collapse flex rules break the drawer / hid link text vs white panel). */}
      <div
        id="offcanvas-nav"
        tabIndex={-1}
        aria-labelledby="offcanvasNavLabel"
        className="offcanvas offcanvas-nav offcanvas-start bg-white text-dark"
      >
        <span id="offcanvasNavLabel" className="visually-hidden">
          Main navigation menu
        </span>
        {/* Offcanvas Header visible on small screens */}
        <div className="offcanvas-header d-lg-none offcavas-bg">
          <NextLink
            href="/"
            title={
              <Image
                alt="Tawade Consultancy logo"
                src="/img/logo-light.png"
                width={384}
                height={384}
                sizes="90px"
                className="rounded-circle border border-2 p-1 site-navbar-logo-medallion site-navbar-logo-offcanvas"
                style={{ borderColor: 'var(--brand-navy, #0b1f3a)' }}
                data-bs-dismiss="offcanvas"
              />
            }
          />
        </div>

        {/* Offcanvas Body with navigation links */}
        <div className="offcanvas-body ms-lg-auto d-flex flex-column offcavas-bg">
          <ul className="navbar-nav">
            <li className="nav-item" data-bs-dismiss="offcanvas">
              <NextLink href={sectionLink('home')} title="Home" className="nav-link rounded" />
            </li>
            <li className="nav-item" data-bs-dismiss="offcanvas">
              <NextLink href="/training" title="Training" className="nav-link rounded" />
            </li>
            <li className="nav-item" data-bs-dismiss="offcanvas">
              <NextLink href={sectionLink('about')} title="About Us" className="nav-link rounded" />
            </li>
            <li className="nav-item" data-bs-dismiss="offcanvas">
              <NextLink href={sectionLink('services')} title="Services" className="nav-link rounded" />
            </li>
            <li className="nav-item align-items-center d-flex" data-bs-dismiss="offcanvas">
              <NextLink
                title="Contact Us"
                href={sectionLink('contact')}
                className="btn btn-sm btn-primary text-white mt-2 mt-lg-0 rounded"
              />
            </li>
          </ul>

          {/* Offcanvas Footer with contact info & social links (visible on small screens) */}
          <div className="offcanvas-footer d-lg-none">
            <div>
              <NextLink
                title="info@tawadeconsultancy.com"
                className="link-body"
                href="mailto:info@tawadeconsultancy.com"
              />
              <br />
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>

      {/* Navbar toggler for mobile (hamburger icon) */}
      <div className={navOtherClass}>
        <ul className="navbar-nav flex-row align-items-center ms-auto">
          <li className="nav-item d-lg-none">
            <button
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvas-nav"
              aria-controls="offcanvas-nav"
              aria-label="Open navigation menu"
              className="hamburger offcanvas-nav-btn text-dark"
            >
              <span />
            </button>
          </li>
        </ul>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      {/* Optionally add a spacer element equal to the navbar height when sticky */}
      {stickyBox && (
        <div style={{ paddingTop: pinnedToTop ? navbarRef.current?.clientHeight : 0 }} />
      )}

      <nav ref={navbarRef} className={`${pinnedToTop ? fixedClassName : navClassName} site-navbar`} style={headerStyle}>
        {fancy ? (
          <div className="container">
            <div className="navbar-collapse-wrapper bg-white d-flex flex-row flex-nowrap w-100 justify-content-between align-items-end">
              {headerContent}
            </div>
          </div>
        ) : (
          <div className="container flex-lg-row flex-nowrap align-items-center">
            {headerContent}
          </div>
        )}
      </nav>
    </Fragment>
  );
};

// Default props for the Navbar component
Navbar.defaultProps = {
  stickyBox: true,
  navOtherClass: 'navbar-other d-flex d-lg-none',
  navClassName: 'navbar navbar-expand-lg classic transparent position-absolute navbar-light'
  // Alternative class option: 'navbar navbar-expand-lg bg-image'
};

export default Navbar;
