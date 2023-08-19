export const debounce = (timerRef, func, trigerAction, delayTime) => {
  clearTimeout(timerRef.current);
  timerRef.current = setTimeout(() => {
    func(trigerAction);
  }, delayTime);
};
