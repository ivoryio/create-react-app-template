import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { t, i18nKeys } from 'utils/i18n'

export const HomeScreen: React.FC<RouteComponentProps> = () => {
  const project = 'Ivory template'

  return (
    <div>
      <strong>{t(i18nKeys.home.hello)}</strong>
      <div>{t(i18nKeys.home.introduction, { replace: { project } })}</div>
      <div>{t(i18nKeys.home.topFeature, { count: 1 })}</div>
      <button>{t(i18nKeys.general.showToast)}</button>
    </div>
  )
}
