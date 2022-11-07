import * as LoginActionCreators from './login';
import * as RegActionCreators from './reg';

export const ActionCreators = {
  ...LoginActionCreators, 
  ...RegActionCreators
};
