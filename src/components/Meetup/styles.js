import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const MeetupImage = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: 4px;
  align-self: center;
`;

export const Wrapper = styled.View`
  padding: 20px;
`;

export const MeetupTitle = styled.Text`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Description = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const DescriptionText = styled.Text`
  color: #999;
  font-size: 13px;
  margin-left: 5px;
`;

export const SubscribeButton = styled(Button)`
  margin-top: 5px;
  background: ${props => (props.owner ? '#333' : ' #f94d6a')};
  opacity: ${props => (props.enabled ? '1' : '0.5')};
`;

export const UnsubscribeButton = styled(Button)`
  margin-top: 5px;
  background: #f94d6a;
  opacity: ${props => (props.enabled ? '1' : '0.5')};
`;
