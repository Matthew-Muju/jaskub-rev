import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Header, Gap, Button} from '../component';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import SLI from 'react-native-vector-icons/SimpleLineIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const SignUp = ({navigation}) => {
  const [values, setValues] = useState({
    username: '',
    role: '',
    dialnumber: '',
    email: '',
    password2: '',
    password: '',
    jeniskelamin: '',
    birthdate: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleSignUp = () => {
    const {
      email,
      password,
      password2,
      username,
      role,
      dialnumber,
      jeniskelamin,
      birthdate,
    } = values;

    if (password === password2) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firestore().collection('users').doc(auth().currentUser.uid).set({
            uid: auth().currentUser.uid,
            role,
            username,
            email,
            password,
            dialnumber,
            jeniskelamin,
            birthdate,
            status: 'active',
          });
        })
        .catch(error => {
          alert(error.message);
          // ..
        });
    } else {
      alert('Passwords Tidak Sama!');
    }
  };

  const handleChange = (text, eventName) => {
    setValues(prev => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setValues({
      birthdate: date,
    });
    hideDatePicker();
    console.log(values.birthdate);
  };

  const getDate = () => {
    const {birthdate} = values;
    let tempDate = birthdate.toString().split(' ');
    return birthdate !== ''
      ? `${tempDate[2]} ${tempDate[1]} ${tempDate[3]}`
      : '';
  };

  const checkTextInput = () => {
    const passwd =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
    if (!values.role.trim()) {
      styles.safeView.borderColor = 'red';
      alert('Pilih Pengguna atau Kuli');
      return;
    }
    if (!values.username.trim()) {
      styles.safeView.borderColor = 'red';
      alert('Masukan Nama Anda');
      return;
    }
    if (!values.email.trim()) {
      styles.safeView.borderColor = 'red';
      alert('Email Tidak Boleh Kosong');
      return;
    }
    if (!values.password.trim()) {
      styles.safeView.borderColor = 'red';
      alert('Password Tidak Boleh Kosong');
      return;
    }
    if (!values.password.match(passwd)) {
      styles.safeView.borderColor = 'red';
      alert(
        'Password Harus Berisi 8-16 Karakter Dan Terdapat Minimal 1 Huruf Kecil, 1 Huruf Besar, 1 Digit Numerik, dan 1 Karakter Spesial',
      );
      return;
    }
    if (!values.password2.trim()) {
      styles.safeView.borderColor = 'red';
      alert('Konfirmasi Password Tidak Boleh Kosong');
      return;
    }
    if (!values.dialnumber.trim()) {
      styles.safeView.borderColor = 'red';
      alert('Masukan Nomor Telepon');
      return;
    }
    if (!values.jeniskelamin.trim()) {
      styles.safeView.borderColor = 'red';
      alert('Masukan Jenis Kelamin');
      return;
    }
    //Checked Successfully
    //Do whatever you want
    handleSignUp();
    alert('Akun Berhasil Dibuat');
  };

  return (
    <ScrollView>
      <View style={styles.page}>
        <Header title="DAFTAR" onBack={() => navigation.goBack()} />
        <Gap height={26} />
        {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
        <View style={styles.wel}>
          <Text style={styles.welText}>Ayo Bergabung Bersama Kami</Text>
        </View>
        <View style={styles.formWrapper}>
          <Text style={styles.text}>Mendaftar Sebagai</Text>
          <SafeAreaView style={styles.safeView}>
            <SLI name="people" style={styles.Icons} size={28} color="#2196F3" />

            <TextInput
              value={values.role}
              onChangeText={text => handleChange(text, 'role')}
              placeholder="Pengguna/Kuli"
            />
          </SafeAreaView>
          <Gap height={16} />
          <Text style={styles.text}>Nama Lengkap</Text>
          <SafeAreaView style={styles.safeView}>
            <AntDesign
              name="user"
              style={styles.Icons}
              size={28}
              color="#2196F3"
            />

            <TextInput
              value={values.username}
              onChangeText={text => handleChange(text, 'username')}
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
              value={values.dialnumber}
              onChangeText={text => handleChange(text, 'dialnumber')}
              placeholder="Nomor Telepon +62"
              keyboardType="numeric"
            />
          </SafeAreaView>
          <Gap height={16} />
          <Text style={styles.text}>Jenis Kelamin</Text>
          <SafeAreaView style={styles.safeView}>
            <MCI
              name="human-male-female"
              style={styles.Icons}
              size={28}
              color="#2196F3"
            />

            <TextInput
              value={values.jeniskelamin}
              onChangeText={text => handleChange(text, 'jeniskelamin')}
              placeholder="Pria/Wanita"
            />
          </SafeAreaView>
          <Gap height={16} />
          <Text style={styles.text}>Tanggal Lahir</Text>
          <SafeAreaView style={styles.safeView}>
            <FontAwesome
              name="calendar"
              style={styles.Icons}
              size={28}
              color="#2196F3"
            />

            <TextInput
              value={getDate()}
              placeholder="Birth Date"
              style={{flex: 0.9}}
            />

            <TouchableOpacity
              onPress={showDatePicker}
              style={{justifyContent: 'center', flex: 0.2, marginRight: 10}}>
              <Text>Set Date</Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </TouchableOpacity>
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
              value={values.email}
              onChangeText={text => handleChange(text, 'email')}
              placeholder="E-mail"
            />
          </SafeAreaView>
          <Gap height={16} />
          <Text style={styles.text}>Password</Text>
          <SafeAreaView style={styles.safeView}>
            <AntDesign
              name="lock"
              style={styles.Icons}
              size={28}
              color="#2196F3"
            />

            <TextInput
              value={values.password}
              onChangeText={text => handleChange(text, 'password')}
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
            />
          </SafeAreaView>
          <Gap height={16} />
          <Text style={styles.text}>Konfirmasi Password</Text>
          <SafeAreaView style={styles.safeView}>
            <AntDesign
              name="lock"
              style={styles.Icons}
              size={28}
              color="#2196F3"
            />

            <TextInput
              value={values.password2}
              onChangeText={text => handleChange(text, 'password2')}
              placeholder="Konfirmasi"
              secureTextEntry
              autoCapitalize="none"
            />
          </SafeAreaView>
          <Gap height={36} />
          <Button title="Daftar" onPress={checkTextInput} />
          <Gap height={20} />
          <View style={styles.wel}>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.textLogin}>Sudah Punya Akun? Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  wel: {
    alignItems: 'center',
    marginBottom: 10,
  },
  welText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: 'black',
  },
  formWrapper: {
    paddingHorizontal: 24,
  },
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
  textLogin: {
    color: '#0530F5',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'underline',
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
