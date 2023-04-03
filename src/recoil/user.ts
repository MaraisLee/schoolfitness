import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userAtom = atom({
  key: 'user',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const userDetailAtom = atom({
  key: 'userDetail',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const userPwAtom = atom({
  key: 'pw',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
