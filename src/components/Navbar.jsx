import { Fragment, useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';
import useSticky from 'hooks/useSticky';
import Image from 'next/image';
import NextLink from 'components/NextLink';
import SocialLinks from 'components/SocialLinks';

const Navbar = (props) => {
  // Destructure props with defaults applied via defaultProps below
  const { navClassName, navOtherClass, fancy, stickyBox, logoAlt } = props;

  const sticky = useSticky(350);

  const [isNarrowViewport, setIsNarrowViewport] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mq = window.matchMedia('(max-width: 991.98px)');
    const sync = () => setIsNarrowViewport(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const pinnedToTop = sticky || isNarrowViewport;

  const { pathname } = useRouter();
  const isHomePage = pathname === '/';
  const sectionLink = (id) => (isHomePage ? `#${id}` : `/#${id}`);

  const navbarRef = useRef(null);

  const logo = sticky ? 'logo' : logoAlt ?? 'logo-light';
  const navLinks = [
    { label: 'Home', href: sectionLink('home') },
    { label: 'Training', href: '/training' },
    { label: 'About Us', href: sectionLink('about') },
    { label: 'Services', href: sectionLink('services') }
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <Fragment>
      {stickyBox && (
        <div style={{ paddingTop: pinnedToTop ? navbarRef.current?.clientHeight : 0 }} />
      )}

      <nav
        ref={navbarRef}
        className={`site-navbar ${pinnedToTop ? 'fixed inset-x-0 top-0 z-50' : 'absolute inset-x-0 top-0 z-40'} border-b border-slate-200 bg-white/95 backdrop-blur`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <NextLink
            href="/"
            title={
              <span className="inline-flex items-center">
                <Image
                  alt="Tawade Consultancy logo"
                  src={`/img/${logo}.png`}
                  width={384}
                  height={384}
                  sizes="(max-width: 992px) 82px, 110px"
                  className="h-[72px] w-[72px] rounded-full border-2 border-[#0b1f3a] p-1 md:h-[90px] md:w-[90px]"
                  priority
                />
                <span className="ml-2 hidden leading-tight sm:inline">
                  <span className="block text-lg font-semibold text-[#0b1f3a]">Tawade |</span>
                  <span className="block text-xs font-medium tracking-wide text-slate-700">Consultancy Services</span>
                  <span className="block text-[11px] italic text-slate-500">Your Trust Is Our Breath</span>
                </span>
              </span>
            }
          />

          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((item) => (
              <NextLink key={item.label} href={item.href} title={item.label} className="text-sm font-medium text-slate-700 hover:text-[#0b1f3a]" />
            ))}
            <NextLink
              title="Contact Us"
              href={sectionLink('contact')}
              className="rounded-full bg-[#0b1f3a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#071425]"
            />
          </div>

          <button
            type="button"
            aria-label="Open navigation menu"
            className="inline-flex items-center rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <aside
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <Image
                alt="Tawade Consultancy logo"
                src="/img/logo-light.png"
                width={80}
                height={80}
                className="rounded-full border-2 border-[#0b1f3a] p-1"
              />
              <button type="button" className="rounded-md p-2 text-slate-700 hover:bg-slate-100" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="space-y-2">
              {navLinks.map((item) => (
                <NextLink
                  key={item.label}
                  href={item.href}
                  title={item.label}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                />
              ))}
              <NextLink
                title="Contact Us"
                href={sectionLink('contact')}
                className="mt-2 inline-block rounded-full bg-[#0b1f3a] px-4 py-2 text-sm font-medium text-white"
              />
            </div>

            <div className="mt-8 border-t border-slate-200 pt-5">
              <NextLink title="info@tawadeconsultancy.com" className="text-sm text-slate-600" href="mailto:info@tawadeconsultancy.com" />
              <SocialLinks className="mt-4 flex items-center gap-3" />
            </div>
          </aside>
        </div>
      )}
    </Fragment>
  );
};

// Default props for the Navbar component
Navbar.defaultProps = {
  stickyBox: true,
  navOtherClass: '',
  navClassName: ''
};

export default Navbar;
