import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useState } from 'react';

export const TypeSelect = () => {
  const [value, setValue] = useState('any');
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">TYPE</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleRadioChange}
      >
        <FormControlLabel value="any" control={<Radio />} label="Any" />
        <FormControlLabel value="movies" control={<Radio />} label="Movies" />
        <FormControlLabel value="series" control={<Radio />} label="Series" />
        <FormControlLabel
          value="episodes"
          control={<Radio />}
          label="Episodes"
        />
      </RadioGroup>
    </FormControl>
  );
};
