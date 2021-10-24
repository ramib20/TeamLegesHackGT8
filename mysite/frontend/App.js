import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Image, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import logo from './assets/splash.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { Picker } from '@react-native-picker/picker';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Location/Photo"
        onPress={() => navigation.navigate('Send Location/Photo')}
      />
    </View>
  );
}

function FormScreen({ navigation }) {

    const [deliveryType, setDeliveryType] = React.useState(null);
    const [selectedImage, setSelectedImage] = React.useState(null);
        let openImagePickerAsync = async () => {
            let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
              return;
        }
        setSelectedImage({ localUri: pickerResult.uri });
        };
        let openShareDialogAsync = async () => {
            if (!(await Sharing.isAvailableAsync())) {
                alert(`Uh oh, sharing isn't available on your platform`);
                return;
            }
            await Sharing.shareAsync(selectedImage.localUri);
        };
        if (selectedImage !== null) {
            return (
              <View style={styles.container}>
                <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
                <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
                    <Text style={styles.buttonText}>Share this photo</Text>
                </TouchableOpacity>
              </View>
            );
          }
      return (
      <View>
          <Text style={styles.instructions} > Delivery Details: </Text>
          <View>
            <TextInput style={styles.textFields}
              placeholder="Recipient's Phone Number" />
            <TextInput style={styles.textFields}
              placeholder="Additional Delivery Information"
            />
            <Text > </Text>
            <Text style={styles.instructions} > Delivery Type: </Text>
            <Picker
              selectedValue={deliveryType}
              onValueChange={currentDeliveryType => setDeliveryType(currentDeliveryType)}>
              <Picker.Item label="Drop-off" value = "Drop-off"/>
              <Picker.Item label="Handed Directly to Recipient" value="Handed Directly to Recipient"/>
              <Picker.Item label="Temp 3rd value" value = "Temp 3rd value"/>
            </Picker>
          </View>

          <Text style={styles.instructions} >
                      Share a photo.
                    </Text>
                    <StatusBar style="auto" />

                    <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                       <Text style={styles.buttonText}>Pick a photo</Text>
                    </TouchableOpacity>
                <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
                <Button title="Go to Form" onPress={() => navigation.navigate('Form')} />

        </View>
      );
}



function PhotoScreen({ navigation }) {

    const [selectedImage, setSelectedImage] = React.useState(null);
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
          return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
    };
    let openShareDialogAsync = async () => {
        if (!(await Sharing.isAvailableAsync())) {
            alert(`Uh oh, sharing isn't available on your platform`);
            return;
        }
        await Sharing.shareAsync(selectedImage.localUri);
    };
    if (selectedImage !== null) {
        return (
          <View style={styles.container}>
            <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
            <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
                <Text style={styles.buttonText}>Share this photo</Text>
            </TouchableOpacity>
          </View>
        );
      }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.instructions} >
            Share a photo.
          </Text>
          <StatusBar style="auto" />

          <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
             <Text style={styles.buttonText}>Pick a photo</Text>
          </TouchableOpacity>
          <Text> </Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go to Form" onPress={() => navigation.navigate('Form')} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Send Location/Photo">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Send Location/Photo" component={PhotoScreen} />
        <Stack.Screen name="Form" component={FormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
      width: 305,
      height: 89,
      marginTop: 50,
    },
    form: {
    textAlign : 'center'
    },
    instructions: {
      color: '#888',
      fontSize: 18,
      marginHorizontal: 15,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    textFields: {
        color: '#9898a3',
        fontSize: 15,
        marginHorizontal: 15,
        textAlign: 'center',
    },
    button: {
        backgroundColor: "blue",
        padding: 15,
        borderRadius: 5,
        textAlign: 'center',
      },
      buttonText: {
        fontSize: 20,
        color: '#fff',
      },
     thumbnail: {
         width: 300,
         height: 300,
         resizeMode: "contain"
       }
});
