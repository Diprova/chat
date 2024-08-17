import React from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  styled,
  TextField,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import cover from "../../assets/chatbg.jpg";
import SendIcon from "@mui/icons-material/Send";

const Container = styled("div")(({ theme }) => ({
  backgroundImage: `url(${cover})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
}));

const Header = styled("div")(({ theme }) => ({
  borderBottom: "1px solid grey",
  display: "flex",
  paddingLeft: "2rem",
  backgroundColor: "#1f1f1f",
}));

const MessageBox = styled(Box)(({ theme }) => ({}));

const TextBox = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "0.5rem",
  backgroundColor: "#1f1f1f",
}));

export const MessageContainer = () => {
  const user = useSelector((state) => state.auth.user);
  let chat = [];
  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        <Grid item xs={1}>
          <Header>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>{user.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={user} />
              </ListItem>
            </List>
          </Header>
        </Grid>
        <Grid item xs={8}>
          <MessageBox></MessageBox>
        </Grid>
        <Grid item xs={1}>
          <TextBox>
            <TextField
              id="outlined-basic"
              label="Type Your Message"
              variant="outlined"
              fullWidth
            />
            <Avatar sx={{ margin: "0.5rem" }}>
              <SendIcon />
            </Avatar>
          </TextBox>
        </Grid>
      </Grid>
    </Container>
  );
};
