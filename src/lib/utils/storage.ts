// Local storage utilities with error handling and type safety

export const storage = {
  // Get item from localStorage
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Error getting item from localStorage: ${key}`, error)
      return null
    }
  },

  // Set item in localStorage
  set<T>(key: string, value: T): boolean {
    if (typeof window === 'undefined') return false

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error setting item in localStorage: ${key}`, error)
      return false
    }
  },

  // Remove item from localStorage
  remove(key: string): boolean {
    if (typeof window === 'undefined') return false

    try {
      window.localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing item from localStorage: ${key}`, error)
      return false
    }
  },

  // Clear all localStorage
  clear(): boolean {
    if (typeof window === 'undefined') return false

    try {
      window.localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage', error)
      return false
    }
  },

  // Check if key exists
  exists(key: string): boolean {
    if (typeof window === 'undefined') return false

    try {
      return window.localStorage.getItem(key) !== null
    } catch (error) {
      console.error(`Error checking if key exists in localStorage: ${key}`, error)
      return false
    }
  }
}

// Subscribe to localStorage changes across tabs
export function subscribeToStorageChanges(callback: (key: string, value: any) => void) {
  if (typeof window === 'undefined') return () => {}

  const handler = (e: StorageEvent) => {
    if (e.key && e.newValue !== null) {
      try {
        const value = JSON.parse(e.newValue)
        callback(e.key, value)
      } catch (error) {
        callback(e.key, e.newValue)
      }
    }
  }

  window.addEventListener('storage', handler)
  return () => window.removeEventListener('storage', handler)
}