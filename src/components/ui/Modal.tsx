import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils/cn'
import { ModalProps } from '@/types'

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      children,
      isOpen = false,
      onClose,
      size = 'md',
      title,
      showCloseButton = true,
      closeOnBackdropClick = true,
      ...props
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const previousFocusRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
      if (isOpen) {
        // Store the currently focused element
        previousFocusRef.current = document.activeElement as HTMLElement

        // Prevent body scroll
        document.body.style.overflow = 'hidden'

        // Focus the modal
        if (modalRef.current) {
          modalRef.current.focus()
        }
      } else {
        // Restore body scroll
        document.body.style.overflow = ''

        // Restore focus to previous element
        if (previousFocusRef.current) {
          previousFocusRef.current.focus()
        }
      }

      return () => {
        document.body.style.overflow = ''
      }
    }, [isOpen])

    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen) {
          onClose()
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    const handleBackdropClick = (event: React.MouseEvent) => {
      if (event.target === event.currentTarget && closeOnBackdropClick) {
        onClose()
      }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
      // Trap focus within modal
      if (event.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>

        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0]
          const lastElement = focusableElements[focusableElements.length - 1]

          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault()
              lastElement.focus()
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault()
              firstElement.focus()
            }
          }
        }
      }
    }

    if (!isOpen) return null

    const sizeStyles = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl'
    }

    const modalContent = (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
          aria-hidden="true"
        />

        {/* Modal */}
        <div
          ref={modalRef}
          className={cn(
            'relative w-full rounded-lg bg-card shadow-lg animate-scale-in',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            sizeStyles[size],
            'max-h-[90vh] overflow-y-auto scrollbar-thin',
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          tabIndex={-1}
          {...props}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b">
              {title && (
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-card-foreground"
                >
                  {title}
                </h2>
              )}

              {showCloseButton && (
                <button
                  type="button"
                  className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    )

    return createPortal(modalContent, document.body)
  }
)

Modal.displayName = 'Modal'

export { Modal }