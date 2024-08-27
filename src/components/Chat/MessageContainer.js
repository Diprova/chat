import React, { useState } from "react";
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
  Button,
  Paper,
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

export const MessageContainer = ({ socket }) => {
  const user = useSelector((state) => state.auth.user);
  const [currentMessage, setCurrentMessage] = useState("");
  const [message, setMessage] = useState();

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: "user1_user2",
        author: "user1",
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessage((list) => [...list, message]);
      setCurrentMessage("");
    }
  };

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
          <MessageBox>
            <Paper
              sx={{
                backgroundColor: "#121212",
                padding: 2,
                margin: 2,
                width: "50%",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
              elevation={3}
            >
              {currentMessage}
            </Paper>
          </MessageBox>
        </Grid>
        <Grid item xs={1}>
          <TextBox>
            <TextField
              id="outlined-basic"
              label="Type Your Message"
              Z
              variant="outlined"
              fullWidth
              onChange={(event) => setCurrentMessage(event.target.value)}
            />
            <Button onClick={sendMessage}>
              <Avatar sx={{ margin: "0.5rem" }}>
                <SendIcon />
              </Avatar>
            </Button>
          </TextBox>
        </Grid>
      </Grid>
    </Container>
  );
};
