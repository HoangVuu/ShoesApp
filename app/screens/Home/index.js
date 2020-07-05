import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header';
import {useDispatch, useSelector} from 'react-redux';
import {
  actFetchCategory,
  actFetchProducts,
  actFetchAll,
} from '../../redux/actions';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFont from 'react-native-vector-icons/FontAwesome';
import Product from '../../components/product';
import RelatedProduct from '../../components/related-product';

const {width, height} = Dimensions.get('window');

const Home = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.category.categoryList);
  const allProducts = useSelector((state) => state.products.allProducts);
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]?.id);
  const productsList = useSelector((state) => state.products?.productsList);

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

        {/* Products */}
        <View>
          <>
            {productsList && (
              <FlatList
                style={styles.productListContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={productsList}
                keyExtractor={(item) => item.id}
                viewabilityConfig={{
                  waitForInteraction: true,
                  viewAreaCoveragePercentThreshold: 80,
                }}
                // onEndReachedThreshold={80} phân trang
                // onEndReached={}
                // onViewableItemsChanged={handleChange}
                renderItem={({item, index}) =>
                  productsList && (
                    <Product
                      item={item}
                      isCurrent={index === currentItemOnView}
                    />
                  )
                }
              />
            )}
          </>
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
  homeContainer: {
    height: height,
    backgroundColor: '#fff',
  },

  categoryContainer: {
    marginTop: 10,
    marginBottom: 10,
  },

  productListContainer: {
    marginTop: height * 0.02,
    marginLeft: 15,
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
