import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {LogoJKB} from '../assets';

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'Home' : 'SignIn');
      });
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <LogoJKB />
        <Text style={styles.text}>Jasa Kuli Bangunan</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
});
