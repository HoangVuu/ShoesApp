import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header';
import {useDispatch, useSelector} from 'react-redux';
import {actFetchCategory, actFetchProducts} from '../../redux/actions';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFont from 'react-native-vector-icons/FontAwesome';
import Product from '../../components/product';

const {width, height} = Dimensions.get('window');

const Home = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.category.categoryList);
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]?.id);
  // const [fadeAnim] = useState(new Animated.Value(0));
  // const [slideAnim] = useState(new Animated.Value(-200));
  const [currentItemOnView, setCurrentItemOnView] = useState(0);
  console.log(categoryList[0]?.id);
  const handleChange = useCallback((params) => {
    // console.log('params.changed', params.changed);
    setCurrentItemOnView(params.changed[0].index);
  }, []);

  const handleChangeCategory = (id) => () => {
    setSelectedCategory(id);
  };

  const products = [
    {
      id: 1,
      name: 'Adidas Prophere',
      alias: 'adidas-prophere',
      price: 350,
      feature: false,
      description:
        'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
      size: ['36', '37', '38', '39', '40', '41', '42'],
      shortDescription:
        'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
      quantity: 995,
      image: 'http://svcy3.myclass.vn/images/adidas-prophere.png',
      categories: [
        {
          id: 'ADIDAS',
          category: 'ADIDAS',
        },
        {
          id: 'MEN',
          category: 'MEN',
        },
        {
          id: 'WOMEN',
          category: 'WOMEN',
        },
      ],
      relatedProducts: [
        {
          id: 2,
          name: 'Adidas Prophere Black White',
          alias: 'adidas-prophere-black-white',
          feature: false,
          price: 450,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image:
            'http://svcy3.myclass.vn/images/adidas-prophere-black-white.png',
        },
        {
          id: 3,
          name: 'Adidas Prophere Customize',
          alias: 'adidas-prophere-customize',
          feature: false,
          price: 375,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-prophere-customize.png',
        },
        {
          id: 5,
          name: 'Adidas Swift Run',
          alias: 'adidas-swift-run',
          feature: false,
          price: 550,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-swift-run.png',
        },
      ],
    },
    {
      id: 2,
      name: 'Adidas Prophere Black White',
      alias: 'adidas-prophere-black-white',
      price: 450,
      feature: false,
      description:
        'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
      size: ['36', '37', '38', '39', '40', '41', '42'],
      shortDescription:
        'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
      quantity: 990,
      image: 'http://svcy3.myclass.vn/images/adidas-prophere-black-white.png',
      categories: [
        {
          id: 'ADIDAS',
          category: 'ADIDAS',
        },
        {
          id: 'MEN',
          category: 'MEN',
        },
        {
          id: 'WOMEN',
          category: 'WOMEN',
        },
      ],
      relatedProducts: [
        {
          id: 1,
          name: 'Adidas Prophere',
          alias: 'adidas-prophere',
          feature: false,
          price: 350,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-prophere.png',
        },
        {
          id: 4,
          name: 'Adidas Super Star Red',
          alias: 'adidas-super-star-red',
          feature: false,
          price: 465,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-super-star-red.png',
        },
        {
          id: 6,
          name: 'Adidas Tenisky Super Star',
          alias: 'adidas-tenisky-super-star',
          feature: false,
          price: 250,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-tenisky-super-star.png',
        },
      ],
    },
    {
      id: 3,
      name: 'Adidas Prophere Customize',
      alias: 'adidas-prophere-customize',
      price: 375,
      feature: false,
      description:
        'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
      size: ['36', '37', '38', '39', '40', '41', '42'],
      shortDescription:
        'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
      quantity: 415,
      image: 'http://svcy3.myclass.vn/images/adidas-prophere-customize.png',
      categories: [
        {
          id: 'ADIDAS',
          category: 'ADIDAS',
        },
        {
          id: 'MEN',
          category: 'MEN',
        },
        {
          id: 'WOMEN',
          category: 'WOMEN',
        },
      ],
      relatedProducts: [
        {
          id: 4,
          name: 'Adidas Super Star Red',
          alias: 'adidas-super-star-red',
          feature: false,
          price: 465,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-super-star-red.png',
        },
        {
          id: 5,
          name: 'Adidas Swift Run',
          alias: 'adidas-swift-run',
          feature: false,
          price: 550,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-swift-run.png',
        },
        {
          id: 7,
          name: 'Adidas Ultraboost 4',
          alias: 'adidas-ultraboost-4',
          feature: false,
          price: 450,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-ultraboost-4.png',
        },
      ],
    },
    {
      id: 4,
      name: 'Adidas Super Star Red',
      alias: 'adidas-super-star-red',
      price: 465,
      feature: false,
      description:
        'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
      size: ['36', '37', '38', '39', '40', '41', '42'],
      shortDescription:
        'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
      quantity: 542,
      image: 'http://svcy3.myclass.vn/images/adidas-super-star-red.png',
      categories: [
        {
          id: 'ADIDAS',
          category: 'ADIDAS',
        },
        {
          id: 'MEN',
          category: 'MEN',
        },
        {
          id: 'WOMEN',
          category: 'WOMEN',
        },
      ],
      relatedProducts: [
        {
          id: 7,
          name: 'Adidas Ultraboost 4',
          alias: 'adidas-ultraboost-4',
          feature: false,
          price: 450,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-ultraboost-4.png',
        },
        {
          id: 8,
          name: 'Adidas Yeezy 350',
          alias: 'adidas-yeezy-350',
          feature: false,
          price: 750,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-yeezy-350.png',
        },
        {
          id: 6,
          name: 'Adidas Tenisky Super Star',
          alias: 'adidas-tenisky-super-star',
          feature: false,
          price: 250,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-tenisky-super-star.png',
        },
      ],
    },
    {
      id: 5,
      name: 'Adidas Swift Run',
      alias: 'adidas-swift-run',
      price: 550,
      feature: false,
      description:
        'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
      size: ['36', '37', '38', '39', '40', '41', '42'],
      shortDescription:
        'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
      quantity: 674,
      image: 'http://svcy3.myclass.vn/images/adidas-swift-run.png',
      categories: [
        {
          id: 'ADIDAS',
          category: 'ADIDAS',
        },
        {
          id: 'MEN',
          category: 'MEN',
        },
        {
          id: 'WOMEN',
          category: 'WOMEN',
        },
      ],
      relatedProducts: [
        {
          id: 2,
          name: 'Adidas Prophere Black White',
          alias: 'adidas-prophere-black-white',
          feature: false,
          price: 450,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image:
            'http://svcy3.myclass.vn/images/adidas-prophere-black-white.png',
        },
        {
          id: 3,
          name: 'Adidas Prophere Customize',
          alias: 'adidas-prophere-customize',
          feature: false,
          price: 375,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-prophere-customize.png',
        },
        {
          id: 8,
          name: 'Adidas Yeezy 350',
          alias: 'adidas-yeezy-350',
          feature: false,
          price: 750,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-yeezy-350.png',
        },
      ],
    },
    {
      id: 6,
      name: 'Adidas Tenisky Super Star',
      alias: 'adidas-tenisky-super-star',
      price: 250,
      feature: false,
      description:
        'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
      size: ['36', '37', '38', '39', '40', '41', '42'],
      shortDescription:
        'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
      quantity: 456,
      image: 'http://svcy3.myclass.vn/images/adidas-tenisky-super-star.png',
      categories: [
        {
          id: 'ADIDAS',
          category: 'ADIDAS',
        },
        {
          id: 'MEN',
          category: 'MEN',
        },
        {
          id: 'WOMEN',
          category: 'WOMEN',
        },
      ],
      relatedProducts: [
        {
          id: 4,
          name: 'Adidas Super Star Red',
          alias: 'adidas-super-star-red',
          feature: false,
          price: 465,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-super-star-red.png',
        },
        {
          id: 2,
          name: 'Adidas Prophere Black White',
          alias: 'adidas-prophere-black-white',
          feature: false,
          price: 450,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image:
            'http://svcy3.myclass.vn/images/adidas-prophere-black-white.png',
        },
        {
          id: 3,
          name: 'Adidas Prophere Customize',
          alias: 'adidas-prophere-customize',
          feature: false,
          price: 375,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-prophere-customize.png',
        },
      ],
    },
    {
      id: 7,
      name: 'Adidas Ultraboost 4',
      alias: 'adidas-ultraboost-4',
      price: 450,
      feature: false,
      description:
        'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
      size: ['36', '37', '38', '39', '40', '41', '42'],
      shortDescription:
        'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
      quantity: 854,
      image: 'http://svcy3.myclass.vn/images/adidas-ultraboost-4.png',
      categories: [
        {
          id: 'ADIDAS',
          category: 'ADIDAS',
        },
        {
          id: 'MEN',
          category: 'MEN',
        },
        {
          id: 'WOMEN',
          category: 'WOMEN',
        },
      ],
      relatedProducts: [
        {
          id: 8,
          name: 'Adidas Yeezy 350',
          alias: 'adidas-yeezy-350',
          feature: false,
          price: 750,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-yeezy-350.png',
        },
        {
          id: 2,
          name: 'Adidas Prophere Black White',
          alias: 'adidas-prophere-black-white',
          feature: false,
          price: 450,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image:
            'http://svcy3.myclass.vn/images/adidas-prophere-black-white.png',
        },
        {
          id: 1,
          name: 'Adidas Prophere',
          alias: 'adidas-prophere',
          feature: false,
          price: 350,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-prophere.png',
        },
      ],
    },
    {
      id: 8,
      name: 'Adidas Yeezy 350',
      alias: 'adidas-yeezy-350',
      price: 750,
      feature: false,
      description:
        'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
      size: ['36', '37', '38', '39', '40', '41', '42'],
      shortDescription:
        'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
      quantity: 524,
      image: 'http://svcy3.myclass.vn/images/adidas-yeezy-350.png',
      categories: [
        {
          id: 'ADIDAS',
          category: 'ADIDAS',
        },
        {
          id: 'MEN',
          category: 'MEN',
        },
        {
          id: 'WOMEN',
          category: 'WOMEN',
        },
      ],
      relatedProducts: [
        {
          id: 1,
          name: 'Adidas Prophere',
          alias: 'adidas-prophere',
          feature: false,
          price: 350,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-prophere.png',
        },
        {
          id: 4,
          name: 'Adidas Super Star Red',
          alias: 'adidas-super-star-red',
          feature: false,
          price: 465,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-super-star-red.png',
        },
        {
          id: 6,
          name: 'Adidas Tenisky Super Star',
          alias: 'adidas-tenisky-super-star',
          feature: false,
          price: 250,
          description:
            'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
          shortDescription:
            'The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n',
          image: 'http://svcy3.myclass.vn/images/adidas-tenisky-super-star.png',
        },
      ],
    },
  ];

  const productsList = useSelector((state) => state.products?.productsList);

  useEffect(() => {
    dispatch(actFetchProducts(selectedCategory));
    console.log(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    dispatch(actFetchCategory());
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
  }, [dispatch]);

  return (
    <SafeAreaView>
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
        <FlatList
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
          renderItem={({item, index}) => (
              <Product item={item} isCurrent={index === currentItemOnView} />
          )}
        />
      </View>

      {/* More */}
      <View style={styles.moreContainer}>
        <Text style={styles.moreText}>More</Text>
        <IconFont name="long-arrow-right" size={25} style={styles.iconArrow} />
      </View>

      {/* Related Products */}
      <View style={styles.relatedContainer}>
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

        <Image
          resizeMode="contain"
          style={styles.relatedImg}
          source={{uri: 'http://svcy3.myclass.vn/images/adidas-prophere.png'}}
        />
        <Text style={styles.relatedName}>Nikekekeke</Text>
        <Text style={styles.relatedPrice}>90909</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  categoryContainer: {
    marginTop: 20,
  },
  categoryItem: {
    marginHorizontal: 15,
  },

  categoryName: {
    fontSize: 17,
  },

  activeName: {
    color: 'red',
  },

  moreContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },

  moreText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 20,
  },

  iconArrow: {
    marginRight: 20,
  },

  relatedContainer: {
    marginLeft: 20,
    alignItems: 'center',
    width: width * 0.4,
    backgroundColor: '#517ad5',
    borderRadius: 15,
  },

  relatedImg: {
    width: '100%',
    height: 100,
    transform: [{rotate: '-15deg'}],
  },

  relatedPrice: {
    marginBottom: 10,
  },
});
