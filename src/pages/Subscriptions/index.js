import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, MeetupsList } from './styles';

const data = [1, 2, 3, 4];

export default function Subscriptions() {
  return (
    <Background>
      <Header />
      <Container>
        <MeetupsList
          data={data}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => <Meetup data={item} />}
        />
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="local-offer" size={20} color={tintColor} />
);

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
