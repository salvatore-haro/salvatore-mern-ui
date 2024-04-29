import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';

PostSearch.propTypes = {
  posts: PropTypes.array.isRequired,
  onSearch: PropTypes.func.isRequired,
  helperText: PropTypes.string.isRequired,
};

const MS_TO_TRIGGER_SEARCH = 500;

export default function PostSearch({ posts, onSearch, helperText }) {
  const [timeoutId, setTimeoutId] = useState(null);

  const handleSearchChange = (event) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      onSearch(event.target.value);
    }, MS_TO_TRIGGER_SEARCH);

    setTimeoutId(newTimeoutId);
  };

  return (
    <TextField
      placeholder="Buscar por titulo..."
      variant="outlined"
      sx={{ width: '75%' }}
      onChange={handleSearchChange}
      helperText={helperText}
      FormHelperTextProps={{
        sx: {
          textAlign: 'right',
        },
      }}
    />
  );
}
