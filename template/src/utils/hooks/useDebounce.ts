import { useEffect, useRef } from 'react'

export const useDebounce = (fn = (...args: any[]) => {}, ms = 0, args = []) => {
  useUpdateEffect(() => {
    const handle = setTimeout(() => fn(args), ms)

    return () => {
      clearTimeout(handle)
    }
  }, args)
}

const useUpdateEffect = (effect: (...args: any[]) => any, deps: any) => {
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      return effect()
    }
  }, [deps, effect])
}
