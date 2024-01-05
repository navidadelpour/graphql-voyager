import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect, useRef, useState } from 'react';

import { useFocusInputWithHotkey } from '../../utils/useFocusInputWithHotkey';

interface SearchBoxProps {
  placeholder: string;
  value: string | null;
  onSearch: (value: string) => void;
}

const SEARCH_FOCUS_KEY = '/';

export default function SearchBox(props: SearchBoxProps) {
  const [value, setValue] = useState(props.value ?? '');
  const { placeholder, onSearch } = props;

  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    const timeout = setTimeout(() => onSearch(value), 200);
    return () => clearTimeout(timeout);
  }, [onSearch, value]);

  useFocusInputWithHotkey(inputRef.current, SEARCH_FOCUS_KEY);

  return (
    <Box paddingLeft={2} paddingRight={2}>
      <Input
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        inputRef={inputRef}
        type="text"
        className="search-box"
        endAdornment={
          value && (
            <InputAdornment position="end">
              <IconButton onClick={() => setValue('')}>
                <CloseIcon fontSize="small" opacity={0.8} />
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </Box>
  );
}
