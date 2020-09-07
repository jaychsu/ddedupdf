import React from 'react'
import {
  Image,
} from '@react-pdf/renderer'
import {
  isNode,
  isString,
  getExtension,
} from '../helpers'

const fs = isNode() ? require('fs') : null

const XImage = ({
  src,
  ...rest
}) => {
  let source = src

  if (isNode() && isString(src) && src.startsWith('file://')) {
    source = {
      data: fs.readFileSync(`${__dirname}/../${src.slice(7)}`),
      format: getExtension(src),
    }
  }

  if (!source) {
    return null
  }

  return (
    <Image src={source} {...rest} />
  )
}

export default XImage
