import * as React from 'react'
import { Grid, Container } from '@material-ui/core'
import { useForm } from 'react-hook-form'

import { t, i18nKeys } from 'locales/i18n'
import { useToast } from 'hooks/useToast'

import { Button, Input } from 'app/components'
import { useConfirmSignIn } from '../hooks'
import { FormHeader, FormFooter, ChangeAuthStateLink } from '../components'

const authKeys = i18nKeys.auth

interface ConfirmSignInForm {
  code: string
}

export const ConfirmSignIn: React.FC = () => {
  const { control, handleSubmit } = useForm<ConfirmSignInForm>({
    defaultValues: {
      code: '',
    },
  })
  const { showToast: showNotification, Toast } = useToast()
  const { confirm } = useConfirmSignIn()

  const onSubmit = async ({ code }: ConfirmSignInForm): Promise<void> => {
    try {
      await confirm(code)
    } catch (error) {
      const content = t(`auth.confirmSignIn.errors.${error.code}`, {
        defaultValue: error.message,
      })
      showNotification(content, 'error')
    }
  }

  return (
    <form data-testid='confirmSignInForm' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <FormHeader data-testid='confirm-sign-in-form-header'>
          {t(authKeys.confirmSignIn.header)}
        </FormHeader>
        <Input
          dataTestId='confirm-sign-in-code-input'
          rules={{ required: true }}
          name='code'
          label={t(authKeys.labels.confirmationCode)}
          autoComplete='code'
          control={control}
        />
        <FormFooter>
          <Button data-testid='confirm-sign-in-btn' type='submit' fullWidth>
            {t(authKeys.confirmSignIn.actions.confirm)}
          </Button>
          <Grid container>
            <Grid item>
              <ChangeAuthStateLink
                label={t(authKeys.confirmSignIn.actions.backToSignIn)}
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
