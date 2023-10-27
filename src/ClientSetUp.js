import { ApolloClient, InMemoryCache } from '@apollo/client';
import { persistCache } from 'apollo-cache-persist';

const cache = new InMemoryCache();

const CreateApolloClient = async () => {
    // Restore cached data from storage
    await persistCache({
        cache,
        storage: window.localStorage, // or window.sessionStorage for session-level persistence
        // key: "CountryData"
    });

    const client = new ApolloClient({
        uri: 'https://countries.trevorblades.com/', // Replace with your GraphQL API endpoint
        cache,
    });

    return client;
};

export default CreateApolloClient;
