import { gql } from '@apollo/client';

export const GET_DATA = gql `{
  countries{
    capital,
    currency,
    name
    }
}`;