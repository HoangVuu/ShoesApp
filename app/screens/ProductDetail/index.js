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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {actFetchDetail} from '../../redux/actions';
import Icon from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

const ProductDetail = (props) => {
  const [isSelected, setIsSelected] = useState(0);
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.products.productDetail);

  const {id} = props.route.params;
  console.log('productDetail', productDetail);
  console.log('productDetail');

  const handleChangeSize = (id, value) => () => {
    setIsSelected(id);
    console.log('value', value);
  };

  useEffect(() => {
    id && dispatch(actFetchDetail(id));
  }, []);

  return (
    <SafeAreaView>
      {productDetail && (
        <Fragment>
          <ScrollView>
            <View style={styles.topContainer}>
              <View style={styles.background}>
                <View style={styles.headerDetail}>
                  <Icon name="arrowleft" size={25} />
                  {/* <Text style={styles.category}>{ productDetail && productDetail.categories.length && productDetail.categories[0].category}</Text>  */}
                  <TouchableOpacity style={styles.btn}>
                    <Icon name="hearto" style={styles.btnIcon} />
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
                  keyExtractor={(item) => item.id}
                  renderItem={({item, index}) => {
                    const selected = index === isSelected;
                    const sizeNameStyle = selected
                      ? {...styles.sizeBox, ...styles.sizeActive}
                      : styles.sizeBox;

                    return (
                      <TouchableOpacity
                        onPress={handleChangeSize(index, item)}
                        style={sizeNameStyle}>
                        <Text style={selected && styles.sizeNum}>{item}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              {/* Related Products */}
              {/* <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={products}
            keyExtractor={(item) => item.id}
            viewabilityConfig={{
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 80,
          }}
        
          renderItem={({item, index}) => {
           return(
            
           )
          }}
        /> */}
            </View>
          </ScrollView>

          {/* Add to cart  */}
          <View style={styles.cartContainer}>
            <Text style={styles.cart}>Add to Cart</Text>
          </View>
        </Fragment>
      )}
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: '#fff',
  },

  background: {
    height: height * 0.4,
    backgroundColor: '#DD9A89',
    borderBottomLeftRadius: 180,
  },
  category: {
    fontWeight: 'bold',
    color: '#fff',
  },

  bigImg: {
    alignItems: 'center',
    width: '80%',
    height: '80%',
    transform: [{rotate: '-20deg'}],
    marginLeft: '5%',
  },

  // smallImg: null,

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
    marginLeft: 10,
    // flexShrink: 0,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    flexShrink: 0,
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

  headerDetail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 20,
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
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    backgroundColor: '#F93C66',
    width: width * 0.8,
    height: height* 0.06,
    borderRadius: 8,
    marginTop: 20
  },

  cart: {
    color: '#fff',
    textTransform: 'uppercase',
  },

  relatedContainer: {},
});
