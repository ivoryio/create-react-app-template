import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Button } from '@ivoryio/kogaio'

export const Info: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <ul>
        <li>
          <strong>Make sure the phone is leveled.</strong>
          If the level is not right the "TAKE A PICTURE" button will not be available.
        </li>
        <li>
          <strong>Please take the pictures with a clean background.</strong>
          Uniform colors work better.
        </li>
        <li>
          <strong>Wear close fitting clothes.</strong>
          It is best if the color of your clothes has a strong contrast with the background.
        </li>
        <li>
          <strong>Show your neck and shoulders.</strong>
          Do not cover you neck and shoulders with hair.
        </li>
        <li>
          <strong>Keep your pose and position unchanged.</strong>
          Try to stay as still as possible
        </li>
      </ul>
      <Button>Hello</Button>
    </div>
  )
}
