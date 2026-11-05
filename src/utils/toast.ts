export type ToastKind = 'ok' | 'err' | '';

type ToastListener = (msg: string, kind?: ToastKind) => void;

let currentListener: ToastListener | null = null;

export function registerToastListener(listener: ToastListener) {
  currentListener = listener;
  return () => {
    if (currentListener === listener) {
      currentListener = null;
    }
  };
}

export function showToast(msg: string, kind?: ToastKind) {
  if (currentListener) {
    currentListener(msg, kind);
  }
}
