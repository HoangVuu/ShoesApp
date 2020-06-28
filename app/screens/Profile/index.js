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
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getProfile} from '../../redux/actions';
import Icon from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconE from 'react-native-vector-icons/Entypo';

const {width, height} = Dimensions.get('window');

const Profile = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.userInfo.data.content.accessToken,
  );

  const profile = useSelector((state) => state.userInfo.profile);

  console.log('111vvv', profile);

  useEffect(() => {
    !accessToken && dispatch(getProfile(accessToken));
  });

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <ImageBackground source={{uri: profile.avatar}} style={styles.container}>
        <View style={styles.topContainer}>
          <IconE
            name="edit"
            size={25}
            style={{marginLeft: width * 0.9, marginTop: 10}}
          />
        </View>
      </ImageBackground>
      <Image style={styles.avatar} source={{uri: profile.avatar}} />

      <View>
        <Text style={styles.text}>Thông tin đăng nhập</Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.rowInfo}>
          <Icon name="user" size={22} color="#F93C66" style={styles.icon} />
          <Text style={styles.textInfo}>{profile.name}</Text>
        </View>

        <View style={styles.rowInfo}>
          <IconF
            name="transgender"
            size={22}
            color="#F93C66"
            style={styles.icon}
          />
          <Text style={styles.textInfo}>{profile.gender ? 'Nam' : 'Nữ'}</Text>
        </View>

        <View style={styles.rowInfo}>
          <Icon name="mail" size={22} color="#F93C66" style={styles.icon} />
          <Text style={styles.textInfo}>{profile.email}</Text>
        </View>

        <View style={styles.rowInfo}>
          <Icon name="phone" size={22} color="#F93C66" style={styles.icon} />
          <Text style={styles.textInfo}>{profile.phone}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cartContainer}>
        <Text style={styles.cart}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
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
    position: 'absolute',
    borderRadius: width * 0.12,
    height: width * 0.24,
    width: width * 0.24,
    marginLeft: 0.1 * width,
    marginTop: height * 0.2,
  },

  bottomContainer: {
    borderTopColor: '#DD9A89',
    borderTopWidth: 0.1,
    backgroundColor: '#fff',
    paddingLeft: width * 0.3,
    height: height * 0.35,
    justifyContent: 'center',
  },

  rowInfo: {
    paddingVertical: height * 0.02,
    display: 'flex',
    flexDirection: 'row',
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

  cartContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#F93C66',
    width: width * 0.8,
    height: height * 0.06,
    borderRadius: 8,
    marginBottom: 20,
  },

  cart: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: '600',
  },

  text: {
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
    fontWeight: '600',
    marginTop: 0.02 * width,
  },
});
