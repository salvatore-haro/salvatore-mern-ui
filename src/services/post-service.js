import { getUserToken } from './auth-service';

const ENDPOINT = `${import.meta.env.VITE_URL_API}/posts`;

const fetchPosts = async (searchParams) => {
  try {
    const token = getUserToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const searchQueryParams = Object.entries(searchParams)
      .filter(([_, value]) => value && value !== '*')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const response = await fetch(`${ENDPOINT}?limit=12&${searchQueryParams}`, { headers });
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
  return [];
};

const createPost = async (payload) => {
  const token = getUserToken();
  return fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

export { fetchPosts, createPost };
