export const alarmIds: string[] = []

export function addAlarm(id: string) {
  if (!alarmIds.includes(id)) alarmIds.push(id)
}

export function removeAlarm(id: string) {
  const i = alarmIds.indexOf(id)
  if (i > -1) alarmIds.splice(i, 1)
}

export function toggleAlarm(id: string) {
  if (isAlarmOn(id)) {
    removeAlarm(id)
    return false
  }

  addAlarm(id)
  return true
}

export function isAlarmOn(id: string): boolean {
  return alarmIds.includes(id)
}