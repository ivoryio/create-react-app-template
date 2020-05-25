import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Container } from '@material-ui/core'

import { Button } from 'app/components'
import { useToast } from 'hooks/useToast'
import { t, i18nKeys } from 'locales/i18n'
import { FormHeader, FormFooter } from '../components'
import { useRequireNewPassword } from '../hooks/userRequireNewPassword'

interface NewPasswordForm {
  password: string
}

export const RequireNewPassword: React.FC = () => {
  const completeNewPassword = useRequireNewPassword()
  const { showToast: showNotification, Toast } = useToast()
  const { control, handleSubmit } = useForm<NewPasswordForm>({
    defaultValues: { password: '' },
  })

  const onSubmit = async ({ password }: NewPasswordForm): Promise<void> => {
    try {
      await completeNewPassword(password)
    } catch (error) {
      const content = t(`auth.requireNewPassword.errors.${error.code}`, {
        defaultValue: error.message,
      })
      showNotification(content, 'error')
    }
  }

  return (
    <form data-testid='forgot-password-send-form' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <FormHeader>{t(i18nKeys.auth.requireNewPassword.header)}</FormHeader>
        <Controller
          variant='outlined'
          margin='normal'
          rules={{ required: true }}
          fullWidth
          name='password'
          label={t(i18nKeys.auth.labels.newPassword)}
          type='password'
          id='password'
          as={TextField}
          autoFocus
          control={control}
        />

        <FormFooter>
          <Button type='submit' fullWidth>
            {t(i18nKeys.auth.requireNewPassword.actions.change)}
          </Button>
        </FormFooter>
      </Container>
      <Toast />
    </form>
  )
}
