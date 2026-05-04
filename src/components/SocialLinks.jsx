// SocialLinks.jsx
import React from 'react';

// Social media links configuration
const links = [
  {
    id: 1,
    icon: 'uil uil-facebook',
    url: 'https://www.facebook.com/tawadeconsultancyservices/'
  },
  {
    id: 2,
    icon: 'uil uil-instagram',
    url: 'https://www.instagram.com/tawadeconsultancy/'
  },
  {
    id: 3,
    icon: 'uil uil-youtube',
    url: 'https://www.youtube.com/@tawadeconsultancy'
  },
  {
    id: 4,
    icon: 'uil uil-linkedin',
    url: 'https://www.linkedin.com/in/tawadeconsultancy-undefined-956b433b0/'
  }
];

// Reusable SocialLinks component
const SocialLinks = ({ className = 'nav social mt-4' }) => {
  return (
    <nav className={className}>
      {links.map(({ id, icon, url }) => (
        <a
          key={id}
          href={url}
          target="_blank" // Opens link in a new tab
          rel="noreferrer" // Security best practice
          aria-label="Social Media Link" // Improves accessibility
        >
          <i className={`${icon} fs-34 bg-white rounded`} />
        </a>
      ))}
    </nav>
  );
};

export default SocialLinks;
