import React from "react";
import { StyleSheet, Text, SafeAreaView, Image, View } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";

import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import NavFavorites from "../components/NavFavorites";

const HomeScreen = () => {
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image 
                    source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"}}
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain",
                    }}
                />
            </View>

            <GooglePlacesAutocomplete
                placeholder="Where From?"
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
                enablePoweredByContainer={false}
                onPress={(data, details = null) => {
                    //console.log("data: ",data, "\n\ndetails:", details);
                    // set origin coordinates
                    dispatch(setOrigin({
                        location: details.geometry.location,
                        description: data.description,
                        long_name: details.address_components[0].long_name,
                        short_name: details.address_components[0].short_name,
                    }));
                    // set destination to null
                    dispatch(setDestination(null));
                }}
                fetchDetails={true}
                styles={{
                    container: {
                        flex: 0,
                    },
                    textInput: {
                        fontSize: 18,
                    },
                }}
                query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: "en",
                }}
            />

            <NavOptions />

            <NavFavorites />
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    text: {
        color: "blue",
    },

});