import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header';
import {useDispatch, useSelector} from 'react-redux';
import {
  actFetchCategory,
  actFetchProducts,
  actFetchAll,
} from '../../redux/actions';
import IconFont from 'react-native-vector-icons/FontAwesome';
import Product from '../../components/product';
import RelatedProduct from '../../components/related-product';
import Carousel from 'react-native-snap-carousel';
// import Icon from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

const Home = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.category.categoryList);
  const allProducts = useSelector((state) => state.products.allProducts);
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]?.id);
  const productsList = useSelector((state) => state.products?.productsList);
  let _carousel = useRef();
  const [isDisplay, setIsDisplay] = useState(true);

  // const [fadeAnim] = useState(new Animated.Value(0));
  // const [slideAnim] = useState(new Animated.Value(-200));
  const [currentItemOnView, setCurrentItemOnView] = useState(0);
  const handleChange = useCallback((params) => {
    setCurrentItemOnView(params.changed[0].index);
  }, []);

  const handleChangeCategory = (id) => () => {
    setSelectedCategory(id);
    // dispatch(actFetchAll());
  };

  const _renderItem = ({item, index}) => {
    return (
      productsList && (
        <Product item={item} isCurrent={index === currentItemOnView} />
      )
    );
  };

  const onChange = () => {
    console.log('_carousel', _carousel);
    console.log('_carousel 1 2', _carousel.currentIndex);
  };
  useEffect(() => {
    dispatch(actFetchProducts(selectedCategory));
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedCategory(categoryList[0]?.id);
    dispatch(actFetchCategory());
    dispatch(actFetchAll());

    // Animated.timing(fadeAnim, {
    //   toValue: 1,
    //   duration: 1000,
    // }).start();

    // Animated.spring(slideAnim, {
    //   toValue: 0,
    //   duration: 2000,
    //   friction: 1, // độ ma sát, càng lớn thì hiệu ứng càng chậm
    //   tension:1 // độ căng, càng lớn thì độ dập càng nhiều
    // }).start();
  }, [dispatch, categoryList[0]?.id]);

  return (
    <SafeAreaView style={styles.homeContainer}>
      <ScrollView>
        <Header title="Discover" />
        {/* Categories  */}
        <View style={styles.categoryContainer}>
          <FlatList
            horizontal
            data={categoryList}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => {
              const isSelected = item.id === selectedCategory;
              const categoryNameStyle = isSelected
                ? {...styles.categoryName, ...styles.activeName}
                : styles.categoryName;
              return (
                <TouchableOpacity
                  onPress={handleChangeCategory(item.id)}
                  style={styles.categoryItem}>
                  <Text style={categoryNameStyle}>{item.category}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {/* Snap carousel */}
        <View style={styles.productContainer}>
          <View style={styles.leftNav}>
            {/* <Text style={styles.textNav}> Make your life better every day</Text> */}
          </View>

          <View style={{position: 'relative', marginLeft: width * 0.05}}>
            <Carousel
              activeSlideAlignment="start"
              inactiveSlideOpacity={1}
              ref={(c) => {
                _carousel = c;
              }}
              data={productsList}
              layout={'default'}
              renderItem={_renderItem}
              sliderWidth={width}
              itemWidth={width * 0.5}
              // onScroll={onChange}
            />
          </View>
        </View>

        {/* More */}
        <View style={styles.moreContainer}>
          <Text style={styles.moreText}>More</Text>
          <IconFont
            name="long-arrow-right"
            size={25}
            style={styles.iconArrow}
          />
        </View>
        {/* More Products */}
        {allProducts && (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={allProducts}
            keyExtractor={(item) => item.id}
            viewabilityConfig={{
              waitForInteraction: true,
              viewAreaCoveragePercentThreshold: 80,
            }}
            renderItem={({item, index}) => {
              return <RelatedProduct item={item} />;
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  productContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  homeContainer: {
    height: height,
    backgroundColor: '#fff',
  },

  leftNav: {
    top: height * 0.18,
    right: width * 0.6,
    zIndex: 2,
    flexDirection: 'row',
    position: 'absolute',
    transform: [{rotate: '-90deg'}],
  },

  textNav: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  categoryContainer: {
    marginTop: 10,
    marginBottom: 10,
  },

  productListContainer: {
    marginTop: height * 0.02,
    // marginLeft: 15,
  },

  carousel: {
    backgroundColor: 'red',
  },

  categoryItem: {
    marginHorizontal: 15,
  },

  categoryName: {
    fontSize: 17,
  },

  activeName: {
    color: '#F93C66',
    fontWeight: 'bold',
  },

  moreContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.03,
    marginBottom: height * 0.02,
    paddingBottom: 7,
  },

  moreText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20,
  },

  iconArrow: {
    marginRight: 20,
  },
});
