import type { User, SongEvent } from "./Types";

export function getActiveListeners(users: User[]): User[] {
  return users.filter((user) => {
    if (user == null) {
      return false;
    }
    const isOnline =
      Math.floor(Date.now() / 1000) - (user?.latestListenPing ?? 0) < 30;
    return isOnline;
  }) as User[];
}

export function isUserOnline(user: User): boolean {
  if (user == null) {
    return false;
  }
  const latestSongEvent = user.latestSongEvent ?? 0;
  return Math.floor(Date.now() / 1000) - latestSongEvent < 30;
}

export function isUserListening(user: User): boolean {
  if (user == null) {
    return false;
  }
  const hasRecentPing =
    Math.floor(Date.now() / 1000) - (user.latestListenPing ?? 0) < 30;
  return hasRecentPing;
}

export function isOnline(songEvents: SongEvent[]): boolean {
  const mostRecentSongEvent = songEvents && songEvents[0];
  if (mostRecentSongEvent == null) {
    return false;
  }
  const isOnline =
    Math.floor(Date.now() / 1000) - mostRecentSongEvent.timestamp <
    (mostRecentSongEvent.track?.durationMs ?? 0) / 1000 + 60;
  return isOnline;
}

export function getListenerCount(user: User) {
  return (
    (user?.listeners?.items ?? []).filter((listener) => {
      if (listener == null) {
        return false;
      }
      return isUserListening(listener as User);
    }).length + 1
  );
}

export function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

export function hasTouchScreen() {
  let hasTouchScreen = false;
  const nav = window.navigator as any;
  if ("maxTouchPoints" in nav) {
    hasTouchScreen = nav.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in nav) {
    hasTouchScreen = nav.msMaxTouchPoints > 0;
  } else {
    var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
      hasTouchScreen = !!mQ.matches;
    } else if ("orientation" in window) {
      hasTouchScreen = true; // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      var UA = nav.userAgent;
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    }
  }
  return hasTouchScreen;
}
