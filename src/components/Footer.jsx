// components/Footer.jsx
import Image from 'next/image';
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
  <div className="widget">
    <h4 className="widget-title fs-24 mb-3 text-white">{title}</h4>
    <ul className="list-unstyled text-reset mb-0">
      {list.map(({ url, title, id }) => (
        <li key={id}>
          <NextLink href={`${url}${location}`} title={title} />
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
  const companyName = 'Tawade Consultancy';
  const addressLine = contactDetails.address.replace(/^Tawade Consultancy,\s*/i, '');

  return (
    <footer className="border-top dark-bg overflow-hidden">
      <div className="container pt-10 pt-md-12 pb-7">
        <div className="row gx-10 justify-content-around">
          {/* Branding and social links */}
          <div className="col-lg-3">
            <div className="widget d-flex flex-column align-items-center">

                <Image
                  src="/img/logo-light.png"
                  alt="Tawade Consultancy"
                  width={384}
                  height={384}
                  sizes="(max-width: 575px) 160px, 220px"
                  className="text-center mb-3 site-footer-logo"
                />
  
              <p className="lead mb-2 text-justify fs-18 text-white">
                Providing Your Company with All-Inclusive, Customised HR Solutions for Long-Term Success
              </p>
            </div>
            <div className="d-flex align-items-center flex-column">
              <h4 className="fs-24 text-white">Follow Us On</h4>
              <SocialLinks className="nav social text-md-end" />
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-md-3 col-lg-2 mt-md-5 mt-lg-0 mt-10 text-white d-flex justify-content-md-center">
            {widget(usefulLinks, 'Useful Links')}
          </div>

          {/* Contact Info */}
          <div className="col-md-3 col-lg-3 mt-md-5 mt-lg-0 mt-10 text-white d-flex justify-content-md-center">
            <div className="widget">
              <h4 className="widget-title text-white fs-24 mb-3">Contact Us</h4>

              <div className="d-flex mb-3 align-items-start">
                <i className="uil uil-location-pin-alt fs-30 text-white" />
                <address className="text-white ms-2 m-0 mt-1">
                  {companyName}
                  <br />
                  {addressLine}
                </address>
              </div>

              <div className="d-flex mb-3 align-items-center">
                <i className="uil uil-phone fs-26 text-white" />
                <a href={`tel:${contactDetails.phone}`} className="link-body ms-2 text-white">
                  {contactDetails.phone}
                </a>
              </div>

              <div className="d-flex mb-3 align-items-center">
                <i className="uil uil-envelope fs-26 text-white" />
                <a href="mailto:info@tawadeconsultancy.com" className="link-body ms-2 text-white">
                  info@tawadeconsultancy.com
                </a>
              </div>

            </div>
          </div>

          {/* Map Location */}
          <div className="col-md-3 col-lg-3 mt-md-5 mt-lg-0 mt-10 text-white d-flex justify-content-md-center">
            <div className="widget">
              <h4 className="widget-title text-white fs-24 mb-5">Location</h4>
              <div className="d-flex justify-content-center border rounded overflow-hidden p-4">
                <a
                  href="https://maps.app.goo.gl/q8mHeCj5Hhi8xniG9?g_st=awb"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-white rounded-pill"
                >
                  Open Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="mt-4 mt-md-4 mb-7" />

        {/* Copyright */}
        <div className="d-md-flex align-items-center justify-content-center">
          <p className="mb-2 mb-lg-0 text-white">
            © {new Date().getFullYear()} HRMate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
