import React, { useMemo } from 'react'

import { Chip, Flex, IconButton, Space, Typography } from '@ivoryio/kogaio'
import { getFileExtension } from '../../../funcs'

interface SelectedFileTagProps {
  file: File
  onDiscard: (file: File) => void
}

const SelectedFileTag: React.FC<SelectedFileTagProps> = ({ file, onDiscard: discardFile, ...props }) => {
  const chipName = useMemo(() => {
    const fileExtension = getFileExtension(file.name.toLowerCase())
    switch (fileExtension) {
      case 'doc':
      case 'docx':
        return 'DOCUMENT'
      case 'pdf':
        return 'PDF'
      default:
        return 'FILE'
    }
  }, [file.name])

  return (
    <Flex alignItems='center' {...props}>
      <Chip bg='alert' fontSize={0} fontFamily='primary' fontWeight='bold' isRounded label={chipName} />
      <Space ml={5} mr={2}>
        <Typography textStyle='underline' variant='paragraph' truncate>
          {file.name}
        </Typography>
      </Space>
      <IconButton
        color='gunmetal'
        effect='opacity'
        fontSize={3}
        name='delete_forever'
        onClick={() => discardFile(file)}
      />
    </Flex>
  )
}

export default SelectedFileTag
