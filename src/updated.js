import React, { useEffect, useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_DATA } from './queries';

const MyComponent = () => {
    const [dataFromLocalStorage, setDataFromLocalStorage] = useState(null);

    const { loading, error, data, } = useQuery(GET_DATA, {
        fetchPolicy: 'cache-only', // This fetch policy ensures data is first attempted to be retrieved from the cache
    });


    useEffect(() => {
        const countriesData = localStorage.getItem('countries');
        if (countriesData) {
            setDataFromLocalStorage(JSON.parse(countriesData));
        }
    }, []);

    const client = useApolloClient();
    const deleteCountry = (countryName) => {
        let existingData = ""

        if (dataFromLocalStorage) {
            existingData = JSON.parse(localStorage.countries)
        } else {
            let newData = client.readQuery({
                query: GET_DATA,
            });
            existingData = newData.countries
        }

        const updatedData = {
            countries: existingData.filter(country => country.name !== countryName),
        };

        // Write the updated data back to the cache
        client.writeQuery({
            query: GET_DATA,
            data: updatedData,
        });
        localStorage.setItem('countries', JSON.stringify(updatedData.countries));
        setDataFromLocalStorage(updatedData.countries)
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
        localStorage.setItem('countries', JSON.stringify(updatedData.countries));

    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    // console.log("data", data);
    const handleData = () => {
        if (dataFromLocalStorage) {
            return dataFromLocalStorage
        } else {
            return data.countries
        }
    }
    console.log(">>>>>>>>", handleData());
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
                    {handleData()?.length > 0 && handleData()?.map((country, index) => (
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
