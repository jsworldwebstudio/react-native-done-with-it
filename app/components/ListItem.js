import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import defaultStyles from '../config/styles';

const ListItem = ({ title, image, listings, ImageComponent, onPress, renderRightActions, showChevrons }) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight
        underlayColor={defaultStyles.colors.light}
        onPress={onPress}
      >
        <View style={styles.container}>
          {ImageComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <AppText style={styles.title} numberOfLines={1}>{title}</AppText>
            {listings && <AppText style={styles.listings} numberOfLines={2}>{listings}</AppText>}
          </View>
          { showChevrons &&
            <MaterialCommunityIcons
              name="chevron-right"
              size={25}
              color={defaultStyles.colors.medium}
            />
          }
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: defaultStyles.colors.white
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  listings: {
    color: defaultStyles.colors.medium
  },
  title: {
    fontWeight: '500'
  }
});

export default ListItem;
