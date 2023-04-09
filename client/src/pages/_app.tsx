import 'ress';
import '@/styles/global.css';
import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import { GoogleTagManager } from '@/shared/components/GoogleTagManager';
import usePageTransition from '@/shared/hooks/usePageTransition';

import '@/styles/nprogress.css';

function MyApp({ Component, pageProps }: AppProps) {
  usePageTransition();

  return (
    <>
      <GoogleTagManager />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
          breakpoints: {
            xs: '360px',
            sm: '800px',
            md: '1000px',
            lg: '1200px',
            xl: '1400px',
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

export default MyApp;
