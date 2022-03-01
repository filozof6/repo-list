import React from 'react';
import './App.css';
import { Container } from '@mui/material';
import RepoWrapper from './components/RepoWrapper';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
          <RepoWrapper />
        </Container>
      </ApolloProvider>
    </div>
  );
}

export default App;
