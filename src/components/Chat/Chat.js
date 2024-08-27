import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  styled,
} from "@mui/material";
import data from "../../data.json";
import { setUser } from "../../reducers/redux/auth/auth.slice";
import { useDispatch } from "react-redux";
import { MessageContainer } from "./MessageContainer";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

const Window = styled("div")(({ theme }) => ({
  padding: "0",
  margin: "0",
  height: "90vh",
}));

const PageWrapper = styled(Paper)(({ theme }) => ({
  margin: "4rem 0 0 3rem",
  height: "100%",
  maxWidth: "100vw",
}));

const UserWrapper = styled("div")(({ theme }) => ({
  borderRight: "1px solid black",
  width: "100%",
  height: "90vh",
  cursor: "pointer",
  padding: "1rem 0 0 1rem",
}));

const ChatWrapper = styled("div")(({ theme }) => ({
  maxWidth: "100%",
}));

const ChatNotify = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  textWrap: "wrap",
}));

export const Chat = () => {
  const [chatRoom, setChatRoom] = useState(false);
  const dispatch = useDispatch();

  const startChat = (user) => {
    setChatRoom(true);
    dispatch(setUser(user.name));
    const chatRoom = "user1_user2";
    socket.emit("joinChat", chatRoom);
  };

  return (
    <Window>
      <PageWrapper>
        <Grid container>
          <Grid item xs={3}>
            <UserWrapper>
              <Typography variant="h6" gutterBottom sx={{ paddingLeft: "3%" }}>
                Chats
              </Typography>
              <List
                sx={{
                  width: "100%",
                }}
              >
                {data?.map((user) => {
                  return (
                    <>
                      <ListItem
                        key={user.name}
                        sx={{ overflow: "hidden" }}
                        onClick={() => startChat(user)}
                      >
                        <ListItemAvatar>
                          <Avatar>{user.name.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.name}
                          secondary={user.messages}
                          primaryTypographyProps={{
                            noWrap: true,
                            sx: {
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            },
                          }}
                          secondaryTypographyProps={{
                            noWrap: true,
                            sx: {
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            },
                          }}
                        />
                      </ListItem>
                      <Divider />
                    </>
                  );
                })}
              </List>
            </UserWrapper>
          </Grid>
          <Grid item xs={9}>
            {chatRoom ? (
              <MessageContainer socket={socket} />
            ) : (
              <ChatWrapper>
                <ChatNotify>
                  <Typography variant="h6" gutterBottom>
                    Click on the User to send and receive messages
                  </Typography>
                </ChatNotify>
              </ChatWrapper>
            )}
          </Grid>
        </Grid>
      </PageWrapper>
    </Window>
  );
};
