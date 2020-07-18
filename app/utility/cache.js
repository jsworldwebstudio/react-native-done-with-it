import { AsyncStorage } from 'react-native';
// import moment from 'moment';
import dayjs from 'dayjs';
import logger from './logger';

const prefix = 'cache';
const expriryInMinutes = 5;

const store = async (key, value) => {
  try {
    const item =  {
      value,
      timestamp: Date.now()
    }
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));  
  } catch (error) {
    // console.log(error);
    logger.log(error);
  };
};

const isExpired = (item) => {
  // const now = moment(Date.now());
  const now = dayjs();
  const storedTime = dayjs(item.timestamp);
  // return now.diff(storedTime, 'minutes') > expriryInMinutes;
  return now.diff(storedTime, 'minute') > expriryInMinutes;
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse (value);

    if (!item) return null;

    if (isExpired(item)) {
      await AsyncStorage.removeItem(prefix + key);
      return null;
    };

    return item.value;

  } catch (error) {
    logger.log(error);
  };
};

export default {
  store,
  get
};