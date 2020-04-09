import React from 'react'
import { Flex, Modal, Space, Typography } from '@ivoryio/kogaio'

interface DropzoneProps {
  fontSize: number
  visible: boolean
}

const Dropzone: React.FC<DropzoneProps> = ({ fontSize, visible }) => (
  <Modal
    animated
    backdropColor='modal-white90'
    border={1}
    borderStyle='dotted'
    position='absolute'
    top={0}
    left={0}
    visible={visible}
  >
    <Flex alignItems='center' bg='white' flexDirection='column'>
      <Space mt={3}>
        <Typography bg='white' fontSize={fontSize} textAlign='center'>
          Drop file(s) in the dropzone...
        </Typography>
      </Space>
    </Flex>
  </Modal>
)

Dropzone.defaultProps = {
  fontSize: 2,
}

export default Dropzone
