import React from 'react'

import { Flex, Icon, Space, Typography } from '@ivoryio/kogaio'

interface SublabelProps {
  align?: 'flex-start' | 'flex-end'
  className?: string
  color?: string
  children: string
  icon?: string
}

const Sublabel: React.FC<SublabelProps> = ({ align, className, color, children, icon, ...passedProps }) => (
  <Flex alignItems='center' className={className} justifyContent={align} height='12px' width={1} {...passedProps}>
    {icon ? (
      <Space pr={1}>
        <Icon color={color} fontSize={0} name={icon} />
      </Space>
    ) : null}
    <Typography color={color} display='block' fontSize={0}>
      {children}
    </Typography>
  </Flex>
)

Sublabel.defaultProps = {
  align: 'flex-end',
  color: 'error',
  icon: 'error_outline',
}
Sublabel.displayName = 'Sublabel'

export default Sublabel
