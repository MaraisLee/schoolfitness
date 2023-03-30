import { atom, DefaultValue, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
};

const { persistAtom } = recoilPersist();

export const accessTokenState = atom<string | null>({
  key: 'accessTokenState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const refreshTokenState = atom<string | null>({
  key: 'refreshTokenState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const authState = selector<AuthState | DefaultValue>({
  key: 'authState',
  get: ({ get }) => {
    const accessToken = get(accessTokenState);
    const refreshToken = get(refreshTokenState);

    return { accessToken, refreshToken };
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(accessTokenState, null);
      set(refreshTokenState, null);
      return;
    }

    const { accessToken, refreshToken } = newValue;

    set(accessTokenState, accessToken);
    set(refreshTokenState, refreshToken);
  },
});
