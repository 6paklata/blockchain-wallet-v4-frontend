import React from 'react'
import styled from 'styled-components'

import { FlatLoader } from 'blockchain-info-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid ${prop => prop.theme['gray-2']};
`

export default (props) => {
  return (
    <Wrapper>
      <FlatLoader width='100px' height='100px' />
    </Wrapper>
  )
}
