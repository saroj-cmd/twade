import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class HRConsultancy extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Favicon and Icons */}
          <link rel="icon" type="image/png" href="/img/favicon/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/img/favicon/favicon.svg" />
          <link rel="shortcut icon" href="/img/favicon/favicon-96x96.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/img/favicon/apple-touch-icon.png" />
          <link rel="manifest" href="/img/favicon/site.webmanifest" />
          {/* You may include additional <meta> tags, fonts, or preload links here */}
        </Head>
        <body>
          {/* Main application content */}
          <Main />
          {/* Scripts injected by Next.js */}
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Optional: Customize initial props if needed
HRConsultancy.getInitialProps = async (ctx) => {
  // Override renderPage to allow further customization if needed
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => App,
      enhanceComponent: (Component) => Component,
    });

  // Get initial document props
  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps };
};
