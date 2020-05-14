import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from '@reach/router'

import { Button } from 'app/components'
import { t, i18nKeys } from 'locales/i18n'
import { useToast } from 'hooks/useToast'

export const HomeScreen: React.FC<RouteComponentProps> = () => {
  const project = 'Ivory template'

  const { showToast, Toast } = useToast()

  return (
    <Container>
      <strong>{t(i18nKeys.home.hello)}</strong>
      <div>{t(i18nKeys.home.introduction, { replace: { project } })}</div>
      <div>{t(i18nKeys.home.topFeature, { count: 1 })}</div>
      * UI, components and theming
      <br />* i18n
      <Button onClick={() => showToast(t(i18nKeys.general.infoToast))}>{t(i18nKeys.general.showToast)}</Button>
      <Toast />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
