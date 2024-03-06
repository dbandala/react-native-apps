import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrigin, selectDestination, setTravelTimeInformation } from '../slices/navSlice'
import { useEffect, useRef } from 'react'
import { GOOGLE_MAPS_API_KEY } from '@env'

import tw from 'tailwind-react-native-classnames'
import MapViewDirections from 'react-native-maps-directions'

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!origin || !destination) return;

        // zoom and fit to markers
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: {
                top: 50, right: 50, bottom: 50, left:50,
            },
        })
    },[origin, destination]);

    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async() => {
            const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&origins=${origin.description}&units=imperial&key=${GOOGLE_MAPS_API_KEY}`;
            fetch(URL).then((res) => res.json())
            .then((data) => {
                //console.log(data.rows[0].elements[0]);
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
            }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
            });
        }
        getTravelTime();
    },[origin, destination, GOOGLE_MAPS_API_KEY]);

  return (
    <MapView
        ref={mapRef}
        style={tw`flex-1`}
        mapType={Platform.OS == "android" ? "none" : "standard"}
        initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        }}
    >
        {origin && destination && (
            <MapViewDirections
                origin={origin.description}
                destination={destination.description}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth={3}
                strokeColor="black"
            />
        )}

        {origin?.location && (
            <Marker
                coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                }}
                title="Origin"
                description={origin.description}
                identifier="origin"
            />
        )}

        {destination?.location && (
            <Marker
                coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                }}
                title="Destination"
                description={destination.description}
                identifier="destination"
            />
        )}
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})