import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
  SafeAreaView,
  Image,
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
import {loginWithFacebook} from '../../redux/actions';
import Title from '../../components/title';

const {width, height} = Dimensions.get('window');

const Signin = (props) => {
  const dispatch = useDispatch();
  const [isWrong, setIsWrong] = useState(false);
  let _textInputRef = useRef(null);

  const [account, setAccount] = useState({
    email: '',
    password: '',
  });

  const handleChange = (key) => (val) => {
    setAccount({...account, [key]: val});
  };

  const handleSubmit = () => {
    account.email && account.password
      ? //const dispath = useDispatch();
        Axios({
          url: 'http://svcy3.myclass.vn/api/Users/signin',
          method: 'POST',
          data: account,
        })
          .then((res) => {
            AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
            AsyncStorage.setItem('accessToken', res.data.content.accessToken);
            dispatch(createAction(SET_USER_INFO, JSON.stringify(res.data)));
          })
          .catch((err) => {
            setIsWrong(true);
            console.log(err);
          })
      : setIsWrong(true);
  };

  const handlesignUp = () => {
    props.navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff', height: height}}>
      <Image
        style={styles.background}
        source={require('../../assets/bgImg.png')}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          style={styles.container}
          getTextInputRefs={() => {
            return [_textInputRef];
          }}>
          <View style={styles.content}>
            <Image
              style={styles.logo}
              source={require('../../assets/logo.png')}
            />
            <Text style={styles.loginText}>LOGIN</Text>

            {isWrong && (
              <Text style={styles.errText}>Sai tài khoản hoặc mật khẩu</Text>
            )}

            <View style={styles.form}>
              <TextInput
                style={styles.formControl}
                placeholder="Email"
                placeholderTextColor="gray"
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
                placeholder="Password"
                placeholderTextColor="gray"
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
                title="LOGIN"
                buttonStyle={styles.btn}
                onPress={handleSubmit}
              />
              <View style={styles.signUpContainer}>
                <Text
                  style={styles.textSignUpStart}
                  // buttonStyle={styles.btn}
                  onPress={handleSubmit}>
                  You don't have an account?
                </Text>
                <TouchableOpacity onPress={handlesignUp}>
                  <Text style={styles.textSignUpEnd}> Register now</Text>
                </TouchableOpacity>
              </View>

              {/* Login with Facebook */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <LoginButton
                  onLoginFinished={(error, result) => {
                    if (error) {
                      console.log('login has error: ' + result.error);
                    } else if (result.isCancelled) {
                      console.log('login is cancelled.');
                    } else {
                      AccessToken.getCurrentAccessToken().then((data) => {
                        dispatch(
                          loginWithFacebook({
                            facebookToken: data.accessToken.toString(),
                          }),
                        );
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    marginTop: -110,
    position: 'relative',
    width: width,
    height: height * 0.8,
  },

  container: {
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    textAlign: 'center',
  },

  content: {
    // width: width * 0.9,
    justifyContent: 'center',
    height: height * 0.9,
  },

  loginText: {
    fontSize: 35,
    color: '#517ad5',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 20,
  },

  logo: {
    display: 'flex',
    height: height * 0.2,
    width: width * 0.4,
    alignSelf: 'center',
  },

  formControl: {
    marginHorizontal: width * 0.05,
    paddingLeft: 20,
    borderColor: '#9999FF',
    borderWidth: 1,
    color: '#000',
    fontSize: 20,
    marginBottom: '4%',
    borderRadius: 5,
  },

  btn: {
    marginTop: 20,
    backgroundColor: '#F93C66',
    height: height * 0.07,
    marginHorizontal: width * 0.05,
    borderRadius: 50,
  },

  signUpContainer: {
    width: width,
    padding: 10,
    marginTop: height * 0.01,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  textSignUpStart: {
    // textAlign: 'center',
    color: '#000',
  },

  textSignUpEnd: {
    color: '#DD9A89',
    fontWeight: 'bold',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: height * 0.35,
    zIndex: 1,
  },

  errText: {
    marginLeft: width * 0.05,
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
    paddingVertical: 5,
  },
});

export default withNavigation(Signin);
