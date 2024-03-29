import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GOOGLE_MAPS_API_KEY } from "@env"
import { useDispatch } from 'react-redux'
import { setDestination } from "../slices/navSlice"
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import tw from 'tailwind-react-native-classnames'
import NavFavorites from './NavFavorites'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
        {/* <Text style={tw`text-center text-xl`}>NavigateCard</Text> */}
        <View style={tw`border-t border-gray-200 flex-shrink`}>
            <View>
                <GooglePlacesAutocomplete
                    placeholder='Where to?'
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                    styles={toInputBoxStyles}
                    enablePoweredByContainer={false}
                    minLength={2}
                    returnKeyType={'search'}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        //console.log(data, details);
                        dispatch(setDestination({
                            location: details.geometry.location,
                            description: data.description,
                        }));
                        navigation.navigate("RideOptionsCard");
                    }}
                    query={{
                        key: GOOGLE_MAPS_API_KEY,
                        language: 'en',
                    }}
                />
            </View>

            <NavFavorites />
        </View>

        <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
            <TouchableOpacity  
                style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
                onPress={() => navigation.navigate("RideOptionsCard")}
            >
                <Icon
                    name="car"
                    type="font-awesome"
                    color="white"
                    size={16}
                />
                <Text style={tw`text-white text-center text-xl`}>Rides</Text>
            </TouchableOpacity>
            <TouchableOpacity  
                style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
            >
                <Icon
                    name="fast-food-outline"
                    type="ionicon"
                    color="black"
                    size={16}
                />
                <Text style={tw`text-center text-xl`}>Eats</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
})