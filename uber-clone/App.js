import { StatusBar } from 'expo-status-bar';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Provider } from 'react-redux';
import { Platform } from 'react-native';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import 'react-native-gesture-handler';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';

// 1) Setup redux
// 2) Setup navigation

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flex:1}}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        >
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ 
              headerShown: false,
              title: 'Welcome',
            }}
          />
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{ 
              headerShown: false,
              title: 'Map',
            }}
          />
          <Stack.Screen
            name="EatsScreen"
            component={MapScreen}
            options={{ 
              headerShown: false,
              title: 'Map',
            }}
          />
        </Stack.Navigator>
      </KeyboardAvoidingView>
      </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
