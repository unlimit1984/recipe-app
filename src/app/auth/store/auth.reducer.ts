import { User } from '../user.model';

export interface State {
  user: User;
}

const initialState: State = {
  user: null
};

export function AuthReducer(
  state: State = initialState,
  action
) {
  return state;
}
