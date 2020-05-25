import * as React from 'react'
import { Button, Grid, TextField, Container } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'

import { t, i18nKeys } from 'locales/i18n'
import { useToast } from 'hooks/useToast'

import { useSignUp } from '../hooks'
import { FormHeader, FormFooter, ChangeAuthStateLink } from '../components'

const authKeys = i18nKeys.auth

interface SignUpForm {
  email: string
  password: string
}

export const SignUp: React.FC = () => {
  const signUp = useSignUp()
  const { control, handleSubmit } = useForm<SignUpForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { showToast: showNotification, Toast } = useToast()

  const onSubmit = async ({ email, password }: SignUpForm): Promise<void> => {
    try {
      await signUp(email, password)
    } catch (error) {
      const content = t(`auth.signUp.errors.${error.code}`, {
        defaultValue: error.message,
      })
      showNotification(content, 'error')
    }
  }

  return (
    <form data-testid='signUpForm' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <FormHeader>{t(authKeys.signUp.header)}</FormHeader>
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
          <Button type='submit' fullWidth variant='contained' color='primary'>
            {t(authKeys.signUp.actions.create)}
          </Button>
          <Grid container>
            <Grid item xs>
              {t(authKeys.signUp.existingAccount)}{' '}
              <ChangeAuthStateLink label={t(authKeys.signUp.actions.signIn)} newState='signIn' />
            </Grid>
          </Grid>
        </FormFooter>
      </Container>
      <Toast />
    </form>
  )
}
