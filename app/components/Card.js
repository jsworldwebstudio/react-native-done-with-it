import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Image, CacheManager } from 'react-native-expo-image-cache';

import colors from '../config/colors';
import AppText from './AppText';

const Card = ({ title, price, imageUrl, onPress, thumbnailUrl }) => {

  // const clearImageCache = async () => {
  //   try {
  //     await CacheManager.clearCache();
  //   } catch (error) {
  //     console.log('Image Cache issue: ', error)
  //   }
  // };

  // useEffect(() => {
  //   clearImageCache();
  // }, []);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        {/* Used RN Image component <Image style={styles.image} source={{ uri: imageUrl }} /> */}
        <Image style={styles.image} preview={{ uri: thumbnailUrl }} tint="light" uri={imageUrl} />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title} numberOfLines={1}>{title}</AppText>
          <AppText style={styles.price} numberOfLines={1}>{price}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: 'hidden'
  },
  detailsContainer: {
    padding: 20
  },
  image: {
    width: '100%',
    height: 200
  },
  price: {
    color: colors.secondary,
    fontWeight: 'bold'
  },
  title: {
    marginBottom: 7
  },
});

export default Card;
