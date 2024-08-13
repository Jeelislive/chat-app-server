import { AppBar, Backdrop, Box, Icon, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { lazy, Suspense } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { orange } from '../../constants/color'
import {
  Add as AddIcon,
  
  Group as GroupIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'

const SearchDialog = lazy(() => import('../specific/Search'))
const NewGroupDialog = lazy(() => import('../specific/NewGroup'))
const NotificationDialog = lazy(() => import('../specific/Notifications'))


function Header() {

  const navigate = useNavigate();

  const [ isMobile, setIsMobile ] = useState(false);
  const [ isSearch, setIsSearch ] = useState(false);
  const [ isNewGroup, setNewIsGroup ] = useState(false);
  const [ isNotification, setIsNotification ] = useState(false);

  const handleMobile = () => {
    setIsMobile(prev => !prev);
  }

  const openSearch = () => {
    setIsSearch(prev => !prev);
  }

  const openNewGroup = () => {
   setNewIsGroup(prev => !prev);
  }
  

  const openNotification = () => {
    setIsNotification(prev => !prev);
  }

  const NavigateToGroup = () => navigate('/groups')

  const logoutHandler = () => {
      console.log('Logout')
  }

  return (
    <> 
      <Box sx={ { flexGrow: 1 } } height= "4rem">
        <AppBar position="static" sx={ {
          bgcolor: orange,
        } } >
          <Toolbar>
            <Typography
              variant='h6'
              sx={ {
                display: { xs: "none", sm: "block" },
              } }
            >chattu</Typography>
            <Box sx={ {
              display: { xs: 'block', sm: 'none' },
            } }>
              <IconButton color="inherit" onClick={ handleMobile }>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={ {
              flexGrow: 1,
            } } />
            <Box>
              <Iconbtn
                title="Search"
                icon={ <SearchIcon /> }
                onClick={ openSearch } />

              <Iconbtn
                title="New Group"
                icon={ <AddIcon /> }
                onClick={ openNewGroup } />

              <Iconbtn
                title="Manage Group"
                icon={ <GroupIcon /> }
                onClick={ NavigateToGroup } />
              
              <Iconbtn
                title="Notifications"
                icon={ <NotificationsIcon /> }
                onClick={ openNotification } />
              
              <Iconbtn
                title="Logout"
                icon={ <LogoutIcon /> }
                onClick={ logoutHandler } />

            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      { isSearch && 
        <Suspense fallback={ <Backdrop open /> }>
        <SearchDialog />
        </Suspense>
      }
      { isNotification &&
        <Suspense fallback={ <Backdrop open /> }>
          <NotificationDialog />
        </Suspense>
      }
      { isNewGroup &&
        <Suspense fallback={ <Backdrop open /> }>
          <NewGroupDialog />
        </Suspense>
      }
    </>
  )
}

export default Header

const Iconbtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={ title }>
      <IconButton color="inherit" size="large" onClick={ onClick }>
        <Icon>{ icon }</Icon>
      </IconButton>
    </Tooltip>
  )
}