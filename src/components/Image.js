import React from 'react'
import {
  Image,
} from '@react-pdf/renderer'
import {
  isNode,
  getExtension,
} from '../helpers'

const fs = isNode() ? require('fs') : null

const XImage = ({
  src,
  ...rest
}) => {
  let source = src

  if (isNode() && src.startsWith('file://')) {
    source = {
      data: fs.readFileSync(`${__dirname}/../${src.slice(7)}`),
      format: getExtension(src),
    }
  }

  return (
    <Image src={source} {...rest} />
  )
}

export default XImage
