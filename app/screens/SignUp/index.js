import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  CheckBox,
  AsyncStorage,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {createAction} from '../../redux/actions';
import {SET_USER_INFO} from '../../redux/actions/type';
import Icon from 'react-native-vector-icons/AntDesign';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const {width, height} = Dimensions.get('window');

const SignUp = (props) => {
  const dispatch = useDispatch();
  const {navigation} = props;
  const [isChoose, setIsChoose] = useState(true);
  let _textInputRef = useRef(null);

  const handleGoBack = () => {
    navigation.goBack();
  };
  // const handleSubmit = () => {
  //   //const dispath = useDispatch();
  //   Axios({
  //     url: 'http://svcy3.myclass.vn/api/Users/signin',
  //     method: 'POST',
  //     data: account,
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
  //       AsyncStorage.setItem('accessToken', res.data.accessToken);
  //       dispatch(createAction(SET_USER_INFO, JSON.stringify(res.data)));
  //       // props.navigation.replace('index'); // dùng replace để reset lại và hủy bỏ các stack hiện tại và chuyển đến stack mới
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  var radio_props = [
    {label: 'Nam', value: true},
    {label: 'Nữ', value: false},
  ];

  useEffect(() => {
    console.log('isChoose', isChoose);
  }, [isChoose]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        style={styles.container}
        getTextInputRefs={() => {
          return [_textInputRef];
        }}>
        {/* Button go back */}
        <TouchableOpacity style={styles.btnBack} onPress={handleGoBack}>
          <Icon name="arrowleft" size={25} />
        </TouchableOpacity>

        <View>
          {/* Form sign up  */}
          <View style={styles.content}>
            <View style={styles.form}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.formControl}
                placeholder="Nhập email"
                placeholderTextColor="#bfb5b5"
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
                // onChangeText={handleChange('email')}
                ref={(r) => {
                  _textInputRef = r;
                }}
              />
              <Text style={styles.label}>Password:</Text>
              <TextInput
                style={styles.formControl}
                placeholder="Nhập password "
                placeholderTextColor="#bfb5b5"
                keyboardType="default"
                returnKeyLabel="Submit"
                autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
                returnKeyType="done"
                // onChangeText={handleChange('password')}
                ref={(r) => {
                  _textInputRef = r;
                }}
              />

              <Text style={styles.label}>Name:</Text>
              <TextInput
                style={styles.formControl}
                placeholder="Nhập tên "
                placeholderTextColor="#bfb5b5"
                keyboardType="default"
                returnKeyLabel="Submit"
                secureTextEntry
                autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
                returnKeyType="done"
                ref={(r) => {
                  _textInputRef = r;
                }}
                // onChangeText={handleChange('password')}
              />
              <View style={styles.genderContainer}>
                <RadioForm
                  buttonColor={'#000'}
                  selectedButtonColor={'#F93C66'}
                  style={styles.radio}
                  labelStyle={styles.labelStyle}
                  radio_props={radio_props}
                  initial={0}
                  formHorizontal={true}
                  onPress={(value) => {
                    setIsChoose(value);
                  }}
                />
              </View>

              <Text style={styles.label}>Phone:</Text>
              <TextInput
                style={styles.formControl}
                placeholder="Nhập phone"
                placeholderTextColor="#bfb5b5"
                keyboardType="default"
                returnKeyLabel="Submit"
                autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
                returnKeyType="done"
                // onChangeText={handleChange('password')}
                ref={(r) => {
                  _textInputRef = r;
                }}
              />
              <View style={styles.containerBtn}>
                <Button
                  title="ĐĂNG KÍ"
                  // eslint-disable-next-line react-native/no-inline-styles
                  buttonStyle={{...styles.btn, backgroundColor: '#F93C66'}}
                  // onPress={handleSubmit}
                />

                <Button
                  title="HỦY"
                  // eslint-disable-next-line react-native/no-inline-styles
                  buttonStyle={{
                    ...styles.btn,
                    backgroundColor: 'gray',
                  }}
                  onPress={handleGoBack}
                  // onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: height * 0.1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    height: height,
  },

  label: {
    marginHorizontal: width * 0.05,
    fontSize: 18,
    marginBottom: 5,
  },

  container: {
    height: height,
    backgroundColor: '#fff',
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  btnBack: {
    backgroundColor: '#fff',
    paddingLeft: width * 0.05,
    paddingTop: 10,
    width: width * 0.15,
  },

  // logo: {
  //   height: 200,
  // },

  formControl: {
    marginHorizontal: width * 0.05,
    paddingLeft: 20,
    borderColor: '#F93C66',
    borderWidth: 1,
    color: 'black',
    fontSize: 18,
    marginBottom: height * 0.03,
    borderRadius: 5,
  },

  containerBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: width * 0.05,
  },

  btn: {
    marginTop: 20,
    backgroundColor: '#F93C66',
    height: height * 0.08,
    width: width * 0.4,
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

  genderContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  gender: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },

  radio: {
    marginHorizontal: width * 0.05,
  },

  labelStyle: {
    marginRight: width * 0.1,
  },
});

export default SignUp;
