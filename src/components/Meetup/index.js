import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  MeetupImage,
  Wrapper,
  MeetupTitle,
  Description,
  DescriptionText,
  SubscribeButton,
  UnsubscribeButton,
} from './styles';

export default function Meetup({ data, loading, onSubscribe, onUnsubscribe }) {
  return (
    <Container>
      <MeetupImage source={{ uri: data.banner.url }} />

      <Wrapper>
        <MeetupTitle>{data.title}</MeetupTitle>
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

        {data.subscribed ? (
          <UnsubscribeButton
            onPress={onUnsubscribe}
            enabled={!data.past}
            loading={loading}
          >
            {(() => {
              if (data.past) {
                return 'Inscrito';
              }
              return 'Cancelar inscrição';
            })()}
          </UnsubscribeButton>
        ) : (
          <SubscribeButton
            onPress={onSubscribe}
            owner={data.owner}
            enabled={!data.past && !data.owner}
            loading={loading}
          >
            {(() => {
              if (data.owner) {
                return 'Você é o organizador do evento';
              }
              if (data.past) {
                return 'Evento já realizado';
              }
              return 'Realizar inscrição';
            })()}
          </SubscribeButton>
        )}
      </Wrapper>
    </Container>
  );
}

Meetup.defaultProps = {
  onSubscribe: null,
  onUnsubscribe: null,
};

Meetup.propTypes = {
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
  loading: PropTypes.bool.isRequired,
  onSubscribe: PropTypes.func,
  onUnsubscribe: PropTypes.func,
};
