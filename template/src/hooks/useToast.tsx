import React, { useState } from 'react'
import { Toast as ToastComponent, ToastProps } from 'app/components/Toast'

interface ToastState {
  isOpen: boolean
  message?: string
  variant?: ToastProps['variant']
}

export const useToast = (delay = 4000, onClose?: ToastProps['onClose']) => {
  const [{ isOpen, variant, message }, setProps] = useState<ToastState>({ isOpen: false })

  const showToast = (message: string, variant?: ToastProps['variant']) => {
    setProps({ message, variant, isOpen: true })
  }

  const _onClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setProps({ isOpen: false })

    if (typeof onClose === 'function') onClose(event, reason)
  }

  const Toast = (props: Pick<ToastProps, 'action' | 'anchorOrigin' | 'className'>) => (
    <ToastComponent {...props} content={message!} variant={variant} onClose={_onClose} isOpen={isOpen} />
  )

  return {
    showToast,
    Toast,
  }
}
