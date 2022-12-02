import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CustomView, Header, List, Gap, Button} from '../component';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import SLI from 'react-native-vector-icons/SimpleLineIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';

const Home = ({navigation}) => {
  const [user, setUser] = useState(null); // This user
  const [users, setUsers] = useState([]); // Other Users
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    jenisJasa: '',
    hargaMin: '',
    hargaMax: '',
    kota: '',
    dialnumber: '',
  });
  const [isUserVisible, setUserVisibility] = useState(true);
  const [isKuliVisible, setKuliVisibility] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    firestore()
      .collection('posts')
      .onSnapshot(posts => {
        const POSTS = [];
        posts.forEach(post => {
          POSTS.push(post.data());
        });
        setPosts(POSTS);
      });
  }, []);

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
        .where('role', '==', user?.role === 'Pengguna' ? 'Kuli' : 'Pengguna')
        .onSnapshot(users => {
          if (!users.empty) {
            const USERS = [];

            users.forEach(user => {
              USERS.push(user.data());
            });
            setUsers(USERS);
          }
        });
    if (user?.role === 'Pengguna') {
      setUserVisibility(false);
    } else if (user?.role === 'Kuli') {
      setKuliVisibility(false);
    }
  }, [user]);

  const handlePost = () => {
    const {jenisJasa, hargaMin, hargaMax, kota, dialnumber} = values;

    auth();
    firestore().collection('posts').doc(auth().currentUser.uid).set({
      uid: auth().currentUser.uid,
      jenisJasa,
      hargaMin,
      hargaMax,
      kota,
      dialnumber,
      status: 'active',
    });
  };

  const handleChange = (text, eventName) => {
    setValues(prev => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  };

  const checkTextInput = () => {
    if (!values.jenisJasa.trim()) {
      styles.safeView.borderColor = 'red';
      alert('Pilih Pengguna atau Kuli');
      return;
    }
    if (!values.hargaMin.trim()) {
      styles.safeView.borderColor = 'red';
      alert('Masukan Nama Anda');
      return;
    }
    if (!values.hargaMax.trim()) {
      styles.safeView.borderColor = 'red';
      alert('Email Tidak Boleh Kosong');
      return;
    }
    if (!values.kota.trim()) {
      styles.safeView.borderColor = 'red';
      alert('Password Tidak Boleh Kosong');
      return;
    }
    //Checked Successfully
    //Do whatever you want
    handlePost();
    alert('Posting Berhasil');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={user?.role === 'Pengguna' ? styles.pengguna : styles.kuli}>
          <View>
            <View style={{backgroundColor: '#E8F6FF'}}>
              <Header
                onBack={() => navigation.goBack()}
                options={() => navigation.navigate('Setting')}
                title="Beranda"
              />
            </View>
            <View
              style={{
                paddingVertical: 20,
                backgroundColor: '#E8F6FF',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 24, fontWeight: '800'}}>
                Welcome, {user?.username}
              </Text>
            </View>
            <CustomView hide={isUserVisible}>
              <View style={styles.view}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    marginBottom: 20,
                  }}>
                  {/* Daftar {user?.role === 'Pengguna' ? 'Kuli' : 'Pengguna'} yang
                  tersedia */}
                  Daftar Jasa Yang Tersedia
                </Text>

                <View style={{marginBottom: 20}}>
                  <SafeAreaView>
                    {posts.map(item => {
                      return (
                        <View key={item.uid} style={{paddingBottom: 10}}>
                          <List
                            title={item.jenisJasa}
                            status={item.status}
                            min={item.hargaMin}
                            max={item.hargaMax}
                            location={item.kota}
                            number={item.dialnumber}
                          />
                        </View>
                      );
                    })}
                  </SafeAreaView>
                </View>
              </View>
            </CustomView>
            <CustomView hide={isKuliVisible}>
              <View style={styles.view}>
                <Text style={styles.text}>Jenis Jasa</Text>
                <SafeAreaView style={styles.safeView}>
                  <IonIcons
                    name="people-outline"
                    style={styles.Icons}
                    size={28}
                    color="#2196F3"
                  />

                  <TextInput
                    value={values.jenisJasa}
                    onChangeText={text => handleChange(text, 'jenisJasa')}
                    placeholder="Pilih Jenis Jasa"
                  />
                </SafeAreaView>
                <Gap height={16} />
                <Text style={styles.text}>Nomor Telepon</Text>
                <SafeAreaView style={styles.safeView}>
                  <SLI
                    name="phone"
                    style={styles.Icons}
                    size={28}
                    color="#2196F3"
                  />

                  <TextInput
                    value={values.dialnumber}
                    onChangeText={text => handleChange(text, 'dialnumber')}
                    placeholder={user?.dialnumber}
                    keyboardType="numeric"
                  />
                </SafeAreaView>
                <Gap height={16} />
                <Text style={styles.text}>Harga Minimal</Text>
                <SafeAreaView style={styles.safeView}>
                  <FA
                    name="money"
                    style={styles.Icons}
                    size={28}
                    color="#2196F3"
                  />

                  <TextInput
                    value={values.hargaMin}
                    onChangeText={text => handleChange(text, 'hargaMin')}
                    placeholder="Tentukan Harga Minimal"
                    keyboardType="numeric"
                  />
                </SafeAreaView>
                <Gap height={16} />
                <Text style={styles.text}>Harga Maksimal</Text>
                <SafeAreaView style={styles.safeView}>
                  <FA
                    name="money"
                    style={styles.Icons}
                    size={28}
                    color="#2196F3"
                  />

                  <TextInput
                    value={values.hargaMax}
                    onChangeText={text => handleChange(text, 'hargaMax')}
                    placeholder="Tentukan Harga Maksimal"
                    keyboardType="numeric"
                  />
                </SafeAreaView>
                <Gap height={16} />
                <Text style={styles.text}>Lokasi</Text>
                <SafeAreaView style={styles.safeView}>
                  <SLI
                    name="location-pin"
                    style={styles.Icons}
                    size={28}
                    color="#2196F3"
                  />
                  <TextInput
                    value={values.kota}
                    onChangeText={text => handleChange(text, 'kota')}
                    placeholder="Masukan Kota Anda"
                  />
                </SafeAreaView>
                <Gap height={36} />
                <Button title="POST" onPress={checkTextInput} />
              </View>
            </CustomView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  pengguna: {
    flex: 1,
  },
  kuli: {
    flex: 1,
  },
  view: {
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  Icons: {flex: 0.17, marginLeft: 5},
});
