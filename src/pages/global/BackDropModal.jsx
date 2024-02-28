import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import NewEntry from "../entries/NewEntry";
import EditEntry from "../entries/EditEntry";
import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import CloseIcon from '@mui/icons-material/Close';

//Action type & Component list
const list = {'NEW_ENTRY':<NewEntry/>,'EDIT_ENTRY':<EditEntry/>,'ERROR_MSG':<div>Error page</div>}

export default function BackDropModal() {
    //Theming
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const style = (theme) => ({
        width: 400,
        borderRadius: '12px',
        padding: '16px 32px 24px 32px',
        color: theme.palette.mode === 'light' ? 'black':'',
        backgroundColor: colors.primary[400],
        boxShadow: `0px 2px 24px ${theme.palette.mode === 'dark' ? '#000' : '#383838'}`,
      });
    
  const { isBackdropActive, backdropDetails } = useSelector((state) => state.backdropReducer);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({ type: "SET_BD_STATE_INACTIVE" });
  };
  
  return (
    <div>
      <Backdrop
        sx={{  zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isBackdropActive}
      >
        <Box sx={style}>
            <IconButton onClick={handleClose}><CloseIcon/></IconButton>
            <br/>
            {
                backdropDetails === 'DELETE_ENTRY'? 'Entry Deleted Successfully' : backdropDetails.includes('EDIT_ENTRY')? list['EDIT_ENTRY']:list[backdropDetails]
            }
            
        </Box>
      </Backdrop>
    </div>
  );
}
