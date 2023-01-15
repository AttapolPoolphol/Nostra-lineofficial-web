import React from 'react'
import { Button } from 'antd'
import styled, { css } from 'styled-components'

const CustomButton = styled(Button)`
  font: 'normal normal bold 20px/25px dbhx';
  color: white;
  background-color: #21b081;
  border-color: transparent;
  line-height: 0;

  &:hover,
  &:active,
  &:focus {
    color: white !important;
    background-color: #21bf8b !important;
    border-color: transparent !important;
  }
`

export default CustomButton
