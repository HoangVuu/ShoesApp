import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
  AsyncStorage, // giống với local storage, chỉ lưu được string, chuỗi json
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';
import Axios from 'axios';

const {height} = Dimensions.get('window');

const Signin = (props) => {
  const [account, setAccount] = useState({
    email: '',
    password: '',
  });

  const handleChange = (key) => (val) => {
    setAccount({...account, [key]: val});
  };

  const handleSubmit = () => {
    //const dispath = useDispatch();
    Axios({
      url: 'http://svcy3.myclass.vn/api/Users/signin',
      method: 'POST',
      data: account,
    })
      .then((res) => {
        console.log('res', res.data);
        AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
        AsyncStorage.setItem('accessToken', res.data.accessToken);
        props.navigation.replace('index'); // dùng replace để reset lại và hủy bỏ các stack hiện tại và chuyển đến stack mới
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.content}>
        <View style={styles.form}>
          <TextInput
            style={styles.formControl}
            placeholder="Tài khoản"
            placeholderTextColor="#fff"
            keyboardType="default"
            returnKeyType="next"
            autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
            onChangeText={handleChange('email')}
          />

          <TextInput
            style={styles.formControl}
            placeholder="Mật khẩu"
            placeholderTextColor="#fff"
            keyboardType="default"
            returnKeyLabel="Submit"
            secureTextEntry
            autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
            returnKeyType="done"
            onChangeText={handleChange('password')}
          />
          <Button
            title="ĐĂNG NHẬP"
            buttonStyle={styles.btn}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'gray',
    height: height,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    height: 200,
  },

  formControl: {
    paddingLeft: 20,
    borderColor: '#fff',
    borderWidth: 1,
    color: '#fff',
    fontSize: 20,
    marginBottom: '4%',
    borderRadius: 5,
  },

  btn: {
    height: 50,
  },
});

export default Signin;
