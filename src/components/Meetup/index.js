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

export default function Event({ data, onPress }) {
  return (
    <Container>
      <EventImage source={{ uri: data.banner.url }} />

      <Wrapper>
        <EventTitle>{data.title}</EventTitle>
        <Description>
          <Icon name="insert-invitation" size={14} color="#999" />
          <DescriptionText>{data.formattedDate}</DescriptionText>
        </Description>
        <Description>
          <Icon name="place" size={14} color="#999" />
          <DescriptionText>{data.location}</DescriptionText>
        </Description>
        <Description>
          <Icon name="person" size={14} color="#999" />
          <DescriptionText>Organizador: {data.user.name}</DescriptionText>
        </Description>

        {/* {data.subscribed ? (
          <UnsubscribeButton
            onPress={onPress}
            enabled={!data.past && !data.subscribed}
          >
            Cancelar inscrição
          </UnsubscribeButton>
        ) : ( */}
        <SubscribeButton
          onPress={onPress}
          owner={data.owner}
          enabled={!data.past && !data.subscribed && !data.owner}
        >
          {(() => {
            if (data.owner) {
              return 'Você é o organizador do evento';
            }
            if (data.subscribed) {
              return 'Você está inscrito';
            }
            if (data.past) {
              return 'Evento já realizado';
            }
            return 'Realizar inscrição';
          })()}
        </SubscribeButton>
        {/* )} */}
      </Wrapper>
    </Container>
  );
}

Event.defaultProps = {
  onPress: null,
};

Event.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    banner: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    formattedDate: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    past: PropTypes.bool.isRequired,
    subscribed: PropTypes.bool.isRequired,
    owner: PropTypes.bool.isRequired,
  }).isRequired,
  onPress: PropTypes.func,
};
