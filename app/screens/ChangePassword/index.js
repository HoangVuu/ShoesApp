import React, {useState, useEffect, useRef, Fragment} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import RadioForm from 'react-native-simple-radio-button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import * as yup from 'yup';
import * as _ from 'lodash';
import {useFormik} from 'formik';
import ErrorText from '../../components/errorText';
import Title from '../../components/title';
import {getProfile, changePassword} from '../../redux/actions';
import Toast from 'react-native-simple-toast';

const {width, height} = Dimensions.get('window');

const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const {navigation} = props;
  let _textInputRef = useRef(null);
  const accessToken = useSelector((state) =>
    state.userInfo.data ? state.userInfo.data.content.accessToken : null,
  );
  const profile = useSelector((state) => state.userInfo.profile);

  const [account, setAccount] = useState({
    email: '',
    newPassword: '',
  });

  /**
   * Validate input sigin up
   */
  const accountSchema = yup.object().shape({
    email: yup
      .string()
      .required('*Email is required')
      // .email('*Vui lòng nhập đúng email')
      .max(40, '*Email must be less than 40 characters'),
    newPassword: yup
      .string()
      .required('*Password is required')
      .min(5, '*Password must be more than 5 chracters'),
  });

  const formik = useFormik({
    initialValues: {
      email: profile.email,
      newPassword: '',
    },
    validationSchema: accountSchema,
    validateOnMount: true,
  });

  /**
   * Handle go back previous screen
   */
  const handleGoBack = () => {
    navigation.goBack();
  };

  /**
   * Handle submit form
   */
  const handleSubmit = () => {
    if (!_.isEmpty(formik.errors)) {
      return;
    }

    const body = {...formik.values};
    console.log('body', body);
    dispatch(changePassword(body, accessToken));

    Toast.show('Update Profile successful.', 200, Toast.LONG, Toast.BOTTOM);
    handleGoBack();
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getProfile(accessToken));
    }
  }, []);

  useEffect(() => {
    setAccount({
      ...account,
      email: profile.email,
      newPassword: profile.newPassword,
    });
  }, [profile.email, profile.newPassword]);

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

        <Title
          title="CHANGE PASSWORD"
          customStyle={{fontSize: 22, color: '#F93C66'}}
        />

        <View>
          {/* Form sign up  */}
          <View style={styles.content}>
            <View style={styles.form}>
              {/* Email  */}
              <Text style={styles.label}>Email:</Text>
              <TextInput
                selectTextOnFocus={false} // readonly
                editable={false} //readonly
                style={styles.formControl}
                defaultValue={account.email}
                placeholder="Nhập email"
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

              {/* Name  */}
              <Text style={styles.label}>New Password:</Text>
              <TextInput
                defaultValue={account.newPassword}
                style={styles.formControl}
                placeholder="Nhập mật khẩu mới"
                placeholderTextColor="#bfb5b5"
                autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
                keyboardType="default"
                returnKeyType="next"
                onChangeText={formik.handleChange('newPassword')}
                onBlur={formik.handleBlur('newPassword')}
                ref={(r) => {
                  _textInputRef = r;
                }}
              />
              <ErrorText
                customStyle={styles.errTxt}
                touched={formik.touched.newPassword}
                error={formik.errors.newPassword}
              />

              <View style={styles.containerBtn}>
                <Button
                  title="SAVE"
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
    height: height * 0.8,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: width * 0.05,
    marginTop: height * 0.02,
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

export default ChangePassword;
