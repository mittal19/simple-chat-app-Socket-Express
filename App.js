import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';
import io  from 'socket.io-client';

export default class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state= {
      mesg: '',
      messages:[]
    }
  }

  componentDidMount()
  {
    this.socket = io('http://192.168.43.13:3000');
    this.socket.on("chat message",msg =>{
      this.setState({messages:[...this.state.messages,msg]});
    })
  }

  submitchatmesg()
  {
    console.log(this.state.mesg);
    this.socket.emit("chat message",this.state.mesg);
    this.setState({mesg:""});
  }

  render()
  {
    return(
      <View>
        <TextInput 
          placeholder='Enter' 
          onSubmitEditing = {()=>this.submitchatmesg()}
          onChangeText={mesg => {this.setState({mesg})}} />
          {this.state.messages.map(messages=>
      <Text key = {messages}>{messages}</Text>)}
      </View>
    );
  }
}