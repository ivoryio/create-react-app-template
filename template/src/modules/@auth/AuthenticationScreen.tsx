import React from 'react'
import { RouteComponentProps } from '@reach/router'

import { useAuthContext } from './hooks'
import { SignIn, SignUp, ConfirmSignUp, ForgotPassword } from './screens'

export const AuthenticationScreen: React.FC<RouteComponentProps> = () => {
  const { authState } = useAuthContext()

  switch (authState) {
    case 'signUp':
      return <SignUp />
    case 'confirmSignUp':
      return <ConfirmSignUp />
    case 'forgotPassword':
      return <ForgotPassword />
    default:
      return <SignIn />
  }
}
