import { useEffect, useState, useRef } from 'react';
import { registerToastListener, type ToastKind } from '../../utils/toast';

export default function Toast() {
  const [msg, setMsg] = useState<string>('');
  const [kind, setKind] = useState<ToastKind>('');
  const [visible, setVisible] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return registerToastListener((message, toastKind) => {
      setMsg(message);
      setKind(toastKind || '');
      setVisible(true);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setVisible(false);
      }, 2600);
    });
  }, []);

  return (
    <div
      id="toast"
      role="status"
      aria-live="polite"
      className={`${visible ? 'show' : ''} ${kind ? kind : ''}`.trim()}
    >
      {msg}
    </div>
  );
}
