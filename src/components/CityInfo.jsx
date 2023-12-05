import React from 'react';

function CityInfo ({cityName, latitude, longitude}) {
    return (
        <div>
            <h2>City Information</h2>
            <p>
                City: {cityName}
            </p>
            <p>
                Latitude: {latitude}
            </p>
            <p>
                Longitude: {longitude}
            </p>
        </div>
    );
}

export default CityInfo;