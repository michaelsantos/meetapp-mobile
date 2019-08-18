import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const DateChooser = styled.View`
  margin: 20px 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DateChooserButton = styled(RectButton)`
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

export const DateDisplay = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin: 0 20px;
`;

export const MeetupsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    padding: 20,
  },
})`
  flex: 1;
`;

export const ListEmpty = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ListEmptyText = styled.Text`
  color: #fff;
  font-size: 24px;
  margin-top: 20px;
`;
