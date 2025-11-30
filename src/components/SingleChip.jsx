import React from 'react';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const SingleChip = ({ label, selected, onToggle }) => {
    return (
        <Chip
            label={label}
            onClick={onToggle}
            clickable
            color={selected ? "secondary" : "default"}
            variant={selected ? "filled" : "outlined"}
            icon={selected ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
            sx={{
                color: 'white',
                borderColor: 'white',
                '& .MuiChip-icon': { color: 'inherit' }
            }}
        />
    );
};

export default SingleChip;