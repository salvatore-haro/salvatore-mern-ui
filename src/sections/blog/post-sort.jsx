import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

PostSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func,
  sortValue: PropTypes.string,
};

export default function PostSort({ options, onSort, sortValue }) {
  return (
    <TextField select size="medium" sx={{margin:'0px 0px 21px 0px', width:'20%'}} value={sortValue} onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
