import { atom } from 'recoil';

// 이름소문자로 시작, 끝에 Atom 붙이기
export const testAtom = atom<string>({
  key: 'test',
  default: '',
});
