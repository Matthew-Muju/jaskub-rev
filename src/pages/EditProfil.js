import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, Header, Gap} from '../component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const EditProfil = ({navigation}) => {
  //   const [values, setValues] = useState({
  //     username: '',
  //     dialnumber: '',
  //     email: '',
  //   });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUpdate = () => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        username: user.username,
        dialnumber: user.dialnumber,
        email: user.email,
      })
      .then(() => {
        console.log('User Updated!');
        Alert.alert(
          'Profile Updated!',
          'Your profile has been updated successfully.',
        );
      });
  };

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(user => {
        setUser(user.data());
      });
    if (loading) {
      setLoading(false);
    }
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  return (
    <ScrollView>
      <View>
        <View>
          <Header title="EDIT PROFILE" onBack={() => navigation.goBack()} />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Nama Lengkap</Text>
          <SafeAreaView style={styles.safeView}>
            <AntDesign
              name="user"
              style={styles.Icons}
              size={28}
              color="#2196F3"
            />

            <TextInput
              value={user ? user.username : ''}
              onChangeText={txt => setUser({...user, username: txt})}
              placeholder="Nama Lengkap"
            />
          </SafeAreaView>
          <Gap height={16} />
          <Text style={styles.text}>Nomor Telepon</Text>
          <SafeAreaView style={styles.safeView}>
            <AntDesign
              name="phone"
              style={styles.Icons}
              size={28}
              color="#2196F3"
            />

            <TextInput
              value={user ? user.dialnumber : ''}
              onChangeText={txt => setUser({...user, dialnumber: txt})}
              placeholder="Nomor Telepon"
              keyboardType="numeric"
            />
          </SafeAreaView>
          <Gap height={16} />
          <Text style={styles.text}>Email</Text>
          <SafeAreaView style={styles.safeView}>
            <AntDesign
              name="mail"
              style={styles.Icons}
              size={28}
              color="#2196F3"
            />

            <TextInput
              value={user ? user.email : ''}
              onChangeText={txt => setUser({...user, dialnumber: txt})}
              placeholder="E-mail"
            />
          </SafeAreaView>
          <Gap height={26} />
          <Button title="Save" onPress={handleUpdate} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfil;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 200,
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
  Icons: {flex: 0.15, marginLeft: 10},
});
