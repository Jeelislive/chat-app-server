import React, { memo } from 'react'
import { Avatar, Box, Stack, Typography } from '@mui/material';
import {Link} from '../styles/StyledComponents'
import AvatarCard from './AvatarCard';

const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,  
    handleDeleteChat,
     
}) => {
  return (
      <Link sx={ {
          padding: "0",
      }} to={ `/chat/${ _id }` } 
          onContextMenu={ (e) => handleDeleteChat(e, _id, groupChat)} 
      >
          <div style={ {
              display: "flex",
              gap: "1rem",  
              alignItems: "center",
              padding: "1rem",
              backgroundColor: sameSender ? "black" : "unset",
              color: sameSender ? "white" : "unset",    
              justifyContent: "left",
              position: "relative",
          } }>
              
              <AvatarCard avatar={avatar}/>
              <Stack>
                  <Typography>{ name }</Typography>
                  { newMessageAlert && (
                      <Typography>{newMessageAlert.count} New Message</Typography>
                  )}
              </Stack>
              {
                  isOnline && (
                      <Box sx={ {
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "green",
                            position: "absolute",
                            right: "1rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                      }}/>
                  )
              }
          </div>
    </Link>
  )
}

export default memo(ChatItem);