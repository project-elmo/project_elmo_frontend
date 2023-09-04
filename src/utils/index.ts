export const connectSocket = (
  url: string,
  onMessage: (data: string) => void
) => {
  const socket = new WebSocket(url);

  socket.onopen = () => console.log('socket connected');
  socket.onclose = () => console.log('socket disconnected');
  socket.onmessage = (event) => onMessage(event.data);

  return socket;
};

export const getLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  return JSON.parse(item);
};

export const setLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
