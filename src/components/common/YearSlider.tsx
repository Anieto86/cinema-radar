import { Box, Slider } from '@mui/material';
import React from 'react';

function valuetext(value) {
  return `${value}`;
}

export const YearSlider = () => {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        // color={'#c4c4c4'}
      />
    </Box>
  );
};
