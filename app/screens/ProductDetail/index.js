import React, {useEffect, useState, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {actFetchDetail} from '../../redux/actions';
import Icon from 'react-native-vector-icons/AntDesign';
import RelatedProduct from '../../components/related-product';
import Toast from 'react-native-simple-toast';
import {Button} from 'react-native-elements';

const {width, height} = Dimensions.get('window');

const ProductDetail = (props) => {
  const [isSelected, setIsSelected] = useState(0);
  const [data, setData] = useState({detail: null});
  const [isLove, setIsLove] = useState(true);
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.products?.productDetail);
  const userInfo = useSelector((state) => state.userInfo);
  const lovedList = useSelector((state) => state.favorite);
  const listLiked = lovedList.map((favoItem) => favoItem.id);
  // const categories = JSON.parse(JSON.stringify(productDetail?.categories));

  const {id} = props.route.params;
  const {navigation} = props;
  const handleChangeSize = (id) => () => {
    setIsSelected(id);
  };

  /**
   * Add this item to cart
   */
  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART', //thuộc tính bắt buộc: mô tả hành động
      payload: productDetail, // khi nào cần gửi dữ liệu lên thì gửi kèm
    });
    Toast.show('Add shoes successful.', 200, Toast.LONG, Toast.BOTTOM);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  /**
   * Buy now, direct to cart screen right away
   */
  const buyNow = () => {
    dispatch({
      type: 'ADD_TO_CART', //thuộc tính bắt buộc: mô tả hành động
      payload: productDetail, // khi nào cần gửi dữ liệu lên thì gửi kèm
    });
    navigation.navigate('Cart');
  };

  /**
   * Like Item
   */
  const addItem = () => {
    dispatch({
      type: 'ADD_TO_FAVORITE',
      payload: productDetail,
    });
  };

  /**
   * Dislike item
   */
  const removeItem = () => {
    dispatch({
      type: 'REMOVE_TO_FAVORITE',
      payload: id,
    });
  };

  /**
   * Handle like and dislike item
   */
  const handleFavorite = () => {
    setIsLove(!isLove);
    isLove ? addItem() : removeItem();
  };

  /**
   * Login request, have to login to like and unlike item
   */
  const handleLoginrequest = () => {
    Alert.alert(
      'Login request',
      'You have to login to experience this feature',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    if (listLiked.some((favo) => favo === id)) {
      setIsLove(false);
    } else {
      setIsLove(true);
    }
  }, [listLiked]);

  useEffect(() => {
    dispatch(actFetchDetail(id));
    setData({...data, detail: productDetail});
  }, [id]);

  return (
    <>
      {!data.detail ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#F93C66" />
        </View>
      ) : (
        <SafeAreaView style={styles.mainContainer}>
          {productDetail && (
            <Fragment>
              <ScrollView style={styles.scrollContainer}>
                <View style={styles.topContainer}>
                  <View style={styles.background}>
                    <View style={styles.headerDetail}>
                      <TouchableOpacity onPress={handleGoBack}>
                        <Icon
                          style={styles.btnBack}
                          name="arrowleft"
                          size={25}
                        />
                      </TouchableOpacity>
                      <Text style={styles.category}>
                        {/* {productDetail?.categories[0].category} */}ADIDAS
                      </Text>

                      <TouchableOpacity
                        onPress={
                          userInfo?.isLogin
                            ? handleFavorite
                            : handleLoginrequest
                        }
                        style={styles.btn}>
                        {!isLove ? (
                          <Icon
                            name="heart"
                            size={18}
                            color="red"
                            style={styles.btnIcon}
                          />
                        ) : (
                          <Icon name="hearto" style={styles.btnIcon} />
                        )}
                      </TouchableOpacity>
                    </View>

                    {/* Main Image */}
                    <Image
                      style={styles.bigImg}
                      source={{uri: productDetail?.image}}
                    />
                  </View>
                  {/* Sub images */}
                  <View style={styles.moreImgContainer}>
                    <Image
                      style={styles.smallImg}
                      source={{uri: productDetail.image}}
                    />
                    <Image
                      style={{...styles.smallImg, ...styles.smallImg1}}
                      source={{uri: productDetail.image}}
                    />
                    <Image
                      style={{...styles.smallImg, ...styles.smallImg2}}
                      source={{uri: productDetail.image}}
                    />
                    <Image
                      style={{...styles.smallImg, ...styles.smallImg3}}
                      source={{uri: productDetail.image}}
                    />
                  </View>
                </View>

                {/* Info of product */}
                <View style={styles.bottomContainer}>
                  <View style={styles.info}>
                    <Text style={styles.name}>{productDetail.name}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>${productDetail.price}</Text>
                    </View>
                  </View>
                  <Text style={styles.description}>
                    {productDetail.description?.trim()}
                  </Text>

                  {/* Size of product */}
                  <View>
                    <Text style={styles.size}>Size</Text>
                    <FlatList
                      style={styles.sizeContainer}
                      horizontal
                      data={productDetail.size}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item) => item?.id}
                      renderItem={({item, index}) => {
                        const selected = index === isSelected;
                        const sizeNameStyle = selected
                          ? {...styles.sizeBox, ...styles.sizeActive}
                          : styles.sizeBox;

                        return (
                          <TouchableOpacity
                            onPress={handleChangeSize(index, item)}
                            style={sizeNameStyle}>
                            <Text style={selected && styles.sizeNum}>
                              {item}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>

                  {/* Related Products */}
                  <View>
                    <Text style={styles.relatedText}> Related Shoes</Text>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={productDetail.relatedProducts}
                      keyExtractor={(item) => item?.id}
                      viewabilityConfig={{
                        waitForInteraction: true,
                        viewAreaCoveragePercentThreshold: 80,
                      }}
                      renderItem={({item, index}) => {
                        return <RelatedProduct item={item} />;
                      }}
                    />
                  </View>
                </View>
              </ScrollView>

              {/* Add to cart  */}
              <View style={styles.containerBtn}>
                <Button
                  title="BUY NOW"
                  // eslint-disable-next-line react-native/no-inline-styles
                  buttonStyle={{
                    ...styles.btnSubmit,
                    backgroundColor: '#DD9A89',
                    color: 'black',
                  }}
                  onPress={buyNow}
                />

                <Button
                  title="ADD TO CART"
                  // eslint-disable-next-line react-native/no-inline-styles
                  buttonStyle={{
                    ...styles.btnSubmit,
                    backgroundColor: '#F93C66',
                  }}
                  onPress={addToCart}
                />
              </View>
            </Fragment>
          )}
        </SafeAreaView>
      )}
    </>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  loading: {
    backgroundColor: '#517ad5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  topContainer: {
    backgroundColor: '#fff',
  },

  scrollContainer: {
    height: height * 0.85,
    backgroundColor: 'white',
  },

  mainContainer: {
    position: 'relative',
    backgroundColor: 'white',
  },

  headerDetail: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  btnBack: {
    marginLeft: 5,
  },

  background: {
    height: height * 0.4,
    backgroundColor: '#DD9A89',
    borderBottomLeftRadius: 180,
  },

  category: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },

  bigImg: {
    alignItems: 'center',
    width: '80%',
    height: '80%',
    transform: [{rotate: '-20deg'}],
    marginLeft: '5%',
  },

  smallImg: {
    width: 60,
    height: 60,
  },

  smallImg1: {
    transform: [{rotate: '20deg'}, {rotateY: '180deg'}],
  },

  smallImg2: {
    transform: [{rotateY: '180deg'}],
  },

  smallImg3: {
    transform: [{rotate: '20deg'}],
  },

  moreImgContainer: {
    justifyContent: 'space-around',
    height: height * 0.1,
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#F5ACBD',
    borderBottomWidth: 1,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },

  btn: {
    width: 40,
    height: 40,
    backgroundColor: '#cecece',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    elevation: 13,
    // flexShrink: 0,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    flexShrink: 0,
    width: width * 0.7,
  },

  priceContainer: {
    flexShrink: 0,
    backgroundColor: '#FDDCE3',
    width: '20%',
    height: '50%',
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  btnIcon: {
    fontSize: 18,
  },

  bottomContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },

  description: {
    paddingTop: 10,
    color: '#898889',
  },

  size: {
    fontSize: 19,
    fontWeight: 'bold',
    paddingTop: 15,
  },

  sizeContainer: {
    paddingTop: 10,
  },

  sizeBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#D0D1D1',
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 8,
  },

  sizeActive: {
    backgroundColor: '#000',
  },

  sizeNum: {
    color: '#fff',
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
    marginTop: 20,
  },

  cart: {
    color: '#fff',
    textTransform: 'uppercase',
  },

  relatedText: {
    fontSize: 19,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 10,
  },

  containerBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: width * 0.05,
  },

  btnSubmit: {
    marginTop: 20,
    height: height * 0.07,
    width: width * 0.43,
    borderRadius: 15,
  },
});
