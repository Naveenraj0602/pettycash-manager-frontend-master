// eslint-disable-next-line
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import backendInstance from "../../instances/serverConnection";
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import Back from "../global/Back";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import TagIcon from "@mui/icons-material/Tag";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import LoginIcon from "@mui/icons-material/Login";
import PaymentsIcon from "@mui/icons-material/Payments";
import PersonIcon from "@mui/icons-material/Person";
import UpdateIcon from "@mui/icons-material/Update";

const EntryInfo = () => {
  //Theming
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //Navigate
  const navigate = useNavigate();
  //Transaction ID
  const entryId = window.location.pathname.slice(13);

  //Reducers
  const { userDetails: userProfile } = useSelector(
    (state) => state.profileReducer
  );
  const [entry, setEntry] = useState(null);

  async function getEntryData(entryId) {
    await backendInstance
      .get(`/api/transaction/get/${entryId}`)
      .then((response) => {
        setEntry(response.data.transactionDetail);
        console.log(response.data.transactionDetail);
        alert(response.data.message);
      })
      .catch((error) => {
        alert(
          JSON.stringify({
            code: error.code,
            message: error.response.data.message,
          })
        );
      });
  }

  useEffect(() => {
    try {
      if (entryId.length > 0) {
        getEntryData(entryId);
      } else {
        throw {
          message: "Incorrect transaction ID",
          statusCode: 400,
        };
      }
    } catch (error) {
      alert(
        JSON.stringify({
          code: error.code,
          message: error.message,
        })
      );
    }
  }, [entryId]);

  return entry == null ? (
    "Loading"
  ) : (
    <Grid container>
      <Box
        sx={{
          height: "25vh",
          minWidth: "100%",
          backgroundColor: colors.primary[300],
        }}
      >
        <Box
          sx={{
            minWidth: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ maxWidth: "fit-content" }}>
            <Back />
          </Box>
          <Tooltip
            title="Edit Feature - To be published soon!"
            placement="left-start"
          >
            <div>
              <IconButton
                aria-label="edit user"
                disabled={true}
                color="primary"
                sx={{ mr: "15px", mt: 2.8 }}
                onClick={() => {
                  navigate(`/api/Profile-Edit/${userProfile._id}`);
                  //console.log(userProfile.id);
                }}
              >
                <EditIcon sx={{ fontSize: "2.5rem" }} />
              </IconButton>
            </div>
          </Tooltip>
        </Box>
      </Box>
      <Box
        sx={{
          minWidth: "100%",
          display: "flex",
          textAlign: "center",
          flexDirection: "column",
          justifyContent: "center",
          mt: -11,
        }}
      >
        <Typography gutterBottom variant="h2" component="div">
          Transaction Log Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          A snapshot of the transaction movement
        </Typography>
      </Box>
      <Grid container sx={{ mt: 0.5, p: "0px 20px" }} spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={5}
            sx={{
              minHeight: "37vh",
              backgroundColor: colors.primary[400],
              pt: 1.5,
            }}
          >
            <center>
              <b>Readable Data</b>
            </center>
            <List>
              <ListItem>
                <ListItemIcon>
                  <TagIcon sx={{ fontSize: "35px" }} />
                </ListItemIcon>
                <ListItemText primary={`Transaction ID: ${entry._id}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SyncAltIcon sx={{ fontSize: "35px" }} />
                </ListItemIcon>
                <ListItemText primary={`Transaction Type: ${entry.type}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SyncAltIcon sx={{ fontSize: "35px" }} />
                </ListItemIcon>
                <ListItemText
                  primary={`Transaction Category: ${entry.category}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LoginIcon sx={{ fontSize: "35px" }} />
                </ListItemIcon>
                <ListItemText
                  primary={`Transcation created at: ${new Date(
                    entry.createdAt
                  ).toString()}`}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={5}
            sx={{
              minHeight: "37vh",
              backgroundColor: colors.primary[400],
              pt: 1.5,
            }}
          >
            <center>
              <b>Editable Data</b>
            </center>
            <List>
              <ListItem>
                <ListItemIcon>
                  <PaymentsIcon sx={{ fontSize: "35px" }} />
                </ListItemIcon>
                <ListItemText primary={`Amount: ${entry.amount}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon sx={{ fontSize: "35px" }} />
                </ListItemIcon>
                <ListItemText primary={`Paid To / Receiver: ${entry.paidTo}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <UpdateIcon sx={{ fontSize: "35px" }} />
                </ListItemIcon>
                <ListItemText
                  primary={`Transcation created at: ${new Date(
                    entry.updatedAt
                  ).toString()}`}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 0.5, p: "0px 20px" }} spacing={2}>
        <Grid item xs={12}>
          <Paper
            elevation={5}
            sx={{
              minHeight: "35vh",
              backgroundColor: colors.primary[400],
              pt: 1.5,
            }}
          >
            <center>
              <b>Transaction Update History</b>
            </center>
            {entry.history.length !== 0 ? entry.history.map((history) => {
              return (
                <Box>
                  <List>
                    <ListItem
                      alignItems="flex-start"
                      sx={{ flexDirection: "column" }}
                    >
                      <u>
                        <ListItemText
                          primary={`updated: ${history.updatedAt}`}
                        ></ListItemText>
                      </u>
                      {Object.keys(history).map((keyValue, i) => {
                        return keyValue !== "updatedAt" ? (
                          <ListItemText
                            primary={`${keyValue}: ${history[keyValue]}`}
                          ></ListItemText>
                        ) : (
                          ""
                        );
                      })}
                    </ListItem>
                    <br />
                  </List>
                </Box>
              );
            }):<List><ListItem><ListItemText alignItems="center" primary="No updates available!!"></ListItemText></ListItem></List>}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EntryInfo;
