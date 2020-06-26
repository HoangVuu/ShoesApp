import React, {useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Text,
  View,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import Product from '../../components/product';

const Favorites = () => {
  const userInfo = useSelector((state) => state.userInfo);
  console.log('favo', userInfo);
  return (
    <SafeAreaView>
      <View>
        <Text>123</Text>
      </View>
      {/* <ScrollView>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={likedProduct}
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
              <Product item={item} isCurrent={index === currentItemOnView} />
            )
          }
        />
      </ScrollView> */}
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({});
