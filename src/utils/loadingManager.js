// A simple event emitter-like pattern to manage loading state outside of React components
let startLoadingCallback = () => {};
let stopLoadingCallback = () => {};

export const loadingManager = {
  register: (start, stop) => {
    startLoadingCallback = start;
    stopLoadingCallback = stop;
  },
  start: () => startLoadingCallback(),
  stop: () => stopLoadingCallback(),
};
