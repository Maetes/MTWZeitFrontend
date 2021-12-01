import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel='manifest' href='https://mtw-it.de/manifest.json' />
          <link
            rel='apple-touch-icon'
            sizes='57x57'
            href='https://mtw-it.de/img/logos/favicons/apple-icon-57x57.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='60x60'
            href='https://mtw-it.de/img/logos/favicons/apple-icon-60x60.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='72x72'
            href='https://mtw-it.de/img/logos/favicons/apple-icon-72x72.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='76x76'
            href='https://mtw-it.de/img/logos/favicons/apple-icon-76x76.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='114x114'
            href='https://mtw-it.de/img/logos/favicons/apple-icon-114x114.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='120x120'
            href='https://mtw-it.de/img/logos/favicons/apple-icon-120x120.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='144x144'
            href='https://mtw-it.de/img/logos/favicons/apple-icon-144x144.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='152x152'
            href='https://mtw-it.de/img/logos/favicons/apple-icon-152x152.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='https://mtw-it.de/img/logos/favicons/apple-icon-180x180.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='192x192'
            href='https://mtw-it.de/img/logos/favicons/android-icon-192x192.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='https://mtw-it.de/img/logos/favicons/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='96x96'
            href='https://mtw-it.de/img/logos/favicons/favicon-96x96.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='https://mtw-it.de/img/logos/favicons/favicon-16x16.png'
          />
          <meta name='msapplication-TileColor' content='#005a80' />
          <meta
            name='msapplication-TileImage'
            content='https://mtw-it.de/img/logos/favicons/ms-icon-144x144.png'
          />
          <meta name='theme-color' content='#005a80' />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
