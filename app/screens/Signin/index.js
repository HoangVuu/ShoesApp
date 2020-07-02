import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
  AsyncStorage, // giống với local storage, chỉ lưu được string, chuỗi json
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {createAction} from '../../redux/actions';
import {SET_USER_INFO} from '../../redux/actions/type';
import {withNavigation} from '@react-navigation/compat';

const {width, height} = Dimensions.get('window');

const Signin = (props) => {
  const dispatch = useDispatch();
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
        console.log(res);
        AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
        AsyncStorage.setItem('accessToken', res.data.accessToken);
        dispatch(createAction(SET_USER_INFO, JSON.stringify(res.data)));
        // props.navigation.replace('index'); // dùng replace để reset lại và hủy bỏ các stack hiện tại và chuyển đến stack mới
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlesignUp = () => {
    props.navigation.navigate('SignUp');
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
          <View style={styles.signUpContainer}>
            <Text
              style={styles.textSignUpStart}
              buttonStyle={styles.btn}
              onPress={handleSubmit}>
              Bạn chưa có tài khoản?
            </Text>
            <TouchableOpacity onPress={handlesignUp}>
              <Text style={styles.textSignUpEnd}> Đăng kí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'gray',
    justifyContent: 'center',
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
    marginHorizontal: width * 0.05,
    paddingLeft: 20,
    borderColor: '#fff',
    borderWidth: 1,
    color: '#fff',
    fontSize: 20,
    marginBottom: '4%',
    borderRadius: 5,
  },

  btn: {
    backgroundColor: '#F93C66',
    height: height * 0.08,
    marginHorizontal: width * 0.05,
    borderRadius: 15,
  },

  signUpContainer: {
    marginTop: height * 0.02,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  textSignUpStart: {
    // textAlign: 'center',
    // color:'gray'
  },

  textSignUpEnd: {
    color: '#134c7f',
  },
});

export default withNavigation(Signin);
