import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  EventImage,
  Wrapper,
  EventTitle,
  Description,
  DescriptionText,
  SubscribeButton,
  UnsubscribeButton,
} from './styles';

export default function Event({ data, onSubscribe, onUnsubscribe }) {
  return (
    <Container>
      <EventImage
        source={{
          uri:
            'https://agenciaipub.com.br/wp-content/uploads/2018/03/como-atrair-publico-para-minha-feira-evento-1-1200x600.jpg',
        }}
      />

      <Wrapper>
        <EventTitle>Meetup de React Native</EventTitle>
        <Description>
          <Icon name="insert-invitation" size={14} color="#999" />
          <DescriptionText>24 de Junho, às 20h</DescriptionText>
        </Description>
        <Description>
          <Icon name="place" size={14} color="#999" />
          <DescriptionText>Rua Luiz Bissoto</DescriptionText>
        </Description>
        <Description>
          <Icon name="person" size={14} color="#999" />
          <DescriptionText>Organizador: Michael Santos</DescriptionText>
        </Description>

        <SubscribeButton onPress={onSubscribe} loading={data.loading}>
          Realizar inscrição
        </SubscribeButton>

        {/* {data.subscribed ? (
          <UnsubscribeButton onPress={onUnsubscribe} loading={data.loading}>
            Cancelar inscrição
          </UnsubscribeButton>
        ) : (
          <SubscribeButton onPress={onSubscribe} loading={data.loading}>
            Realizar inscrição
          </SubscribeButton>
        )} */}
      </Wrapper>
    </Container>
  );
}

Event.defaultProps = {
  onSubscribe: null,
  onUnsubscribe: null,
};

Event.propTypes = {
  data: PropTypes.shape().isRequired,
  onSubscribe: PropTypes.func,
  onUnsubscribe: PropTypes.func,
};
