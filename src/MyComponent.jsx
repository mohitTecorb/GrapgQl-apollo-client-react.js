import React, { useEffect } from 'react';
import { useQuery, useApolloClient, gql } from '@apollo/client';
import { GET_DATA } from './queries';

const MyComponent = () => {
    const { loading, error, data } = useQuery(GET_DATA);
    const client = useApolloClient();
    const deleteCountry = (countryName) => {
        const existingData = client.readQuery({
            query: GET_DATA,
        });

        const updatedData = {
            countries: existingData.countries.filter(country => country.name !== countryName),
        };

        // Write the updated data back to the cache
        client.writeQuery({
            query: GET_DATA,
            data: updatedData,
        });
        // console.log("updatedData", updatedData);
    };

    // *************** update function ***********************

    const updateCountryName = (oldName) => {
        let newName = 'New country name'
        const existingData = client.readQuery({ query: GET_DATA });

        const updatedData = {
            countries: existingData.countries.map(country => {
                if (country.name === oldName) {
                    // Update the name of the country
                    return { ...country, name: newName };
                }
                return country;
            }),
        };
        // console.log("updateddata", updatedData);
        // Write the updated data back to the cache
        client.writeQuery({
            query: GET_DATA,
            data: updatedData,
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log("data", data);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Country Name</td>
                        <td>Currency</td>
                        <td>Capital</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {data?.countries?.length > 0 && data.countries.map((country, index) => (
                        <tr key={index}>
                            <td>{country?.name}</td>
                            <td>{country?.currency}</td>
                            <td>{country?.capital}</td>
                            <td>
                                <button onClick={() => { updateCountryName(country?.name) }}>Update country name</button>
                                <button onClick={() => { deleteCountry(country?.name) }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default MyComponent;
