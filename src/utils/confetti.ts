type ConfettiTrigger = (x: number, y: number) => void;

let triggerFn: ConfettiTrigger | null = null;

export function registerConfettiTrigger(fn: ConfettiTrigger) {
  triggerFn = fn;
  return () => {
    if (triggerFn === fn) {
      triggerFn = null;
    }
  };
}

export function triggerConfetti(x: number, y: number) {
  if (triggerFn) {
    triggerFn(x, y);
  }
}
