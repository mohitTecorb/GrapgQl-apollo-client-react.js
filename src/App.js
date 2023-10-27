import { useState, useEffect } from 'react';
import './App.css';
import MyComponent from './MyComponent';
import SpaceComponent from './SpaceComponentPagination';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
function App() {
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    uri: 'https://countries.trevorblades.com/', // Replace with your GraphQL API endpoint
    cache,
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <MyComponent />
          {/* <SpaceComponent /> */}
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;


