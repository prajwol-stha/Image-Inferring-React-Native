/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';

import {Text, View, Button} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  },
};



const App = () => {
  const openGallery = async () => {
    const images = await launchImageLibrary(options);
    console.log(images.assets[0]);

    const formdata = new FormData();
    formdata.append('file', {
      uri: images.assets[0].uri,
      type: images.assets[0].type,
      name: images.assets[0].fileName,
    });

    let res = await fetch('https://yoloapi.khanalsaurav.com.np/inferyolo/', {
      method: 'post',
      body: formdata,
      headers: {
        'Content-Type': 'multipart/form-data; ',
      },
    });
    let responseJson = await res.json();
    console.log(responseJson, 'responseJson');

    // const prediction_response = await infer(FormData);
    // console.log('Prediction received')

  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Button title="upload" onPress={openGallery}></Button>
    </View>
  );
};

export default App;

// npx react-native run-android
