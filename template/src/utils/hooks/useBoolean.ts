import { useState, Dispatch, SetStateAction } from 'react'

export function useBoolean(
  initialState: boolean
): [boolean, Dispatch<SetStateAction<boolean>>, (c: (p: boolean) => void) => void] {
  const [value, setValue] = useState(initialState)

  const toggleValue = (callback: (prevValue: boolean) => void) =>
    setValue(prevValue => {
      if (callback && typeof callback === 'function') callback(prevValue)
      return !prevValue
    })

  return [value, setValue, toggleValue]
}
