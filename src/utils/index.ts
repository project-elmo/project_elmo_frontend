export const connectSocket = <T>(
  url: string,
  onMessage: (arg: MessageEvent<T>) => void
) => {
  const socket = new WebSocket(url);

  socket.onopen = () => console.log('socket connected');
  socket.onclose = () => console.log('socket disconnected');
  socket.onmessage = (event) => onMessage(event);

  return socket;
};
