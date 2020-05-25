import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Grid, Container } from '@material-ui/core'

import { t, i18nKeys } from 'locales/i18n'
import { useToast } from 'hooks/useToast'

import { useSignIn } from '../hooks'
import { FormHeader, FormFooter, ChangeAuthStateLink } from '../components'

const authKeys = i18nKeys.auth

export interface SignInProps {
  hideSignUpLink?: boolean
  hideForgotPasswordLink?: boolean
}

interface SignInForm {
  email: string
  password: string
}

export const SignIn: React.FC<SignInProps> = ({
  hideSignUpLink = false,
  hideForgotPasswordLink = false,
}: SignInProps) => {
  const signIn = useSignIn('/dashboard')
  const { showToast: showNotification, Toast } = useToast()
  const { control, handleSubmit } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async ({ email, password }: SignInForm): Promise<void> => {
    try {
      await signIn(email, password)
    } catch (error) {
      const content = t(`auth.signIn.errors.${error.code}`, {
        defaultValue: error.message,
      })
      showNotification(content, 'error')
    }
  }

  return (
    <form data-testid='signInForm' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <FormHeader>{t(authKeys.signIn.header)}</FormHeader>
        <Controller
          variant='outlined'
          margin='normal'
          rules={{ required: true }}
          fullWidth
          name='email'
          label={t(authKeys.labels.email)}
          type='email'
          id='email'
          as={TextField}
          control={control}
        />
        <Controller
          variant='outlined'
          margin='normal'
          rules={{ required: true }}
          fullWidth
          name='password'
          label={t(authKeys.labels.password)}
          type='password'
          id='password'
          autoComplete='current-password'
          as={TextField}
          control={control}
        />
        <FormFooter>
          <Button
            type='submit'
            fullWidth
            color='primary'
            variant='contained'
            data-testid='signInSubmit'
          >
            {t(authKeys.signIn.actions.signIn)}
          </Button>
          <Grid container>
            {!hideForgotPasswordLink && (
              <Grid item xs>
                <ChangeAuthStateLink
                  newState='forgotPassword'
                  label={t(authKeys.signIn.actions.forgotPassword)}
                />
              </Grid>
            )}
            {!hideSignUpLink && (
              <Grid item>
                <ChangeAuthStateLink newState='signUp' label={t(authKeys.signIn.actions.signUp)} />
              </Grid>
            )}
          </Grid>
        </FormFooter>
      </Container>
      <Toast />
    </form>
  )
}
