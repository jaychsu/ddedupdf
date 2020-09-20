import React from 'react'
import {
  Text,
  StyleSheet,
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  label: {
    padding: 2,
    paddingLeft: 4,
    margin: 2,
    fontSize: 8,
  },
  border: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 2,
  },
})

const colors = {
  magenta: { text: '#eb2f96', background: '#fff0f6', border: '#ffadd2' },
  red: { text: '#f5222d', background: '#fff1f0', border: '#ffa39e' },
  volcano: { text: '#fa541c', background: '#fff2e8', border: '#ffbb96' },
  orange: { text: '#fa8c16', background: '#fff7e6', border: '#ffd591' },
  gold: { text: '#faad14', background: '#fffbe6', border: '#ffe58f' },
  lime: { text: '#a0d911', background: '#fcffe6', border: '#eaff8f' },
  green: { text: '#52c41a', background: '#f6ffed', border: '#b7eb8f' },
  cyan: { text: '#13c2c2', background: '#e6fffb', border: '#87e8de' },
  blue: { text: '#1890ff', background: '#e6f7ff', border: '#91d5ff' },
  geekblue: { text: '#2f54eb', background: '#f0f5ff', border: '#adc6ff' },
  purple: { text: '#722ed1', background: '#f9f0ff', border: '#d3adf7' },

  qid: { text: '#7f7f7f', background: '#f2f2f2', border: null },
  complex_hard: { text: '#f59a23', background: '#fdf5ea', border: null },
  complex_normal: { text: '#f59a23', background: '#fdf5ea', border: null },
  complex_easy: { text: '#f59a23', background: '#fdf5ea', border: null },
  forecast: { text: '#fa541c', background: null, border: '#ffbb96' },
  frequency: { text: '#f5222d', background: null, border: '#ffa39e' },
}

const Label = ({
  children,
  preset,
  textColor,
  backgroundColor,
  borderColor,
  ...rest
}) => {
  const labelStyle = {
    color: colors[preset].text || textColor,
    backgroundColor: colors[preset].background || backgroundColor,
    borderColor: colors[preset].border || borderColor,
  }
  const style = [styles.label, styles.border]

  if (!labelStyle.color) {
    delete labelStyle.color
  }

  if (!labelStyle.backgroundColor) {
    delete labelStyle.backgroundColor
  }

  if (!labelStyle.borderColor) {
    delete labelStyle.borderColor
    style.pop()
  }

  style.push(labelStyle)

  return (
    <Text style={style} {...rest}>
      { children }
    </Text>
  )
}

export default Label
