export const favoriteIds: string[] = []
export const followedActors: string[] = []

export function isFavorite(id: string) {
  return favoriteIds.includes(id)
}

export function toggleFavorite(id: string) {
  if (isFavorite(id)) {
    const index = favoriteIds.indexOf(id)
    if (index >= 0) favoriteIds.splice(index, 1)
    return false
  }

  favoriteIds.push(id)
  return true
}

export function isActorFollowed(id: string) {
  return followedActors.includes(id)
}

export function toggleFollowActor(id: string) {
  if (isActorFollowed(id)) {
    const index = followedActors.indexOf(id)
    if (index >= 0) followedActors.splice(index, 1)
    return false
  }

  followedActors.push(id)
  return true
}