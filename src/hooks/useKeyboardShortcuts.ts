import { useEffect } from 'react'

interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  metaKey?: boolean
  callback: () => void
  description?: string
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const {
          key,
          ctrlKey = false,
          shiftKey = false,
          altKey = false,
          metaKey = false,
          callback
        } = shortcut

        if (
          event.key.toLowerCase() === key.toLowerCase() &&
          event.ctrlKey === ctrlKey &&
          event.shiftKey === shiftKey &&
          event.altKey === altKey &&
          event.metaKey === metaKey
        ) {
          event.preventDefault()
          callback()
          break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}

// Helper hook for common shortcuts
export function useGlobalShortcuts() {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'k',
      ctrlKey: true,
      callback: () => {
        // Open command palette
        const searchInput = document.querySelector('[data-search]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        }
      },
      description: 'Open search'
    },
    {
      key: 'n',
      ctrlKey: true,
      callback: () => {
        // Navigate to new/add page
        window.location.href = '/add-assets'
      },
      description: 'New item'
    },
    {
      key: '/',
      callback: () => {
        const searchInput = document.querySelector('[data-search]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        }
      },
      description: 'Focus search'
    }
  ]

  useKeyboardShortcuts(shortcuts)
}