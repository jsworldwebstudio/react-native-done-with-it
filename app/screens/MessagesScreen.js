import React, { useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import ListItemSeparator from '../components/ListItemSeparator';
import ListItemDeleteAction from '../components/ListItemDeleteAction';

const initialMessages = [
  {
    id: 1,
    title: 'T1',
    description: 'D1',
    image: require('../assets/james.jpg')
  },
  {
    id: 2,
    title: 'T2',
    description: 'D2',
    image: require('../assets/james.jpg')
  },
  {
    id: 3,
    title: 'T3',
    description: 'D3',
    image: require('../assets/james.jpg')
  },
  {
    id: 4,
    title: 'T4',
    description: 'D4',
    image: require('../assets/james.jpg')
  },
  {
    id: 5,
    title: 'T5',
    description: 'D5',
    image: require('../assets/james.jpg')
  }
];

const MessagesScreen = (props) => {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = message => {
    const newMessages = messages.filter(msg => msg.id !== message.id);
    setMessages(newMessages);
    //Delete the message from the server
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={message => message.id.toString()}
        renderItem={({ item }) =>
          <ListItem
            title={item.title}
            listings={item.description}
            image={item.image}
            onPress={() => console.log('Message selected', item)}
            renderRightActions={() =>
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            }
            showChevrons
          />
        }
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => setMessages(initialMessages) }
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
});

export default MessagesScreen;
