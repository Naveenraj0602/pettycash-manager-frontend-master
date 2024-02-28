import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton } from '@mui/material';

function Back() {
    const navigate = useNavigate();
    return(
        <Box sx={{ flexGrow: 1, p:'10px'}}>
            <IconButton color="primary" aria-label="Back" size='large' onClick={()=>{navigate(-1)}}>
                <ArrowBackIcon sx={{fontSize:'3.5rem'}}/>
            </IconButton>
        </Box>
    );
}

export default Back;