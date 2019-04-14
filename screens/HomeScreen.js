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
} from 'react-native';
import { WebBrowser } from 'expo';

import * as dictionary from '../src/LanguageDict'

import { MonoText } from '../components/StyledText';

import RNPickerSelect from 'react-native-picker-select';

import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';

import { Speech } from 'expo';

import { Ionicons } from '@expo/vector-icons';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      languageCode: 'fr',
      lang1: '', lang2: '', lang3: '', lang4: '',
      root: { word: '', language: '' },
      text_box1: '', text_box2: '', text_box3: '', text_box4: '',
      favorite: { text_box1: false, text_box2: false, text_box3: false, text_box4: false }
    };
  }
  readFromClipboard = async () => {
    //To get the text from clipboard
    const clipboardContent = await Clipboard.getString();
    this.setState({ clipboardContent });
  };
  writeToClipboard = async (str) => {
    if (!str) return;
    //To copy the text to clipboard
    await Clipboard.setString(str);
    alert('Copied to Clipboard!');
  };

  reset = () =>{
    this.setState(
      {
        languageCode: 'fr',
        lang1: '', lang2: '', lang3: '', lang4: '',
        root: { word: '', language: '' },
        text_box1: '', text_box2: '', text_box3: '', text_box4: '',
        favorite: { text_box1: false, text_box2: false, text_box3: false, text_box4: false }
      }
    )
    alert('Reset Complete');
  };

  render() {
    TranslatorConfiguration.setConfig(ProviderTypes.Google, 'INSERT GCP API-KEY HERE', this.state.languageCode);
    var options = dictionary.dict_list;

    const heart_fill1 = <Ionicons name="ios-heart" size={32} color="#ff2d55" onPress={() => this.heartClicked(1)}/>;
    const heart_end1 = <Ionicons name="ios-heart-empty" size={32} color="#ff2d55" onPress={() => this.heartClicked(1)}/>;

    const heart_fill2 = <Ionicons name="ios-heart" size={32} color="#ff2d55" onPress={() => this.heartClicked(2)}/>;
    const heart_end2 = <Ionicons name="ios-heart-empty" size={32} color="#ff2d55" onPress={() => this.heartClicked(2)}/>;

    const heart_fill3 = <Ionicons name="ios-heart" size={32} color="#ff2d55" onPress={() => this.heartClicked(3)}/>;
    const heart_end3 = <Ionicons name="ios-heart-empty" size={32} color="#ff2d55" onPress={() => this.heartClicked(3)}/>;

    const heart_fill4 = <Ionicons name="ios-heart" size={32} color="#ff2d55" onPress={() => this.heartClicked(4)}/>;
    const heart_end4 = <Ionicons name="ios-heart-empty" size={32} color="#ff2d55" onPress={() => this.heartClicked(4)}/>;

    const placeholder = {
      label: 'Select a language',
      value: null,
      color: '#9EA0A4',
    };
    const placeholder_input = {
      label: 'Select a language (optional)',
      value: null,
      color: '#9EA0A4',
    };

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Multi Language Translator</Text>
            <Text style={styles.title_description}>
              Multi Translator allows you to translate a word or sentence to several languages you desire
            </Text>
          </View>

          <Text style={styles.translate_subheading}>Translate from:</Text>

          <View style={styles.box}>
            <RNPickerSelect
              placeholder={placeholder_input}
              items={options}
              onValueChange={(value) => {
                this.setState({
                  root: { word: this.state.root.word, language: value }
                });
              }}
              value={this.state.root.langugage}
              useNativeAndroidPickerStyle={false}
              textInputProps={{ underlineColorAndroid: 'cyan' }}
              style={pickerSelectStyles}
            />
            <TouchableOpacity style={[styles.codeHighlightContainer, styles.helpLink]}>
              <TextInput
                multiline={true}
                style={[styles.codeHighlightText, styles.bigfont]}
                placeholder="Enter Word Here"
                onChangeText={(text) => this.setState({ root: { word: text, language: this.state.root.language } })}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <Text style={styles.translate_subheading}>Translate to:</Text>



          <View style={styles.box}>
          <View style={styles.rowHomePageContainer}>
            <View style={styles.rowPicker}>
            <RNPickerSelect
              placeholder={placeholder}
              items={options}
              onValueChange={(value) => {
                this.setState({
                  lang1: value,
                });
              }}
              value={this.state.lang1}
              useNativeAndroidPickerStyle={false}
              textInputProps={{ underlineColorAndroid: 'cyan' }}
              style={pickerSelectStyles}
            />
            </View>
            <View style={styles.rowHeart}>
              {this.state.favorite.text_box1 ? heart_fill1 : heart_end1}
            </View>
            </View>
            <TouchableOpacity style={[styles.codeHighlightContainer, styles.helpLink]} onLongPress={() => this.writeToClipboard(this.state.text_box1)}>
              <MonoText style={[styles.codeHighlightText, styles.bigfont]}>{this.state.text_box1}</MonoText>
            </TouchableOpacity>
          </View>

          <View style={styles.box}>
          <View style={styles.rowHomePageContainer}>
            <View style={styles.rowPicker}>
            <RNPickerSelect
              placeholder={placeholder}
              items={options}
              onValueChange={(value) => {
                this.setState({
                  lang2: value,
                });
              }}
              value={this.state.lang2}
              useNativeAndroidPickerStyle={false}
              textInputProps={{ underlineColorAndroid: 'cyan' }}
              style={pickerSelectStyles}
            />
            </View>
            <View style={styles.rowHeart}>
              {this.state.favorite.text_box2 ? heart_fill2 : heart_end2}
            </View>
            </View>
            <TouchableOpacity style={[styles.codeHighlightContainer, styles.helpLink]} onPress={() => this.retrieve(this.state.lang2)} onLongPress={() => this.writeToClipboard(this.state.text_box2)}>
              <MonoText style={[styles.codeHighlightText, styles.bigfont]}>{this.state.text_box2}</MonoText>
            </TouchableOpacity>
          
          </View>

          <View style={styles.box}>
            <View style={styles.rowHomePageContainer}>
            <View style={styles.rowPicker}><RNPickerSelect
                placeholder={placeholder}
                items={options}
                onValueChange={(value) => {
                  this.setState({
                    lang3: value,
                  });
                }}
                value={this.state.lang3}
                useNativeAndroidPickerStyle={false}
                textInputProps={{ underlineColorAndroid: 'cyan' }}
                style={pickerSelectStyles}
              /></View>
            <View style={styles.rowHeart}>
              {this.state.favorite.text_box3 ? heart_fill3 : heart_end3}
            </View>
            </View>

            <TouchableOpacity style={[styles.codeHighlightContainer, styles.helpLink]} onLongPress={() => this.writeToClipboard(this.state.text_box3)}>
              <MonoText style={[styles.codeHighlightText, styles.bigfont]}>{this.state.text_box3}</MonoText>
            </TouchableOpacity>
          </View>

          <View style={styles.box}>
          <View style={styles.rowHomePageContainer}>
            <View style={styles.rowPicker}>
            <RNPickerSelect
              placeholder={placeholder}
              items={options}
              onValueChange={(value) => {
                this.setState({
                  lang4: value,
                });
              }}
              value={this.state.lang4}
              useNativeAndroidPickerStyle={false}
              textInputProps={{ underlineColorAndroid: 'cyan' }}
              style={pickerSelectStyles}
            />
            </View>
            <View style={styles.rowHeart}>
              {this.state.favorite.text_box4 ? heart_fill4 : heart_end4}
            </View>
            </View>
            <TouchableOpacity style={[styles.codeHighlightContainer, styles.helpLink]} onLongPress={() => this.writeToClipboard(this.state.text_box4)}>
              <MonoText style={[styles.codeHighlightText, styles.bigfont]}>{this.state.text_box4}</MonoText>
            </TouchableOpacity>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity style={{ marginBottom: 100 }}>
              <Text style={styles.helpLinkText}>A HWH, JL production</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Button
            onPress={() => { this.translate(this.state.lang1, this.state.lang2, this.state.lang3, this.state.lang4) }}
            title="Translate"
            color="#841584"
          />
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {

    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };

  storeWord(key, item) {
    this.retrieveItem(key).then((i) => {
      if (!i) {
        this.storeItem(key, item + ",");
      }
      else {
        if (i.includes(item)){
          alert('Word is already Saved'); 
          return;
        }this.storeItem(key, i + item + ",");
      }
      alert('Word Saved');
    }).catch((error) => {
      //this callback is executed when your Promise is rejected
      console.log('Promise is rejected with error: ' + error);
    });
  }
  unstoreWord(key, item){
    this.retrieveItem(key).then((i) => {
      if(!i) return;
      var res = i.replace(item + ',', '');
      this.storeItem(key, res);
      alert('Word Removed');
    }).catch((error) => {
      //this callback is executed when your Promise is rejected
      console.log('Promise is rejected with error: ' + error);
    });
  }
  retrieve(key) {
    this.retrieveItem(key).then((i) => {
      alert("dict contains: " + i)
    }).catch((error) => {
      //this callback is executed when your Promise is rejected
      console.log('Promise is rejected with error: ' + error);
    });
  }
  async storeItem(key, item) {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item)); 
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  };
  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      alert('error');
      console.log(error.message);
    }
    return
  }
  changeLanguage(languageCode) {
    this.setState({ languageCode: languageCode });
  }
  translate(lang1, lang2, lang3, lang4) {
    this.store("text_box1", lang1);
    this.store("text_box2", lang2);
    this.store("text_box3", lang3);
    this.store("text_box4", lang4);
    
    this.state.favorite.text_box1 = false;
    this.state.favorite.text_box2 = false;
    this.state.favorite.text_box3 = false;
    this.state.favorite.text_box4 = false;

  };
  store(text, lang) {

    const translator = TranslatorFactory.createTranslator();
    if (text == 'text_box1' && lang != '') {
      if (lang == this.state.root.language) {
        this.setState({ text_box1: this.state.root.word })
        return;
      }
      translator.translate(this.state.root.word, lang, this.state.root.language).then((translated) => {
        this.setState({ text_box1: translated }, () => {
          //this.onTranslationEnd();
        });
      })
    }
    else if (text == 'text_box2' && lang != '') {
      if (lang == this.state.root.language) {
        this.setState({ text_box2: this.state.root.word })
        return;
      }
      translator.translate(this.state.root.word, lang, this.state.root.language).then((translated) => {
        this.setState({ text_box2: translated }, () => {
          //this.onTranslationEnd();
        });
      })
    }
    else if (text == 'text_box3' && lang != '') {
      if (lang == this.state.root.language) {
        this.setState({ text_box3: this.state.root.word })
        return;
      }
      translator.translate(this.state.root.word, lang, this.state.root.language).then((translated) => {
        this.setState({ text_box3: translated }, () => {
          //this.onTranslationEnd();
        });
      })
    }
    else if (text == 'text_box4' && lang != '') {
      if (lang == this.state.root.language) {
        this.setState({ text_box4: this.state.root.word })
        return;
      }
      translator.translate(this.state.root.word, lang, this.state.root.language).then((translated) => {
        this.setState({ text_box4: translated }, () => {
          //this.onTranslationEnd();
        });
      })
    }
  }
  heartClicked(num){
    if (num == 1){
      if (this.state.lang1 == '' || this.state.text_box1 == '') return;
      if (!this.state.favorite.text_box1){
        // save items
        this.storeWord(this.state.lang1, this.state.text_box1);
      }
      else{
        this.unstoreWord(this.state.lang1, this.state.text_box1);
      }
      this.setState({favorite: { text_box1: !this.state.favorite.text_box1, text_box2: this.state.favorite.text_box2, text_box3: this.state.favorite.text_box3, text_box4: this.state.favorite.text_box4 }});
     
    }
    else if (num == 2){
      if (this.state.lang2 == '' || this.state.text_box2 == '') return;
      if (!this.state.favorite.text_box2){
        // save items
        this.storeWord(this.state.lang2, this.state.text_box2);
      }
      else{
        this.unstoreWord(this.state.lang2, this.state.text_box2);
      }
      this.setState({favorite: { text_box1: this.state.favorite.text_box1, text_box2: !this.state.favorite.text_box2, text_box3: this.state.favorite.text_box3, text_box4: this.state.favorite.text_box4 }});
    }
    else if (num == 3){
      if (this.state.lang3 == '' || this.state.text_box3 == '') return;
      if (!this.state.favorite.text_box3){
        // save items
        this.storeWord(this.state.lang3, this.state.text_box3);
      }
      else{
        this.unstoreWord(this.state.lang3, this.state.text_box3);
      }
      this.setState({favorite: { text_box1: this.state.favorite.text_box1, text_box2: this.state.favorite.text_box2, text_box3: !this.state.favorite.text_box3, text_box4: this.state.favorite.text_box4 }});
    }
    else{
      if (this.state.lang4 == '' || this.state.text_box4 == '') return;
      if (!this.state.favorite.text_box4){
        // save items
        this.storeWord(this.state.lang4, this.state.text_box4);
      }
      else{
        this.unstoreWord(this.state.lang4, this.state.text_box4);
      }
      this.setState({favorite: { text_box1: this.state.favorite.text_box1, text_box2: this.state.favorite.text_box2, text_box3: this.state.favorite.text_box3, text_box4: !this.state.favorite.text_box4 }});
    }
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
  rowHomePageContainer:{flex: 1, flexDirection: 'row'},
  rowPicker: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rowHeart:{
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end', 
  },

});


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    textAlign: 'left',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 5,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

