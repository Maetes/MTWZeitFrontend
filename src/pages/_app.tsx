import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import theme from '../theme';
import { AppProps } from 'next/app';
import { useApollo } from '../lib/apolloClient';

import '../DatePickerWrapper.css';
import '../../node_modules/react-datepicker/dist/react-datepicker.css';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
