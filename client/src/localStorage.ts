import { User } from "../../server/types/user";
import { Page, defaultPage } from "./App";

const LocalStoragePage: string = "page";
const localStorageUser: string = "user";
const localStorageToken: string = "token";

export const getPageLS = (): Page => {
  const p = window.localStorage.getItem(LocalStoragePage);
  if (p) {
    return p as Page;
  } else {
    return defaultPage;
  }
};

export const setPageLS = (p: Page): void => {
  window.localStorage.setItem(LocalStoragePage, p);
};

export const getUserLS = (): User => {
  const u = window.localStorage.getItem(localStorageUser);
  if (u) {
    return JSON.parse(u) as User;
  } else {
    return { username: "guest" };
  }
};

export const getTokenLS = (): string => {
  const t = window.localStorage.getItem(localStorageToken);
  if (t) {
    return t;
  } else {
    return "";
  }
};

export const setUserAndTokenLS = ({
  user,
  token,
}: {
  user: User;
  token: string;
}): void => {
  window.localStorage.setItem(localStorageUser, JSON.stringify(user));
  window.localStorage.setItem(localStorageToken, token);
};
