import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    Alert.success('Sucesso!', 'Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    const error = err.response;

    Alert.alert(
      'Erro no login',
      !!error && error.data.error
        ? `Ops! ${error.data.error}`
        : 'Ocorreu um erro, tente novamente'
    );
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@auth/UPDATE_PROFILE_REQUEST', updateProfile)]);
