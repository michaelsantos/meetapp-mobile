import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { Alert, ActivityIndicator } from 'react-native';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, MeetupList, ListEmpty, ListEmptyText } from './styles';

function Subscriptions({ isFocused }) {
  const [loading, setLoading] = useState(false);
  const [loadingHandle, setLoadingHandle] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [meetups, setMeetups] = useState([]);

  async function loadMeetups() {
    try {
      if (loading) return;

      setLoading(true);

      const response = await api.get('subscriptions');

      const data = response.data.map(subscriptions => ({
        ...subscriptions.meetup,
        subscribed: true,
        owner: false,
        formattedDate: format(
          parseISO(subscriptions.meetup.date),
          "dd 'de' MMMM', às' H'h'",
          {
            locale: pt,
          }
        ),
      }));

      setLoading(false);
      setMeetups(data);
    } catch (err) {
      const error = err.response;

      Alert.alert(
        'Erro ao carregar',
        !!error && error.data.error
          ? `Ops! ${error.data.error}`
          : 'Ocorreu um erro, tente novamente'
      );
    }
  }

  async function refreshList() {
    setRefreshing(true);

    await loadMeetups();

    setRefreshing(false);
  }

  useEffect(() => {
    loadMeetups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  async function handleUnsubscribe(id) {
    try {
      setLoadingHandle(true);

      await api.delete(`meetups/${id}/subscriptions`);

      setMeetups(
        meetups.filter(meetup => {
          return meetup.id !== id;
        })
      );

      Alert.alert('Meetup', 'Cancelamento efetuado com sucesso!');
    } catch (err) {
      const error = err.response;

      Alert.alert(
        'Erro ao cancelar inscrição',
        !!error && error.data.error
          ? `Ops! ${error.data.error}`
          : 'Ocorreu um erro, tente novamente'
      );
    } finally {
      setLoadingHandle(false);
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <MeetupList
          data={meetups}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          onRefresh={refreshList}
          refreshing={refreshing}
          ListFooterComponent={
            loading && (
              <ActivityIndicator
                size="large"
                color="rgba(255, 255, 255, 0.5)"
              />
            )
          }
          ListEmptyComponent={() =>
            !loading && (
              <ListEmpty>
                <Icon name="today" size={80} color="rgba(255, 255, 255, 0.5)" />
                <ListEmptyText>Inscrito em nenhum evento próximo</ListEmptyText>
              </ListEmpty>
            )
          }
          renderItem={({ item }) => (
            <Meetup
              data={item}
              loading={loadingHandle}
              onUnsubscribe={() => {
                handleUnsubscribe(item.id);
              }}
            />
          )}
        />
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="local-offer" size={20} color={tintColor} />
);

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default withNavigationFocus(Subscriptions);
