// components/Header.jsx
import React from 'react';
import Navbar from './Navbar';

/**
 * Header Component
 * Do not wrap the navbar in overflow-hidden — Bootstrap offcanvas uses position:fixed
 * and Chromium/WebKit clip it to overflowing ancestors; the drawer body (nav links)
 * disappears while the header/logo and close btn can still appear.
 */
const Header = () => {
  return <Navbar />;
};

export default Header;
