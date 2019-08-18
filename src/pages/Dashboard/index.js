import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

// import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import DateChooser from '~/components/DateChooser';
import Meetup from '~/components/Meetup';

import { Container, MeetupsList } from './styles';

const data = [1, 2, 3, 4];

export default function Dashboard() {
  useEffect(() => {});

  return (
    <Background>
      <Header />
      <DateChooser onChange={() => {}} />
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
  <Icon name="format-list-bulleted" size={20} color={tintColor} />
);

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
