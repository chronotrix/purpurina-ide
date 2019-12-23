import { remote } from 'electron';
import { UserInfo } from './types';
import * as PathValidation from './utils/pathValidation';
import * as Dialogs from './dialogs';

export function getUserInfo(): UserInfo {
  return remote.getGlobal('userInfo');
}

export {
  PathValidation,
  Dialogs,
};
