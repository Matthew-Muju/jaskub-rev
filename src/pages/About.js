import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Gap, Header} from '../component';

const About = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Header
          title="About"
          onBack={() => navigation.goBack()}
          options={() => navigation.navigate('Setting')}
        />
        <Gap height={10} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 100,
          }}>
          <Image
            source={require('../assets/icon/about.jpg')}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100 / 2,
              borderWidth: 3,
              borderColor: '#FFFFFF',
            }}
          />
          <Gap height={20} />
          <Text style={styles.text}>Halo</Text>
          <Text style={styles.text}>Nama Saya Matthew Muju</Text>
          <Text style={styles.text}>
            Saya adalah mahasiswa dari Universitas Klabat
          </Text>
          <Text style={styles.text}>
            Fakultas Ilmu Komputer - Jurusan Informatika
          </Text>
          <Gap height={20} />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 40,
              marginHorizontal: 30,
            }}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  'https://web.facebook.com/people/Matthew-Muju/100009747555403/',
                );
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="facebook" size={25} color="#2196F3" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.instagram.com/matthew_efm/');
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="instagram" size={25} color="#2196F3" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://github.com/Matthew-Muju/');
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="github" size={25} color="#2196F3" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                Linking.openURL('https://twitter.com/Mathhh_ww');
              }}>
              <Icon name="twitter" size={25} color="#2196F3" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.linkedin.com/');
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="linkedin" size={25} color="#2196F3" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 6,
    color: 'black',
  },
});
