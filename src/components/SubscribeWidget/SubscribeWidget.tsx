import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';
import { TextVariant } from '../TextVariant';
import {
  endConnection,
  finishTransaction,
  getProducts,
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
} from 'react-native-iap';
import { MixedList } from '../MixedList';
import { storage } from '../../storage';

export const SubscribeWidget = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const initializeConnection = async () => {
      try {
        await initConnection();
      } catch (error) {
        console.error('An error occurred', error.message);
      }
    };
    const purchaseUpdate = purchaseUpdatedListener(async purchase => {
      const receipt = purchase.transactionReceipt;

      if (receipt) {
        try {
          //await finishTransaction({ purchase, isConsumable: true });
          console.log('Purchase successful! Receipt:', receipt);
          storage.save({
            key: 'subscribe',
            id: 'month',
            data: 'success',
            expires: null,
          });
        } catch (error) {
          console.error('An error occurred', error.message);
        }
      }
    });

    const purchaseError = purchaseErrorListener(error => console.error('Purchase error', error.message));
    initializeConnection();
    fetchProducts();
    return () => {
      endConnection();
      purchaseUpdate.remove();
      purchaseError.remove();
    };
  }, []);

  const fetchProducts = async () => {
    try {
      const products = await getProducts({
        skus: ['budgetim_month'],
      });
      setProducts(products);
    } catch (error) {
      console.error('Error occurred while fetching products', error.message);
    }
  };
  const makePurchase = async sku => {
    try {
      await requestPurchase({ sku });
    } catch (error) {
      console.error('Error making purchase', error.message);
    }
  };
  return (
    <View>
      <TextVariant variant={'bodyBold'} style={{ marginBottom: 16 }}>
        {i18n.t('currencies.subscription.text')}
      </TextVariant>
      <MixedList
        data={products.map((product, index) => ({
          id: index,
          title: product.title,
          subtitle: product.description,
          rightText: product.localizedPrice,
          titleColor: 'white',
          onPress: () => makePurchase(product.productId),
        }))}
      />
    </View>
  );
};
