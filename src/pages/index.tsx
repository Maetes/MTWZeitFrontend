import { Container } from '@chakra-ui/layout';
import React from 'react';
import { NavigationPane } from '../components/NavigationPane';
import { SignOf } from '../components/SignOf';
import { TimeForm } from '../components/TimeForm';

const Index = () => (
  <>
    <NavigationPane />
    <Container>
      <TimeForm />
    </Container>
  </>
);

export default Index;
