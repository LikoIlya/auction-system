import { getProfile, saveProfile, removeProfile } from "/profile.js";

export default function authStore(state, emitter) {
  syncProfile();

  emitter.on("login", profile => {
    saveProfile(profile);
    syncProfile();
    emitter.emit(state.events.PUSHSTATE, "/");
  });
  emitter.on("logout", () => {
    removeProfile();
    syncProfile();
    emitter.emit(state.events.PUSHSTATE, "/");
  });

  function syncProfile() {
    state.profile = getProfile();
  }
}
