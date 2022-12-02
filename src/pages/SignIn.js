import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import {Button, Gap, Header} from '../component';
import {LogoSmall} from '../assets';
import auth, {firebase} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';

GoogleSignin.configure({
  webClientId:
    '843292974595-o4s2gbgubpbi70k6l25iit758qd4dl35.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export default class SignIn extends React.Component {
  state = {email: '', password: '', errorMessage: null};

  handleLogin = () => {
    const {email, password} = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({errorMessage: error.message}));
    this.setState({email: ''});
    this.setState({password: ''});
  };

  render() {
    return (
      <ScrollView>
        <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 45}}>
          <View style={styles.headerWrapper}>
            <Header title="MASUK" backgroundColor="#F8F8F8" color="#000000" />
          </View>
          {this.state.errorMessage && (
            <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
          )}
          <View style={styles.contentWrapper}>
            <View style={styles.logoWrapper}>
              <LogoSmall />
            </View>
            <Text style={styles.text}>Email</Text>
            <SafeAreaView style={styles.safeView}>
              <IonIcons
                name="mail"
                style={styles.Icons}
                size={28}
                color="#2196F3"
              />

              <TextInput
                value={this.state.email}
                onChangeText={email => this.setState({email})}
                placeholder="E-mail"
              />
            </SafeAreaView>
            <Gap height={16} />
            <Text style={styles.text}>Password</Text>
            <SafeAreaView style={styles.safeView}>
              <FontAwesome
                name="lock"
                style={styles.Icons}
                size={28}
                color="#2196F3"
              />

              <TextInput
                value={this.state.password}
                onChangeText={password => this.setState({password})}
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
              />
            </SafeAreaView>
            <Gap height={36} />
            <Button title="Masuk" onPress={this.handleLogin} />
            <Gap height={20} />
            <Icon.Button
              style={styles.iconButton}
              name="google"
              size={28}
              backgroundColor="#8D92A3"
              onPress={() =>
                onGoogleButtonPress().then(() =>
                  alert('Signed in with Google!'),
                )
              }>
              Login with Google
            </Icon.Button>
            <Gap height={24} />
            <View style={styles.logoWrapper}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('SignUp', {role: ''})
                }>
                <Text style={styles.textDaftar}>Buat Akun Baru</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#020202',
    borderRadius: 8,
    paddingLeft: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 6,
    color: 'black',
  },
  contentWrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerWrapper: {
    textAlign: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
  },
  textDaftar: {
    color: '#0530F5',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'underline',
  },
  iconButton: {
    height: 45,
    borderRadius: 8,
    alignContent: 'center',
    justifyContent: 'center',
  },
  safeView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 10,
    backgroundColor: '#E8F6FF',
  },
  Icons: {flex: 0.1, marginLeft: 10},
});
