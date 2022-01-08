import { LOGIN_SAGA_LOGIN, LOGIN_SAGA_LOGOUT } from '../../constants';
import { LoginPayloadType } from '../../../../../api/todolists-api';

export const login = (payload: LoginPayloadType) => ({ type: LOGIN_SAGA_LOGIN, payload });
export const logOut = () => ({ type: LOGIN_SAGA_LOGOUT });
