import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import Card from '../components/Card';
import colors from '../config/colors';
import listingsApi from '../api/listings';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import ActivityIndicator from '../components/ActivityIndicator';
import useApi from '../hooks/useApi';

// const listings = [
//   {
//     id: 1,
//     title: 'Red jacket for sale',
//     price: 100,
//     image: require('../assets/jacket.jpg')
//   },
//   {
//     id: 2,
//     title: 'Couch in great condition',
//     price: 1000,
//     image: require('../assets/couch.jpg')
//   }
// ];

const ListingsScreen = ({ navigation }) => {
  const { data: listings, error, loading, request: loadListings } = useApi(listingsApi.getListings);

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <Screen style={styles.screen}>
      {error && <>
        <AppText>Couldn't retrieve the listings from the server.</AppText>
        <AppButton title="Retry" onPress={loadListings} />
      </>}
      <ActivityIndicator visible={loading} />
      <FlatList
        data={listings}
        keyExtractor={listing => listing.id.toString()}
        renderItem={({ item }) =>
          <Card
            title={item.title}
            price={"$" + item.price}
            imageUrl={item.images[0].url}
            onPress={() => navigation.navigate("ListingDetails", item) }
            // onPress={() => navigation.navigate(routes.LISTING_DETAILS, item) }
          />
        }
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light
  }
});

export default ListingsScreen;
