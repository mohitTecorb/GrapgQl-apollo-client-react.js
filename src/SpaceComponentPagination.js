import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_SPACEX_DATA } from './queries';

const SpaceComponent = () => {
    const [pageSize, setPageSize] = useState(2)
    const [page, setPage] = useState(0)
    const { loading, error, data, fetchMore } = useQuery(GET_SPACEX_DATA, {
        variables: { limit: pageSize, offset: page * pageSize },
    });

    // const loadMoreData = () => {
    //     fetchMore({
    //         variables: { offset: data.launchesPast.length, limit: pageSize },
    //         updateQuery: (prevResult, { fetchMoreResult }) => {
    //             if (!fetchMoreResult) return prevResult;
    //             return {
    //                 launchesPast: [...prevResult.launchesPast, ...fetchMoreResult.launchesPast],
    //             };
    //         },
    //     });
    // };

    // const handlePageSize = () => {
    //     setPageSize(prev => prev + 2)
    // }

    const handlePage = (type) => {
        if (type == "prev") {
            setPage(prev => prev - 1)
        } else {
            setPage(prev => prev + 1)
        }
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log("data", page);

    return (
        <div>
            {data?.launchesPast?.map((item, index) => {
                return <h4 key={index}>{item?.mission_name}</h4>
            })}

            <button disabled={!page} style={{ padding: "10px", marginLeft: "10px" }} onClick={() => { handlePage("prev") }}>Prev</button>
            <span style={{ marginLeft: "10px" }}>{page + 1}</span>
            <button style={{ padding: "10px", marginLeft: "10px" }} onClick={() => { handlePage("next") }}>Next</button>
            {/* <button style={{padding:"5px"}} onClick={handlePageSize}>Load More Data</button> */}

        </div>
    )
}

export default SpaceComponent