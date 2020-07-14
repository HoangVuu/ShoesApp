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
import {getProfile, updateProfile} from '../../redux/actions';
import Toast from 'react-native-simple-toast';

const {width, height} = Dimensions.get('window');

const ProfileEdit = (props) => {
  const dispatch = useDispatch();
  const {navigation} = props;
  let _textInputRef = useRef(null);
  const [isChoose, setIsChoose] = useState();
  const accessToken = useSelector((state) =>
    state.userInfo.data ? state.userInfo.data.content.accessToken : null,
  );
  const profile = useSelector((state) => state.userInfo.profile);
  console.log('profile edit', profile)

  const [account, setAccount] = useState({
    email: '',
    password: '',
    name: '',
    gender: true,
    phone: '',
  });

  /**
   * Validate input sigin up
   */
  const accountSchema = yup.object().shape({
    email: yup
      .string()
      .required('*Email bắt buộc nhập')
      .email('*Vui lòng nhập đúng email')
      .max(40, '*Email nhỏ hơn 40 kí tự '),
    name: yup
      .string()
      .required('*Tên bắt buộc nhập')
      .max(15, '*Tên nhỏ hơn 20 kí tự'),
    phone: yup
      .string()
      .required('*Số điện thoại bắt buộc nhập')
      .max(10, '*Số điẹn thoại phải là 10 chữ số')
      .min(10, '*Số điẹn thoại phải là 10 chữ số'),
  });

  const formik = useFormik({
    initialValues: {
      email: profile.email,
      password: '',
      name: profile.name,
      gender: true,
      phone: profile.phone,
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

    if (accessToken) {
      dispatch(updateProfile(body, accessToken));
      // if (accessToken) {
      //   dispatch(getProfile(accessToken));
      // }
    }
    Toast.show(
      'Thay đổi thông tin tài khoản thành công.',
      200,
      Toast.LONG,
      Toast.BOTTOM,
    );
    // handleGoBack();
    navigation.navigate('Profile');
  };

  var radio_props = [
    {label: 'Nam', value: false},
    {label: 'Nữ', value: true},
  ];

  useEffect(() => {
    if (accessToken) {
      dispatch(getProfile(accessToken));
    }
  }, [accessToken]);

  useEffect(() => {
    setIsChoose(profile.gender);
    setAccount({
      ...account,
      email: profile.email,
      name: profile.name,
      gender: profile.gender,
      phone: profile.phone,
    });
  }, [profile.email, profile.gender, profile.name, profile.phone]);

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
          title="CHỈNH SỬA THÔNG TIN"
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
              <Text style={styles.label}>Name:</Text>
              <TextInput
                defaultValue={account.name}
                style={styles.formControl}
                placeholder="Nhập tên "
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
                  initial={profile?.gender ? 1 : 0}
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
                defaultValue={account.phone}
                placeholder="Nhập SĐT"
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
                  title="LƯU"
                  // eslint-disable-next-line react-native/no-inline-styles
                  buttonStyle={{...styles.btn, backgroundColor: '#F93C66'}}
                  onPress={handleSubmit}
                />

                <Button
                  title="HỦY"
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

export default ProfileEdit;
