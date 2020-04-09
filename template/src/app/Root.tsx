import React from 'react'
import { ThemeProvider } from 'styled-components'
import './assets/global.css'

import { theme } from './assets/theme'
import { AppRouter } from './navigation/Router'

export const Root = () => (
  <ThemeProvider theme={theme}>
    <AppRouter />
  </ThemeProvider>
)
