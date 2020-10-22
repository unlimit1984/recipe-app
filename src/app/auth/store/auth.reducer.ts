import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null
};

export function AuthReducer(
  state: State = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate);
      return {
        ...state,
        user: user // may be just a user (simplification when the property is the same as a value)
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}
