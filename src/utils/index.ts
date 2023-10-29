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

export const formatNumber = (str: string) => {
  let replaced = str.replace(/[^.\d]/g, '');
  const dot = replaced.indexOf('.');
  if (dot >= 0) {
    replaced =
      replaced.slice(0, dot) + '.' + replaced.slice(dot).replace(/\./g, '');
  } else if (replaced.length > 1) {
    replaced = replaced.replace(/^0+/g, '');
    if (replaced.length === 0) replaced = '0';
  }
  return replaced;
};
