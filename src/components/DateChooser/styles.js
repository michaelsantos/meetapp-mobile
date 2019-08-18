import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 25px 0;
`;

export const GoNextButton = styled.TouchableOpacity`
  margin-left: 15px;
`;

export const GoBackButton = styled.TouchableOpacity`
  margin-right: 15px;
`;

export const DateText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;
