export function getCurrentTime(): string {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}

export function isTaskOverdue(taskTime: string, currentTime: string): boolean {
  const [taskHour, taskMinute] = taskTime.split(':').map(Number)
  const [currentHour, currentMinute] = currentTime.split(':').map(Number)

  const taskMinutes = taskHour * 60 + taskMinute
  const currentMinutes = currentHour * 60 + currentMinute

  return currentMinutes > taskMinutes
}

export function formatTime(time: string): string {
  const [hour, minute] = time.split(':').map(Number)
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`
}

export function getTimeStatus(
  taskTime: string,
  currentTime: string,
  completed: boolean,
): 'upcoming' | 'current' | 'overdue' | 'completed' {
  if (completed) return 'completed'

  const [taskHour, taskMinute] = taskTime.split(':').map(Number)
  const [currentHour, currentMinute] = currentTime.split(':').map(Number)

  const taskMinutes = taskHour * 60 + taskMinute
  const currentMinutes = currentHour * 60 + currentMinute

  if (currentMinutes < taskMinutes - 15) return 'upcoming'
  if (currentMinutes <= taskMinutes + 15) return 'current'
  return 'overdue'
}
