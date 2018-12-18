export default function fetchingStore(state, emitter) {
  state.fetching = false;

  emitter.on("start-fetching", () => {
    state.fetching = true;
    emitter.emit("render");
  });
  emitter.on("stop-fetching", () => {
    state.fetching = false;
    emitter.emit("render");
  });
}
