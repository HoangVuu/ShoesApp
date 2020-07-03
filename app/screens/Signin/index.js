import React, {useState, useRef} from 'react';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {LoginButton, AccessToken} from 'react-native-fbsdk';

const {width, height} = Dimensions.get('window');

const Signin = (props) => {
  const dispatch = useDispatch();
  let _textInputRef = useRef(null);
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
      <KeyboardAwareScrollView
        style={styles.container}
        getTextInputRefs={() => {
          return [_textInputRef];
        }}>
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
              ref={(r) => {
                _textInputRef = r;
              }}
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
              ref={(r) => {
                _textInputRef = r;
              }}
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

            {/* Login with Facebook */}
            <View style={{justifyContent:'center', alignItems:'center', marginTop: 20}}>
              <LoginButton
                onLoginFinished={(error, result) => {
                  if (error) {
                    console.log('login has error: ' + result.error);
                  } else if (result.isCancelled) {
                    console.log('login is cancelled.');
                  } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                      console.log(data.accessToken.toString());
                      props.navigation.navigate('Profile');
                    });
                  }
                }}
                onLogoutFinished={() => console.log('logout.')}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    height: height,
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
