import React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

function valuetext(value) {
  return `${value}`
}

export default function RangeSlider() {
  const [value, setValue] = React.useState([100, 500000000])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Profit range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  )
}
