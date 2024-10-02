import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Slider, { SliderProps } from 'rc-slider';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';

interface Props {
  sliderProps?: SliderProps;
  markList?: any;
  style?: SxProps;
}

// Define the function separately
const SimpleSlider = React.forwardRef<HTMLDivElement, Props>(function SimpleSlider(props, ref) {
  const { markList, sliderProps, style } = props;
  return (
    <Box sx={{ width: "100%", ...style }} ref={ref}>
      <Slider {...sliderProps} marks={markList} />
    </Box>
  );
});

// Set display name for debugging
SimpleSlider.displayName = 'SimpleSlider';

export default memo(SimpleSlider, isEqual);
