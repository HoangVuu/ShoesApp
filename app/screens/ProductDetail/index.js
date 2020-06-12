import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {actFetchDetail} from '../../redux/actions';

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => {
    console.log('state', state);
    return state?.products?.productDetail});

  const {id} = props.route.params;
  console.log(id);
  console.log('productDetail', productDetail);
  useEffect(() => {
    dispatch(actFetchDetail(id));
  }, []);

  return (
    <View>
      <Text>21212</Text>
      <Text>{ productDetail?.name}</Text>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
