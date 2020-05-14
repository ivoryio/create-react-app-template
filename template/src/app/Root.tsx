import React from 'react'
import { ThemeProvider } from 'styled-components'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'

import { theme } from './assets/theme'
import { AppRouter } from './screens/Router'

export const Root = () => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  </MuiThemeProvider>
)
