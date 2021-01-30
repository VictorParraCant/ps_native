/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Image, StyleSheet,
  SafeAreaView,
  ScrollView, Button
} from 'react-native';
import {getProduct} from '../actions/categoryManagement';
import {addToCart} from '../actions/cartManagement';
import {connect} from 'react-redux';
import { useIsFocused } from "@react-navigation/native";
import { Container, Content, Text, Spinner } from 'native-base';

const Product = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isFocused = useIsFocused();
  const styles = StyleSheet.create({

  });

  useEffect(() => {
    let cleanupFunction = false;
    async function initProductPage() {
      if (!cleanupFunction) {
        setIsLoaded(false);
        await props.getProduct(props.route.params.id_product);
        setIsLoaded(true);
      }
    }
    initProductPage();
    return () => cleanupFunction = true;
  }, [isFocused]);

  const addToCart = async (id_product, id_product_attribute) => {
    props.addToCart({
      id_product: id_product,
      id_product_attribute: id_product_attribute,
    })
    
  }

  return (
    <Container>
      <Content>
      {
        isLoaded ?
          <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
            
            </ScrollView>
          </SafeAreaView>


          : 
          <View style={{flex:100, alignItems:'center',justifyContent: 'center',flexGrow:2, height:100}}>
           <Spinner color='green' />
         </View>
      }
      </Content> 
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    currentProduct: state.categories.currentProduct,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (payload) => dispatch(addToCart(payload)),
    getProduct: (payload) => dispatch(getProduct(payload)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);
