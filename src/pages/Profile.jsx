import React from 'react';
import { Avatar, Box, Card, CardContent, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Tooltip, Typography, useTheme } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import InfoIcon from '@mui/icons-material/Info';
import EmailIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { tokens } from '../theme';

function Profile() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = JSON.parse(localStorage.getItem("applicationState")) || {};
  const userProfile = user.profileReducer.userDetails;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Avatar 
            src={userProfile.avatar} 
            sx={{ m: 'auto', width: theme.spacing(15), height: theme.spacing(15), bgcolor: colors.primary[200] }} 
          />
          <Typography variant="h5" sx={{ mt: 2 }}>
            {userProfile.user.userName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            PettyCash Manager - User Profile
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={5} sx={{ p: 2, bgcolor: colors.primary[400] }}>
            <Typography variant="h6" gutterBottom>
              Readable Data
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                <ListItemText primary={`ID: ${userProfile.user._id}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={`Profile created at: ${new Date(userProfile.user.createdAt).toString()}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={`Logged In at: ${new Date(userProfile.iat).toString()}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  
                </ListItemIcon>
                <ListItemText primary={`Session will expire at: ${new Date(userProfile.exp).toString()}`} />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={5} sx={{ p: 2, bgcolor: colors.primary[400] }}>
            <Typography variant="h6" gutterBottom>
              Editable Data
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={`User Name: ${userProfile.user.userName}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary={`Email Address: ${userProfile.user.emailId}`} />
              </ListItem>
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Tooltip title="Edit Feature - To be published soon!" placement="top">
                <span>
                  <IconButton aria-label="edit user" disabled color="primary">
                    
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
