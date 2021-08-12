import React, { useState } from 'react'
import ReactMapGl, {Marker, Popup} from 'react-map-gl'
import { getCenter } from 'geolib'

const Map = ({searchResults}) => {

    const [selectedLocation, setSelectedLocation] = useState({})

     //transform search results object into {lat: ,long:}

     const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat
    }))

    const center = getCenter(coordinates)

    const [viewport,setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom:11
    }) 


    return (
        <ReactMapGl
            mapStyle='mapbox://styles/releaf/cks5wzywa1pwt17n3aydkgm36'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport) }
            
        >
            {searchResults.map((result,index) => (
                <div key="index">
                    <Marker longitude={result.long} latitude={result.lat} offsetLeft={-20} offsetTop={-10}>
                        <p onClick={() => setSelectedLocation(result)} className="cursor-pointer text-2xl animate-bounce">📌</p>
                    </Marker>

                    {selectedLocation.long === result.long ? (
                        <Popup
                            closeOnClick={true}
                            onClose={() => setSelectedLocation({})}
                            latitude={result.lat}
                            longitude={result.long}
                            >
                            {result.title}
                        </Popup>
                    ): false }
                </div>
            ))}
        </ReactMapGl>
    )
}

export default Map
