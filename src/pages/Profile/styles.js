import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 20px 0 10px;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-top: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 15px;
  height: 42px;
  background: #d44059;
`;
