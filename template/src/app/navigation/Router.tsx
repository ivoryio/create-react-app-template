import React from 'react'
import { Router } from '@reach/router'
import { Info } from 'app/screens/Info'

export const AppRouter = () => (
  <Router>
    <Info default />
  </Router>
)
