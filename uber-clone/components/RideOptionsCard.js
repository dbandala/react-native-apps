import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

import tw from 'tailwind-react-native-classnames'

data = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    },
]

// if we have SURGE pricing, this goes up
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
        <View>
            <TouchableOpacity
                style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
                onPress={() => navigation.navigate("NavigateCard")}
            >
                <Icon name="chevron-left" type="fontawesome" />
            </TouchableOpacity>
            <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
        </View>

        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item:{ id, title, multiplier, image }, item }) => (
                <TouchableOpacity
                    style={tw`flex-row items-center justify-between px-10 ${ id===selected?.id && "bg-gray-200" }`}
                    onPress={() => setSelected(item)}
                >
                    <Image 
                        style={{
                            width: 100,
                            height: 100,
                            resizeMode: "contain",
                        }}
                        source={{ uri: image }}
                    />
                    <View style={tw`-ml-6`}>
                        <Text style={tw`text-xl font-semibold`}>{title}</Text>
                        <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
                    </View>
                    <Text style={tw`text-xl`} >
                        {new Intl.NumberFormat('en-us', {
                            style: "currency",
                            currency: "USD",
                        }).format(
                            (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100
                        )}
                    </Text>
                    <Icon 
                        name="arrowright"
                        type="antdesign"
                        color="black"
                    />
                </TouchableOpacity>
            )}
        />

        <View style={tw`mt-auto border-t border-gray-200`}>
            <TouchableOpacity
                style={tw`bg-black py-3 m-3 rounded-full ${!selected && "bg-gray-300"}`}
                disabled={!selected}
            >
                <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
            </TouchableOpacity>
        </View>
      
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})