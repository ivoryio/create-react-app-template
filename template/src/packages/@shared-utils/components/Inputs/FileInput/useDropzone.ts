import { useEffect, useRef, MutableRefObject } from 'react'
import { useBoolean } from '../../../hooks/useBoolean'

export const useDropzone = (selectFiles: (f: any) => any, dropzoneRef: MutableRefObject<HTMLElement | undefined>) => {
  const [dragging, setDragging] = useBoolean(false)

  const dragCounter = useRef(0)
  useEffect(() => {
    const dropzone = dropzoneRef.current

    if (!dropzone) {
      return
    }

    dropzone.addEventListener('dragenter', handleDragIn, false)
    dropzone.addEventListener('dragleave', handleDragOut, false)
    dropzone.addEventListener('dragover', preventDefaults, false)
    dropzone.addEventListener('drop', handleDrop, false)

    return () => {
      dropzone.removeEventListener('dragenter', handleDragIn, false)
      dropzone.removeEventListener('dragleave', handleDragOut, false)
      dropzone.removeEventListener('dragover', preventDefaults, false)
      dropzone.removeEventListener('drop', handleDrop, false)
    }

    function preventDefaults(ev: Event) {
      ev.preventDefault()
      ev.stopPropagation()
    }

    function handleDrop(ev: DragEvent) {
      preventDefaults(ev)
      setDragging(false)
      const { files } = ev.dataTransfer ?? { files: [] }
      if (files?.length > 0) {
        selectFiles(files)
        dragCounter.current = 0
        ev.dataTransfer?.clearData()
      }
    }
    function handleDragIn(ev: DragEvent) {
      preventDefaults(ev)
      dragCounter.current += 1

      const { items } = ev.dataTransfer ?? { items: [] }
      if (items?.length > 0) setDragging(true)
    }
    function handleDragOut(ev: DragEvent) {
      preventDefaults(ev)
      dragCounter.current -= 1
      if (dragCounter.current === 0) setDragging(false)
    }
  }, [dropzoneRef, selectFiles, setDragging])

  return {
    dragging,
  }
}
