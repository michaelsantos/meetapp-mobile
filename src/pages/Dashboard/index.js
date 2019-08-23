import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { Alert, ActivityIndicator } from 'react-native';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import DateChooser from '~/components/DateChooser';
import Meetup from '~/components/Meetup';

import { Container, MeetupList, ListEmpty, ListEmptyText } from './styles';

function Dashboard({ isFocused }) {
  const [loading, setLoading] = useState(false);
  const [loadingHandle, setLoadingHandle] = useState(false);
  const [page, setPage] = useState(1);
  const [endList, setEndList] = useState(false);
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  const user = useSelector(state => state.user.profile);

  async function loadMeetups() {
    try {
      if (loading || endList) return;

      setLoading(true);

      const response = await api.get('meetups', {
        params: {
          date,
          page,
        },
      });

      const data = response.data.map(meetup => ({
        ...meetup,
        subscribed: !!meetup.subscription.find(
          subscription => subscription.user_id === user.id
        ),
        owner: user.id === meetup.user_id,
        formattedDate: format(
          parseISO(meetup.date),
          "dd 'de' MMMM', às' H'h'",
          {
            locale: pt,
          }
        ),
      }));

      const totalItems = await response.headers['x-total-count'];
      const totalPages = Math.floor(totalItems / 2);

      setLoading(false);
      if (page === totalPages || totalItems < 2) {
        setEndList(true);
      } else {
        setEndList(false);
      }
      setMeetups([...meetups, ...data]);
      setPage(page + 1);
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

  useEffect(() => {
    loadMeetups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, isFocused]);

  async function handleSubscribe(id) {
    try {
      setLoadingHandle(true);

      await api.post(`meetups/${id}/subscriptions`);

      setMeetups(
        meetups.map(meetup => {
          if (meetup.id === id) {
            return { ...meetup, subscribed: true };
          }
          return meetup;
        })
      );

      Alert.alert('Meetup', 'Inscrição efetuada com sucesso!');
    } catch (err) {
      const error = err.response;

      Alert.alert(
        'Erro ao se inscrever',
        !!error && error.data.error
          ? `Ops! ${error.data.error}`
          : 'Ocorreu um erro, tente novamente'
      );
    } finally {
      setLoadingHandle(false);
    }
  }

  async function handleUnsubscribe(id) {
    try {
      setLoadingHandle(true);

      await api.delete(`meetups/${id}/subscriptions`);

      setMeetups(
        meetups.map(meetup => {
          if (meetup.id === id) {
            return { ...meetup, subscribed: false };
          }
          return meetup;
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

  function handleDateChange(selectedDate) {
    setMeetups([]);
    setEndList(false);
    setPage(1);
    setDate(selectedDate);
  }

  return (
    <Background>
      <Header />
      <DateChooser onChange={handleDateChange} />
      <Container>
        <MeetupList
          data={meetups}
          keyExtractor={item => String(item.id)}
          onEndReachedThreshold={0.1}
          onEndReached={() => loadMeetups()}
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
                <Icon
                  name="sentiment-dissatisfied"
                  size={80}
                  color="rgba(255, 255, 255, 0.5)"
                />
                <ListEmptyText>Nenhum evento para este dia</ListEmptyText>
              </ListEmpty>
            )
          }
          renderItem={({ item }) => (
            <Meetup
              data={item}
              loading={loadingHandle}
              onSubscribe={() => {
                handleSubscribe(item.id);
              }}
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
  <Icon name="format-list-bulleted" size={20} color={tintColor} />
);

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default withNavigationFocus(Dashboard);
