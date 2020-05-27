import * as React from 'react'
import { Grid, TextField, Container } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'

import { t, i18nKeys } from 'locales/i18n'
import { useToast } from 'hooks/useToast'

import { Button } from 'app/components'
import { useConfirmSignUp } from '../hooks'
import { FormHeader, FormFooter, ChangeAuthStateLink } from '../components'

const authKeys = i18nKeys.auth

interface ConfirmSignUpForm {
  code: string
}

export const ConfirmSignUp: React.FC = () => {
  const { control, handleSubmit } = useForm<ConfirmSignUpForm>({
    defaultValues: {
      code: '',
    },
  })
  const { showToast: showNotification, Toast } = useToast()
  const { confirm, resend } = useConfirmSignUp()

  const onSubmit = async ({ code }: ConfirmSignUpForm): Promise<void> => {
    try {
      await confirm(code)
    } catch (error) {
      const content = t(`auth.confirmSignUp.errors.${error.code}`, {
        defaultValue: error.message,
      })
      showNotification(content, 'error')
    }
  }

  return (
    <form data-testid='confirmSignUpForm' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <FormHeader data-testid='confirm-sign-up-form-header'>{t(authKeys.confirmSignUp.header)}</FormHeader>
        <Controller
          data-testid='confirm-sign-up-code-input'
          variant='outlined'
          margin='normal'
          rules={{ required: true }}
          fullWidth
          name='code'
          label={t(authKeys.labels.confirmationCode)}
          id='code'
          autoComplete='code'
          autoFocus
          as={TextField}
          control={control}
        />

        <FormFooter>
          <Button data-testid='confirm-sign-up-btn' type='submit' fullWidth>
            {t(authKeys.confirmSignUp.actions.confirm)}
          </Button>
          <Grid container>
            <Grid item xs>
              <span onClick={resend}>{t(authKeys.confirmSignUp.actions.resend)}</span>
            </Grid>
            <Grid item>
              <ChangeAuthStateLink
                label={t(authKeys.confirmSignUp.actions.backToSignIn)}
                newState='signIn'
              />
            </Grid>
          </Grid>
        </FormFooter>
      </Container>
      <Toast />
    </form>
  )
}
