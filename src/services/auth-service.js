import { jwtDecode } from 'jwt-decode';

const LS_INDEX_TOKEN = `user`;
const ENDPOINT = import.meta.env.VITE_URL_API;

const getUserToken = () => localStorage.getItem(LS_INDEX_TOKEN);

const getUserInfo = () => (getUserToken() ? jwtDecode(getUserToken()) : null);

const authUser = async (payload) => {
  const response = await fetch(`${ENDPOINT}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (response.status === 200) {
    const { token } = await response.json();
    localStorage.setItem(LS_INDEX_TOKEN, token);
    window.location.reload();
  }
  return response.json();
};

const signup = async (payload) => {
  const response = await fetch(`${ENDPOINT}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (response.status === 201) {
    await authUser(payload);
  }
  return response.json();
};

const logout = async () => {
  localStorage.setItem(LS_INDEX_TOKEN, '');
  window.location.reload();
};

export { signup, logout, authUser, getUserInfo, getUserToken };
