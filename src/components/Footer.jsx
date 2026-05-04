// components/Footer.jsx
import Image from 'next/image';
import { Mail, MapPin } from 'lucide-react';
import NextLink from 'components/NextLink';
import SocialLinks from 'components/SocialLinks';
import { usefulLinks, contactDetails } from '../data';

/**
 * Generates a widget with a list of links
 * @param {Array} list - List of link objects
 * @param {string} title - Widget title
 * @param {string} [location] - Optional location suffix to append to URLs
 */
const widget = (list, title, location = '') => (
  <div>
    <h4 className="mb-3 text-xl font-semibold text-white">{title}</h4>
    <ul className="space-y-2">
      {list.map(({ url, title, id }) => (
        <li key={id}>
          <NextLink href={`${url}${location}`} title={title} className="text-slate-200 hover:text-white" />
        </li>
      ))}
    </ul>
  </div>
);

/**
 * Footer Component
 * Contains branding, useful links, contact information, and a map embed.
 */
const Footer = () => {
  return (
    <footer className="overflow-hidden border-t border-slate-700 bg-[#0b1f3a]">
      <div className="mx-auto max-w-6xl px-4 pb-7 pt-10 md:px-6 md:pt-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

                <Image
                  src="/img/logo-light.png"
                  alt="Tawade Consultancy"
                  width={384}
                  height={384}
                  sizes="(max-width: 575px) 160px, 220px"
                  className="mb-3 h-auto w-40"
                />
  
              <p className="mb-2 text-justify text-base text-slate-100">
                Providing Your Company with All-Inclusive, Customised HR Solutions for Long-Term Success
              </p>
            </div>
            <div className="mt-4 flex flex-col items-center lg:items-start">
              <h4 className="text-xl text-white">Follow Us On</h4>
              <SocialLinks className="mt-3 flex items-center gap-3" />
            </div>
          </div>

          <div className="text-white">
            {widget(usefulLinks, 'Useful Links')}
          </div>

          <div className="text-white">
            <div>
              <h4 className="mb-3 text-xl font-semibold text-white">Contact Us</h4>

              <div className="mb-3 flex items-start gap-2">
                <MapPin className="mt-1 text-white" size={22} />
                <address className="m-0 text-slate-100">
                  {contactDetails.address}
                </address>
              </div>

              <div className="mb-3 flex items-center gap-2">
                <Mail className="text-white" size={20} />
                <a href="mailto:info@tawadeconsultancy.com" className="text-slate-100 hover:text-white">
                  info@tawadeconsultancy.com
                </a>
              </div>

            </div>
          </div>

          <div className="text-white">
            <div>
              <h4 className="mb-5 text-xl font-semibold text-white">Location</h4>
              <div className="flex justify-center overflow-hidden rounded border border-slate-500 p-4">
                <a
                  href="https://maps.app.goo.gl/q8mHeCj5Hhi8xniG9?g_st=awb"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-100"
                >
                  Open Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="mb-7 mt-8 border-slate-600" />

        <div className="flex items-center justify-center">
          <p className="mb-0 text-sm text-slate-200">
            © {new Date().getFullYear()} HRMate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
