import React, { FC, useEffect, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as InAppPurchases from 'expo-in-app-purchases';
import { StackParamList } from '../types';

import { TextVariant } from '../../components/TextVariant';
import { Container } from './styled';

const IAP_SKUS = Platform.select({
  ios: ['AD335DGA3GEB'],
  android: [],
});

export const IAPContext: React.Context<any> = React.createContext({
  processing: false,
  setProcessing: () => {},
  getProducts: () => {},
});

export const useIap = () => React.useContext(IAPContext);

export const IAP: FC<NativeStackScreenProps<StackParamList, 'IAP'>> = () => {
  const [processing, setProcessing] = useState(false);

  const processNewPurchase = async (purchase: any) => {
    const { productId } = purchase;

    const body = {
      platform: Platform.OS,
      productId: productId,
      receipt: purchase.transactionReceipt,
    };

    try {
      const { ack, response } = await fetch({
        url: 'iap/validate-iap',
        body,
      });

      if (ack === 'success') {
        const planState = {
          planId: productId,
          freeTrialEligible: false,
          freeTrialExpiry: response.freeTrialExpiry,
        };

        // make any Redux updates your app requires
        // to unlock premium features
        console.log(planState, 'planState');
        // batch(() => {
        //   props.setActivePlan(planState);
        // });
      }
    } catch (e) {
      // error with transaction details. Falls back to default state
      setProcessing(false);
    }
  };

  const getProducts = async () => {
    const { responseCode, results } = await InAppPurchases.getProductsAsync(IAP_SKUS);
    console.log({ responseCode, results });
    if (responseCode === InAppPurchases.IAPResponseCode.OK) {
      return results;
    } else {
      return [];
    }
  };

  const initIAPandEventListeners = async () => {
    try {
      await InAppPurchases.connectAsync();
    } catch (e) {
      /* already connected, verify error with `e` */
    }

    InAppPurchases.setPurchaseListener(({ responseCode, results, errorCode }) => {
      // Purchase was successful
      if (responseCode === InAppPurchases.IAPResponseCode.OK) {
        results.forEach(async purchase => {
          if (!purchase.acknowledged) {
            await processNewPurchase(purchase);
            InAppPurchases.finishTransactionAsync(purchase, true);
          }
        });

        // handle particular error codes
      } else if (responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED) {
        console.log('User canceled the transaction');
      } else if (responseCode === InAppPurchases.IAPResponseCode.DEFERRED) {
        console.log('User does not have permissions to buy but requested parental approval (iOS only)');
      } else {
        console.warn(`Something went wrong with the purchase. Received errorCode ${errorCode}`);
      }

      // stop processing. This state update should be reflected
      // in your components. E.g. make IAPs accessible again.
      setProcessing(false);
    });
  };

  useEffect(() => {
    initIAPandEventListeners();
  }, []);

  return (
    <IAPContext.Provider
      value={{
        processing: processing,
        setProcessing: setProcessing,
        getProducts: getProducts,
      }}
    >
      <Container>
        <TouchableOpacity>
          <TextVariant variant="bodyRegular" onPress={getProducts}>
            get products
          </TextVariant>
        </TouchableOpacity>
      </Container>
    </IAPContext.Provider>
  );
};
