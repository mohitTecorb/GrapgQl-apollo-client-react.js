import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://countries.trevorblades.com/',
    cache: new InMemoryCache(),
});

export const cache = new InMemoryCache({
    typePolicies: {
        Product: {
            // In an inventory management system, products might be identified
            // by their UPC.
            keyFields: ["upc"],
        },
        Person: {
            // In a user account system, the combination of a person's name AND email
            // address might uniquely identify them.
            keyFields: ["name", "email"],
        },
        Book: {
            // If one of the keyFields is an object with fields of its own, you can
            // include those nested keyFields by using a nested array of strings:
            keyFields: ["title", "author", ["name"]],
        },
        AllProducts: {
            // Singleton types that have no identifying field can use an empty
            // array for their keyFields.
            keyFields: [],
        },
    },
});

// Book:{"title":"Fahrenheit 451","author":{"name":"Ray Bradbury"}}

// *********** there are two things **********

//1. ********* readQuery *********************

const READ_TODO = gql`
  query ReadTodo($id: ID!) {
    todo(id: $id) {
      id
      text
      completed
    }
  }
`;

// Fetch the cached to-do item with ID 5
const { todo } = client.readQuery({
    query: READ_TODO,
    // Provide any required variables in this object.
    // Variables of mismatched types will return `null`.
    variables: {
        id: 5,
    },
});


//2. ********* Write Query *********************
client.writeQuery({
    query: gql`
      query WriteTodo($id: Int!) {
        todo(id: $id) {
          id
          text
          completed
        }
      }`,
    data: { // Contains the data to write
        todo: {
            __typename: 'Todo',
            id: 5,
            text: 'Buy grapes 🍇',
            completed: false
        },
    },
    variables: {
        id: 5
    }
});

// Results 


// BEFORE
// {
//     'Todo:5': {
//       __typename: 'Todo',
//       id: 5,
//       text: 'Buy oranges 🍊',
//       completed: true,
//       dueDate: '2022-07-02'
//     }
//   }
  
  // AFTER
//   {
//     'Todo:5': {
//       __typename: 'Todo',
//       id: 5,
//       text: 'Buy grapes 🍇',
//       completed: false,
//       dueDate: '2022-07-02'
//     }
//   }