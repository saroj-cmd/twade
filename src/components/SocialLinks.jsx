import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const links = [
  { id: 1, icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/tawadeconsultancyservices/' },
  { id: 2, icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/tawadeconsultancy/' },
  { id: 3, icon: Youtube, label: 'YouTube', url: 'https://www.youtube.com/@tawadeconsultancy' },
  { id: 4, icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/tawadeconsultancy-undefined-956b433b0/' }
];

const SocialLinks = ({ className = 'mt-4 flex items-center gap-3' }) => {
  return (
    <nav className={className}>
      {links.map(({ id, icon: Icon, label, url }) => (
        <a
          key={id}
          href={url}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 transition hover:bg-amber-100"
        >
          <Icon size={18} />
        </a>
      ))}
    </nav>
  );
};

export default SocialLinks;
