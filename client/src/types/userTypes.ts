// src/types/userTypes.ts

export interface Notification {
  _id: string
  title: string
  message: string
  type: 'INFO' | 'ALERT' | 'TRANSACTION' | 'SECURITY' | 'PROMOTION'
  status: 'UNREAD' | 'READ'
  createdAt?: string
}

export interface Task {
  _id: string
  description?: string
  author: string
  status: 'PENDING' | 'COMPLETED' | 'UNCOMPLETED' | 'MISSED' 
  name: string
  time: string
}


export interface Schedule {
  _id: string
  author: string
  name: string
  description: string
  lastResetDate: Date
  strikes: number
  lockedUntil: Date;
  streaks: number
  tasks: Task[]
}

export interface User {
  _id: string
  name: string
  username: string
  email: string
  password: string
  maxStrikes: number
  schedules: Schedule[]
  storage: number
  strikes: number
  streaks: number
  notifications: Notification[]
  createdAt?: string
  updatedAt?: string
}

export interface GameStats {
  currentStreak: number
  longestStreak: number
  totalCompletedDays: number
  currentStrikes: number
  lastResetDate: string
}

export type AppMode = 'normal' | 'strict'

export interface TimeSlot {
  hour: number
  minute: number
  label: string
}
