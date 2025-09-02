import { AppBar, Box, IconButton, Toolbar, Typography ,Drawer, useMediaQuery} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";

const PrimaryAppBar = () => {
    const [sideMenu,setSideMenu]=useState(false)
    const theme = useTheme();

    // 👉 "small screen" means < sm
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // 👉 Auto open drawer when small screen, close when bigger
  // useEffect(() => {
  //   setSideMenu(isSmallScreen);
  // }, [isSmallScreen]);

useEffect(() => {
  if (!isSmallScreen) {
    setSideMenu(false);   // keep open on big screen
  } else {
    setSideMenu(false);  // auto-close on small
  }
}, [isSmallScreen]);
    const toggeleDrawer =(open:boolean)=>(event:React.KeyboardEvent | React.MouseEvent)=>{
        if (event.type === 'keydown' && ((event as React.KeyboardEvent ).key ==="Tab" || (event as React.KeyboardEvent).key === "Shift")) {
            return
        }
        setSideMenu(open)
    }



  return (
    <AppBar
      position="static"
      sx={{
        zIndex:(theme)=> theme.zIndex.drawer + 2 ,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.primaryAppBar?.height ?? 50,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box sx={{display: {xs:"block", sm:"none"}}}>
          <IconButton  aria-label="open drawer" edge="start" sx={{mr:2}} onClick={toggeleDrawer(true)}>
            <MenuIcon />

          </IconButton>
        </Box>

        {/* <Drawer anchor="left" open={sideMenu} onClose={toggeleDrawer(false)}>
            {[...Array(100)].map((_,i)=>(
                
                <Typography key={i} paragraph>
                    {i +1}
                </Typography>
            ))}

        </Drawer> */}
        <Drawer
          anchor="left"
          open={sideMenu}
          onClose={toggeleDrawer(false)}
        >
          {[...Array(100)].map((_, i) => (
            <Typography key={i} paragraph>
              {i + 1}
            </Typography>
          ))}
        </Drawer>


        <Link href="/" underline="none" color="black">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            DJCHAT
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryAppBar;
