import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import SLI from 'react-native-vector-icons/SimpleLineIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Profile = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleUpdate = () => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        status: user.status,
      })
      .then(() => {
        console.log('User Updated!');
        Alert.alert(
          'Status Updated!',
          'Your status has been updated successfully.',
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

  useEffect(() => {
    if (user)
      firestore()
        .collection('users')
        .where('role', '==', user?.role === 'Pengguna' ? 'Pengguna' : 'Kuli')
        .onSnapshot(users => {
          if (!users.empty) {
            const USERS = [];

            users.forEach(user => {
              USERS.push(user.data());
            });

            setUsers(USERS);
          }
        });
  }, [user]);

  // const getUser = async () => {
  //   await firestore()
  //     .collection('users')
  //     .doc(auth().currentUser.uid)
  //     .get()
  //     .then(documentSnapshot => {
  //       if (documentSnapshot.exists) {
  //         console.log('User Data', documentSnapshot.data());
  //         setUserData(documentSnapshot.data());
  //       }
  //     });
  //   if (loading) {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  //   navigation.addListener('focus', () => setLoading(!loading));
  // }, [navigation, loading]);

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} backgroundColor="#212121" />
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1507281736509-c6289f1ea0f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        }}
        style={{flex: 0.5}}
        resizeMode={'cover'}>
        <View style={{flex: 0.5}}>
          <View>
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                paddingTop: 10,
                paddingRight: 5,
              }}
              onPress={() => navigation.navigate('Setting')}>
              <Icons name="ellipsis-vertical-sharp" size={30} color="#212121" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              borderWidth: 3,
              borderColor: '#FFFFFF',
              position: 'absolute',
              zIndex: 2,
            }}
          />
        </View>
        <View style={{marginTop: 60}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
              color: '#212121',
            }}>
            {user?.username}
          </Text>
          <Text style={{textAlign: 'center'}}>
            Jaskub adalah aplikasi untuk mencari jasa kuli bangunan
          </Text>
          <View style={{marginLeft: 80, marginTop: 20}}>
            <View style={styles.container}>
              <View style={styles.detailsWrapper}>
                <View style={styles.details}>
                  <Icon name="mobile-alt" size={25} color="#212121" />
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.text}>{user?.dialnumber}</Text>
                </View>
              </View>
              <View style={styles.detailsWrapper}>
                <View style={styles.details}>
                  <MCI name="human-male-female" size={25} color="#212121" />
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.text}>{user?.jeniskelamin}</Text>
                </View>
              </View>
              <View style={styles.detailsWrapper}>
                <View style={styles.details}>
                  <Icon name="envelope" size={25} color="#212121" />
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.text}>{user?.email}</Text>
                </View>
              </View>
              <View style={styles.detailsWrapper}>
                <View style={styles.details}>
                  <SLI name="people" size={25} color="#212121" />
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.text}>{user?.role}</Text>
                </View>
              </View>
              <View style={styles.detailsWrapper}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      user?.status === 'active'
                        ? setUser({...user, status: 'inactive'})
                        : setUser({...user, status: 'active'});
                    }}>
                    <Text style={{fontFamily: 'Poppins-Light', fontSize: 13}}>
                      Status
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.text}>{user?.status}</Text>
                </View>
                <View>
                  <TouchableOpacity onPress={handleUpdate}>
                    <Text style={{fontFamily: 'Poppins-Light', fontSize: 13}}>
                      Update Status
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* <FlatList
              data={users}
              renderItem={({item}) => (
                <View style={styles.container}>
                  <View style={styles.detailsWrapper}>
                    <View style={styles.details}>
                      <Icon name="mobile-alt" size={25} color="#212121" />
                    </View>
                    <View style={styles.textWrapper}>
                      <Text style={styles.text}>{item.dialnumber}</Text>
                    </View>
                  </View>
                  <View style={styles.detailsWrapper}>
                    <View style={styles.details}>
                      <Icon name="map-marker-alt" size={25} color="#212121" />
                    </View>
                    <View style={styles.textWrapper}>
                      <Text style={styles.text}>{item.jeniskelamin}</Text>
                    </View>
                  </View>
                  <View style={styles.detailsWrapper}>
                    <View style={styles.details}>
                      <Icon name="envelope" size={25} color="#212121" />
                    </View>
                    <View style={styles.textWrapper}>
                      <Text style={styles.text}>{item.email}</Text>
                    </View>
                  </View>
                  <View style={styles.detailsWrapper}>
                    <View style={styles.details}>
                      <Icon name="star" size={25} color="#212121" />
                    </View>
                    <View style={styles.textWrapper}>
                      <Text style={styles.text}>{item.birthdate}</Text>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            /> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 40,
              marginHorizontal: 30,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="facebook" size={25} color="#bdbdbd" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="instagram" size={25} color="#bdbdbd" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="github" size={25} color="#bdbdbd" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="twitter" size={25} color="#bdbdbd" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="linkedin" size={25} color="#bdbdbd" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  details: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  detailsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    justifyContent: 'center',
    marginLeft: 10,
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
  },
});
