import { gql } from '@apollo/client';

export const GET_DATA = gql`{
  countries{
    capital,
    currency,
    name
    }
}`;

// export const GET_SPACEX_DATA = gql`
// {
//   query GetCountries($offset: Int, $limit: Int) {
//     launchesPast(offset: $offset, limit: $limit) {
//       mission_name
//     launch_date_local
//     launch_site {
//       site_name_long
//     }
//     }
//   }
// }
// `
// launchesPast(limit: 20) {
//   mission_name
//   launch_date_local
//   launch_site {
//     site_name_long
//   }
// }
// export const GET_SPACEX_DATA = gql`
// {
//   launchesPast($limit: $limit) {
//       mission_name
//       launch_date_local
//       launch_site {
//         site_name_long
//       }
//     } 
// }
// `

export const GET_SPACEX_DATA = gql`
  query GetSpaceXData($limit: Int!, $offset: Int!) {
    launchesPast(limit: $limit, offset: $offset) {
      mission_name
      id
    } 
  }
`;