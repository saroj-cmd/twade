import { useEffect, useState, Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ThemeProvider from 'theme/ThemeProvider';
import Layout from 'components/Layout';

// Global CSS Imports
// import 'animate.css';
import 'styles/style.css';
import 'styles/responsive.css';
import 'plugins/scrollcue/scrollCue.css';
import 'assets/scss/style.scss';

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const [loading, setLoading] = useState(true);

  // Dynamically import Bootstrap JS (avoids server-side issues)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bootstrap');
    }
  }, []);

  // Initialize scrollCue on route change
  useEffect(() => {
    (async () => {
      const scrollCue = (await import('plugins/scrollcue')).default;
      scrollCue.init({
        interval: -400,
        duration: 700,
        percentage: 0.8,
      });
      scrollCue.update();
    })();
  }, [pathname]);

  // Set loading to false after mount
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Fragment>
      {/* Global Meta Tags and SEO Setup */}
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HRMate – Next.js Template for HR Consultancy & Corporate Business Websites</title>
        <meta name="description" content="Next.js & React template for HR consultancy & corporate business websites - built with Bootstrap." />
        <meta property="og:type" content="website template" />
        <meta property="og:title" content="HRMate – Next.js Template for HR Consultancy & Corporate Business Websites" />
        <meta property="og:description" content="Next.js & React template for HR consultancy & corporate business websites - built with Bootstrap." />
        <meta property="og:url" content="https://themixly.com/themes/hr-consultancy-react-nextjs-template/" />
        <meta property="og:image" content="https://themixly.com/wp-content/uploads/2025/07/image-1-2-scaled.jpg" />
        <meta property="og:image:secure_url" content="https://themixly.com/wp-content/uploads/2025/07/image-1-2-scaled.jpg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="HRMate – Next.js Template for HR Consultancy & Corporate Business Websites" />
        <meta name="twitter:description" content="Next.js & React template for HR consultancy & corporate business websites - built with Bootstrap." />
        <meta name="twitter:image" content="https://themixly.com/wp-content/uploads/2025/07/image-1-2-scaled.jpg" />
      </Head>

      {/* Theme and Layout wrapper */}
      <Layout>
        <ThemeProvider>
          {loading ? (
            <div className="page-loader" />
          ) : (
            <Component {...pageProps} />
          )}
        </ThemeProvider>
      </Layout>
    </Fragment>
  );
}

export default MyApp;
