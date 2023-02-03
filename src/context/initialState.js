import { fetchUser } from "../utils/fetchLocalStorage.js";

const userInfo = fetchUser();

export const initialState = {
  user: userInfo,
};
