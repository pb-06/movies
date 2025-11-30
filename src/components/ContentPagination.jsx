import React from 'react';
import { Pagination, Stack } from '@mui/material';

export const ContentPagination = ({ page, setPage, numOfPages = 10 }) => {

  const handleChange = (event, value) => {
    setPage(value);
    window.scroll(0, 0);
  };

  if (numOfPages <= 1) return null;

  return (
    <Stack spacing={2} sx={{ mt: 5, alignItems: 'center' }}>
       <Pagination 
            count={numOfPages} 
            page={page} 
            onChange={handleChange} 
            color="primary"
            variant="outlined" 
            shape="rounded"
            size="large"
            sx={{ 
                '& .MuiPaginationItem-root': { color: 'white', borderColor: 'rgba(255,255,255,0.3)' },
                '& .Mui-selected': { backgroundColor: 'rgba(255,255,255,0.2) !important' }
            }}
       />
    </Stack>
  );
}
export default ContentPagination;