import React from 'react';
import { ScrollView, StyleSheet, AsyncStorage, ListView, FlatList, Text, View, Alert} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import RNPickerSelect from 'react-native-picker-select';
import * as dictionary from '../src/LanguageDict'
import Ionicons from '@expo/vector-icons/Ionicons';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Favorite',
  };

  constructor() {
    super();
    this.state = {
      key_choose: '',
      list: [],
      key: [],
      options: [],
    };
    this.get_key();
  }



  render() {
    const placeholder = {
      label: 'Select a language',
      value: null,
      color: '#9EA0A4',
    };

    const deletePrompt = (lang, word) =>{
      Alert.alert(
        'Delete',
        'Are you sure you want to delete selected word?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => this.delete_key(lang, word)},
        ],
        {cancelable: false},
      );
    }

    return (
      <ScrollView style={styles.container}>
        <RNPickerSelect
          onOpen={() => { this.refresh() }}
          placeholder={placeholder}
          items={this.state.options}
          onValueChange={(value) => {
            this.display(value);
          }}
          onClose={() => { this.format_list() }}
          value={this.state.key_choose}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColorAndroid: 'cyan', fontSize: 35, margin:10}}
          style = {styles.picker_container}
        />

        <FlatList
        data={this.state.list}
        renderItem={(data) => <View style={styles.box}><View  style={styles.rowContainer}><Text style = {styles.textbox}>{data.item}</Text><Ionicons name="ios-trash" size={35} style={styles.trash_icon} onPress={() => deletePrompt(this.state.key_choose ,data.item)}/></View></View> }
        keyExtractor={(data, index) => index.toString()}
        style = {styles.list_Container}
      />
      </ScrollView>
      
    );

  }

  delete_key(lang, word){
    console.log("DELETEING " + lang + " " +word);
    this.retrieveItem(lang).then((i) => {
      if(!i) return;
      var res = i.replace(word + ',', '');

      //check if i is empty 
      if(!res){
        AsyncStorage.removeItem(lang);
        this.state.list = [];
      }
      else{
        this.storeItem(lang, res);
        } 
      alert('Word Removed');

      //reset
      this.get_key();
      this.format_options();
      this.format_list();
    }).catch((error) => {
      //this callback is executed when your Promise is rejected
      console.log('Promise is rejected with error: ' + error);
    });

  }

  get_key() {
    AsyncStorage.getAllKeys().then((k) => {
      this.setState({ key: k });
      console.log("KEYS ARE " + k);
      this.format_options();
    }).catch((error) => {
      //this callback is executed when your Promise is rejected
      console.log('Promise is rejected with error: ' + error);
    })
  }

  format_options() {
    var k = this.state.key;
    console.log(this.state.key);
    var new_list = [];
    var length = k.length;
    for (let i = 0; i < length; i++) {
      var item = {
        label: dictionary.dict[this.state.key[i]],
        value: this.state.key[i],
      }
      new_list.push(item);
    }
    new_list = new_list.sort((a, b) => a.label.localeCompare(b.label));
    console.log("LISTS: ");
    console.log(new_list);
    if (!new_list) return;
    this.setState({ options: new_list });
  }

  display(value) {
    //do something
    this.setState({
      key_choose: value,
    });
  }

  format_list() {
    this.retrieveItem(this.state.key_choose).then((i) => {
      if (!i) return;
      var arr = i.split(',');
      var filtered = arr.filter(function (el) { return el != '' })
      
      this.setState({
        list: filtered
      });
    }).catch((error) => {
      //this callback is executed when your Promise is rejected
      console.log('Promise is rejected with error: ' + error);
    });
  }

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

  refresh() {
    this.get_key();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  textbox:{
    color: 'rgba(96,100,109, 0.8)',
    fontSize: 35,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin:10, 
  },
  list_Container: {
    paddingTop: 10,
    paddingBottom: 20
  },
  Text_container: {
    margin:10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight:20,
    paddingBottom: 20
  },
  picker_container:{
    height: 35,
    fontSize: 35,
    color: 'red',
    padding: 25
  },
  trash_icon:{
    paddingTop:17,
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    marginRight: 30,
  },
  rowContainer:{flex: 1, flexDirection: 'row'},
  box: {
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
  }
});
