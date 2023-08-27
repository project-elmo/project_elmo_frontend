import { useEffect, useRef, useState } from 'react';

export default function useWebSocket(url: string): [boolean, null, () => void] {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [data, setData] = useState(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => console.log('socket connected');
    socket.onclose = () => console.log('socket disconnected');
    socket.onmessage = (event) => setData(event.data);

    ws.current = socket;

    return () => {
      if (!isReady) return;
      closeSocket();
    };
  }, []);

  useEffect(() => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      setIsReady(true);
    }
  }, [ws.current?.readyState]);

  const closeSocket = () => {
    if (!isReady) return;
    ws.current?.send('socket_close');
    ws.current?.close();
  };

  return [isReady, data, closeSocket];
}
