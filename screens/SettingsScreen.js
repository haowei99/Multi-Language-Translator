import { ExpoConfigView } from '@expo/samples';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Picker,
  TouchableHighlight,
  Chevron,
  Button,
  TextInput,
  Clipboard,
  AsyncStorage,
  Alert
} from 'react-native';
import { WebBrowser } from 'expo';

import * as dictionary from '../src/LanguageDict'

import { MonoText } from '../components/StyledText';

import RNPickerSelect from 'react-native-picker-select';

import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import HomeScreen from './HomeScreen';


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Setting',
  };

  constructor(){
    super();
  }

  render() {
    const clearMemoryPrompt = () =>{
      Alert.alert(
        'Delete Memory',
        'Are you sure you want to delete favorite list?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => this.clearMemory()},
        ],
        {cancelable: false},
      );
    }

    const resetPrompt = () =>{
      Alert.alert(
        'Reset',
        'Are you sure you want to reset translator screen?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => this.reset()},
        ],
        {cancelable: false},
      );
    }
    return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.codeHighlightContainer, styles.helpLink]} onPress={clearMemoryPrompt}>
              <MonoText style={[styles.codeHighlightText, styles.bigfont]}>Clear Memory</MonoText>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.codeHighlightContainer, styles.helpLink]} onPress={resetPrompt}>
              <MonoText style={[styles.codeHighlightText, styles.bigfont]}>Reset Fields</MonoText>
      </TouchableOpacity>
    </View>
    );
  }
  
  clearMemory(){
    AsyncStorage.clear();
  }
  reset(){
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  titleContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
    display: 'flex'
  },
  title: {
    fontSize: 30,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
    marginTop: 30,
  },
  title_description: {
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 17,
    lineHeight: 19,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  box: {
    fontSize: 25,
    color: '#B0B0B0',
    flex: 1,
    justifyContent: 'center',
    padding: 5,
    marginHorizontal: 15,
    height: 'auto',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d6d7da',
    marginVertical: 5,
    alignSelf: 'stretch',
  },
  bigfont: {
    fontSize: 25,
  },
  translate_subheading: {
    alignContent: 'flex-start',
    fontSize: 20,
    marginVertical: 5,
    marginHorizontal: 15,
    color: 'rgba(96,100,109, 1)',
  },

});
