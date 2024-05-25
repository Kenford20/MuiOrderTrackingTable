function debounce<T = unknown, R = void>(
  callback: (...args: string[]) => R,
  wait: number,
  context?: T,
  immediate?: boolean
) {
  let timeout: ReturnType<typeof setTimeout> | null;

  return (...args: string[]) => {
    const later = () => {
      timeout = null;

      if (!immediate) {
        callback.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;

    if (typeof timeout === "number") {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);

    if (callNow) {
      callback.apply(context, args);
    }
  };
}

export { debounce };
