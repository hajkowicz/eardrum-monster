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
