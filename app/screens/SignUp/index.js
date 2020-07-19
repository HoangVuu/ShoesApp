import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import RadioForm from 'react-native-simple-radio-button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import * as yup from 'yup';
import * as _ from 'lodash';
import {useFormik} from 'formik';
import ErrorText from '../../components/errorText';
import Title from '../../components/title';

import {signUp} from '../../redux/actions';
import Toast from 'react-native-simple-toast';

const {width, height} = Dimensions.get('window');

const SignUp = (props) => {
  const dispatch = useDispatch();
  const {navigation} = props;
  let _textInputRef = useRef(null);
  const [isChoose, setIsChoose] = useState();

  /**
   * Validate input sigin up
   */
  const accountSchema = yup.object().shape({
    email: yup
      .string()
      .required('*Email is required')
      .email('*Please enter email with the right format')
      .max(20, '*Email must be less than 20 characters '),
    password: yup
      .string()
      .required('*Password is required')
      .min(6, '*Passsword must be more than 5 characters'),
    name: yup
      .string()
      .required('*Name is required')
      .max(15, '*Name must be less than 15 characters'),
    phone: yup
      .string()
      .required('*Phone number is required')
      .max(10, '*Phone number must be enough 10 numbers')
      .min(10, '*Phone number must be enough 10 numbers'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      gender: true,
      phone: '',
    },
    validationSchema: accountSchema,
    validateOnMount: true,
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    if (!_.isEmpty(formik.errors)) {
      return;
    }

    const body = {...formik.values, gender: isChoose};

    dispatch(signUp(body));
    Toast.show(
      'Register a new account successful.',
      200,
      Toast.LONG,
      Toast.BOTTOM,
    );
    handleGoBack();
  };

  var radio_props = [
    {label: 'Male', value: false},
    {label: 'Female', value: true},
  ];

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
            <Title
              title="REGISTER NEW ACCOUNT"
              customStyle={{fontSize: 22, color: '#F93C66'}}
            />
            <View style={styles.form}>
              {/* Email  */}
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.formControl}
                placeholder="Enter email"
                placeholderTextColor="#bfb5b5"
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                ref={(r) => {
                  _textInputRef = r;
                }}
              />
              <ErrorText
                customStyle={styles.errTxt}
                touched={formik.touched.email}
                error={formik.errors.email}
              />

              {/* Password */}
              <Text style={styles.label}>Password:</Text>
              <TextInput
                style={styles.formControl}
                placeholder="Enter password "
                placeholderTextColor="#bfb5b5"
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                ref={(r) => {
                  _textInputRef = r;
                }}
              />
              <ErrorText
                customStyle={styles.errTxt}
                touched={formik.touched.password}
                error={formik.errors.password}
              />

              {/* Name  */}
              <Text style={styles.label}>Name:</Text>
              <TextInput
                style={styles.formControl}
                placeholder="Enter name "
                placeholderTextColor="#bfb5b5"
                autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
                keyboardType="default"
                returnKeyType="next"
                onChangeText={formik.handleChange('name')}
                onBlur={formik.handleBlur('name')}
                ref={(r) => {
                  _textInputRef = r;
                }}
              />
              <ErrorText
                customStyle={styles.errTxt}
                touched={formik.touched.name}
                error={formik.errors.name}
              />

              {/* Gender  */}
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

              {/* Phone  */}
              <Text style={styles.label}>Phone:</Text>
              <TextInput
                style={styles.formControl}
                placeholder="Enter phone number"
                placeholderTextColor="#bfb5b5"
                keyboardType="default"
                returnKeyLabel="Submit"
                autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
                returnKeyType="done"
                onChangeText={formik.handleChange('phone')}
                onBlur={formik.handleBlur('phone')}
                ref={(r) => {
                  _textInputRef = r;
                }}
              />
              <ErrorText
                customStyle={styles.errTxt}
                touched={formik.touched.phone}
                error={formik.errors.phone}
              />

              <View style={styles.containerBtn}>
                <Button
                  title="REGISTER"
                  // eslint-disable-next-line react-native/no-inline-styles
                  buttonStyle={{...styles.btn, backgroundColor: '#F93C66'}}
                  onPress={handleSubmit}
                />

                <Button
                  title="CANCEL"
                  // eslint-disable-next-line react-native/no-inline-styles
                  buttonStyle={{
                    ...styles.btn,
                    backgroundColor: 'gray',
                  }}
                  onPress={handleGoBack}
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
    // paddingTop: height * 0.1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    height: height * 0.9,
  },

  label: {
    marginTop: height * 0.03,
    marginHorizontal: width * 0.05,
    fontSize: 18,
    marginBottom: 5,
  },

  container: {
    backgroundColor: '#fff',
  },

  btnBack: {
    backgroundColor: '#fff',
    paddingLeft: width * 0.05,
    paddingTop: 10,
    width: width * 0.15,
  },

  formControl: {
    marginHorizontal: width * 0.05,
    paddingLeft: 20,
    borderColor: '#F93C66',
    borderWidth: 1,
    color: 'black',
    fontSize: 18,
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
    width: width * 0.43,
    borderRadius: 15,
  },

  signUpContainer: {
    marginTop: height * 0.02,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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
    marginTop: height * 0.03,
    marginHorizontal: width * 0.05,
  },

  labelStyle: {
    marginRight: width * 0.1,
  },

  errTxt: {
    marginLeft: width * 0.05,
  },
});

export default SignUp;
