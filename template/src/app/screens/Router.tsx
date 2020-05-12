import React from 'react'
import { Router } from '@reach/router'

import { HomeScreen } from './HomeScreen'

export const AppRouter = () => (
  <Router>
    <HomeScreen default />
  </Router>
)
