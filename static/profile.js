const PROFILE_KEY = "__profile";

export function getProfile() {
  let profile = null;
  try {
    profile = JSON.parse(localStorage.getItem(PROFILE_KEY));
  } catch (_err) {}
  return profile;
}

export function saveProfile(profile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (_err) {}
}

export function removeProfile() {
  localStorage.removeItem(PROFILE_KEY);
}
