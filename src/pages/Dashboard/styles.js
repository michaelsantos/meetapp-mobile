import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 0,
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
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  margin-top: 10px;
`;
