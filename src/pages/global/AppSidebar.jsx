import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { Box, IconButton, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const list = [
  {
    component: "Profile",
    path: "/profile",
    children: "",
    icon: <ManageAccountsIcon />,
  },
  
  {
    component: "Manage Entries",
    path: "/",
    children: "",
    icon: <DriveFolderUploadIcon />,
  },
  {
    component: "Dashboard",
    path: "/dashboard",
    children: "",
    icon: <SpaceDashboardIcon />,
  },
     

];

const AppSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { collapseSidebar, collapsed } = useProSidebar();
  return (
    <Sidebar
      className="pro-sidebar"
      width="185px"
      collapsedWidth="70px"
      backgroundColor={colors.primary[400]}
      rootStyles={{ border: "none"}}
    >
      <Menu
        menuItemStyles={{
          button: ({ active, disabled }) => {
            return {
              backgroundColor: active
                ? colors.primary[300]
                : colors.primary[400],
              "&:hover": {
                backgroundColor: colors.primary[300],
              },
            };
          },
        }}
      >
        <MenuItem
          rootStyles={{
            fontWeight: "bolder",
            fontSize: "larger",
          }}
          key="logo-png"
        >
          <br />
          <Box sx={{ textAlign: "center" }}>
            <IconButton
              onClick={() => {
                collapseSidebar();
              }}
            >
              {collapsed ? <ArrowForwardIcon /> : <ArrowBackIcon />}
            </IconButton>
          </Box>
          <br />
        </MenuItem>
        {list.map((item) => {
          return (
            <>
              {item.children !== "" ? (
                <SubMenu
                  icon={item.icon}
                  label={item.component}
                  key={item.component}
                >
                  {item.children.map((child) => (
                    <MenuItem icon={child.icon} key={child.component} component={<Link to={child.path} />}>
                      {child.component}
                    </MenuItem>
                  ))}
                </SubMenu>
              ) : (
                <MenuItem
                  icon={item.icon}
                  key={item.component}
                  component={<Link to={item.path} />}
                  
                >
                 {item.component}
                </MenuItem>
              )}
            </>
          );
        })}
      </Menu>
    </Sidebar>
  );
};

export default AppSidebar;
