import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image,
  ImageBackground,
  AsyncStorage,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getProfile, updateAvatar} from '../../redux/actions';
import Icon from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconE from 'react-native-vector-icons/Entypo';
import Signin from '../Signin';
import ImagePicker from 'react-native-image-picker';
import {Button} from 'react-native-elements';

const {width, height} = Dimensions.get('window');

const Profile = (props) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) =>
    state.userInfo?.data?.content
      ? state.userInfo.data.content.accessToken
      : null,
  );
  const profile = useSelector((state) => state.userInfo.profile);

  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const pickImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // Lấy đường dẫn path ảnh trong điện thoại
        const uploadUri =
          Platform.OS === 'ios'
            ? response.uri.replace('file://', '')
            : 'file://' + response.path;
        const sourceImg = {
          uri: uploadUri,
          name: 'img.jpg',
          type: 'img/jpg',
        };

        // Nếu muốn gửi file lên server thông qua axios thì phải tạo 1 form data
        const data = new FormData();
        data.append('file', sourceImg);
        data.append('upload_preset', 'vule123');
        console.log('sourceImg', sourceImg);
        // Call Axios, data chính là data đã tạo ra từ formData ở trên
        // dispatch(updateAvatar());
      }
    });
  };

  const logOut = () => {
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('accessToken');
    dispatch({
      type: 'SET_USER_INFO',
    });
  };

  const onEditProfile = () => {
    props.navigation.navigate('ProfileEdit');
  };

  const changePassword = () => {
    props.navigation.navigate('ChangePassword');
  };

  const showNotify = () => {
    Alert.alert('Notification', 'Do you want to log out', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => logOut()},
    ]);
  };
  console.log('profile1', profile);

  useEffect(() => {
    if (accessToken) {
      dispatch(getProfile(accessToken));
    }
  }, [accessToken]);

  const renderLoading = () => {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#517ad5" />
      </View>
    );
  };

  return (
    <>
      {/* {!profile ? renderLoading() : null} */}
      {profile ? (
        // eslint-disable-next-line react-native/no-inline-styles
        <SafeAreaView style={{backgroundColor: '#fff'}}>
          <ImageBackground
            source={{uri: profile?.avatar}}
            style={styles.container}>
            <View style={styles.topContainer}>
              <TouchableOpacity style={styles.btnEdit} onPress={onEditProfile}>
                <IconE
                  name="edit"
                  size={25}
                  // eslint-disable-next-line react-native/no-inline-styles
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <Image style={styles.avatar} source={{uri: profile?.avatar}} />
          <TouchableOpacity
            title="Pick image"
            type="solid"
            buttonStyle={styles.imgBtn}
            onPress={pickImage}
            style={styles.editAva}>
            <Icon name="camera" size={22} />
          </TouchableOpacity>

          <View>
            <Text style={styles.text}>Thông tin tài khoản</Text>
          </View>

          <View style={styles.bottomContainer}>
            <View style={styles.rowInfo}>
              <Icon name="user" size={20} color="#F93C66" style={styles.icon} />
              <Text style={styles.textInfo}>{profile?.name}</Text>
            </View>

            <View style={styles.rowInfo}>
              <IconF
                name="transgender"
                size={22}
                color="#F93C66"
                style={styles.icon}
              />
              <Text style={styles.textInfo}>
                {profile?.gender ? 'Nam' : 'Nữ'}
              </Text>
            </View>

            <View style={styles.rowInfo}>
              <Icon name="mail" size={22} color="#F93C66" style={styles.icon} />
              <Text style={styles.textInfo}>{profile?.email}</Text>
            </View>

            <View style={styles.rowInfo}>
              <Icon
                name="phone"
                size={22}
                color="#F93C66"
                style={styles.icon}
              />
              <Text style={styles.textInfo}>{profile?.phone}</Text>
            </View>
          </View>

          <View style={styles.containerBtn}>
            <Button
              title="ĐĂNG XUẤT"
              // eslint-disable-next-line react-native/no-inline-styles
              buttonStyle={{...styles.btn, backgroundColor: '#F93C66'}}
              onPress={showNotify}
            />

            <Button
              title="ĐỔI MẬT KHẨU"
              // eslint-disable-next-line react-native/no-inline-styles
              buttonStyle={{
                ...styles.btn,
                backgroundColor: '#517ad5',
              }}
              onPress={changePassword}
            />
          </View>
        </SafeAreaView>
      ) : (
        <Signin />
      )}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    width: width,
  },

  topContainer: {
    position: 'relative',
    height: height * 0.4,
    width: width,
    backgroundColor: '#DD9A89',
    opacity: 0.8,
    borderBottomLeftRadius: 250,
  },

  avatar: {
    zIndex: 1,
    position: 'absolute',
    borderRadius: width * 0.12,
    height: width * 0.24,
    width: width * 0.24,
    marginLeft: 0.1 * width,
    marginTop: height * 0.2,
  },

  editAva: {
    marginLeft: 0.1 * width,
    marginTop: height * 0.2,
    zIndex: 2,
    position: 'absolute',
  },

  bottomContainer: {
    maxWidth: width * 0.7,
    borderTopColor: '#DD9A89',
    borderTopWidth: 0.1,
    backgroundColor: '#fff',
    height: height * 0.35,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  btnEdit: {
    alignSelf: 'flex-end',
    marginRight: width * 0.025,
    marginTop: width * 0.025,
    width: 40,
    height: 40,
    backgroundColor: '#cecece',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    flexShrink: 0,
  },

  rowInfo: {
    paddingVertical: height * 0.02,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },

  textInfo: {
    // marginLeft: 100
    fontSize: 18,
  },

  icon: {
    marginRight: width * 0.1,
  },

  line: {
    width: 0.8 * width,
    height: 2,
    marginTop: 20,
    // height: 0.1,
    backgroundColor: 'red',
    alignSelf: 'center',
  },

  text: {
    fontWeight: 'bold',
    color: '#F93C66',
    borderBottomColor: '#F93C66',
    paddingBottom: 10,
    borderBottomWidth: 1,
    width: 0.8 * width,
    textTransform: 'uppercase',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    fontSize: 20,
    marginTop: 0.02 * width,
  },

  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: width * 0.05,
  },

  btn: {
    backgroundColor: '#F93C66',
    height: height * 0.07,
    width: width * 0.43,
    borderRadius: 15,
  },
});
