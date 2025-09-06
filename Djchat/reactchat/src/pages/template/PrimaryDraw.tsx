import { Box, styled, useMediaQuery, useTheme } from "@mui/material"
import React, { useEffect, useState, type ReactNode } from "react"
import DrawToggle from "../../components/PrimaryDraw/DrawToggle"
import MuiDrawer from "@mui/material/Drawer"

type Props = {
  children: ReactNode
}

type ChildProps = {
  open: boolean
}

type ChildElement = React.ReactElement<ChildProps>

const PrimaryDraw: React.FC<Props> = ({ children }) => {
  const theme = useTheme()
  const below600 = useMediaQuery("(max-width:599px)")
  const [open, setOpen] = useState(!below600)

  const openedMixen = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  })

  const closedMixen = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    width: theme.primaryDraw.closed,
  })

  const Drawer = styled(MuiDrawer)(({ theme, open }: any) => ({
    width: theme.primaryDraw.width,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixen(),
      "& .MuiDrawer-paper": openedMixen(),
    }),
    ...(!open && {
      ...closedMixen(),
      "& .MuiDrawer-paper": closedMixen(),
    }),
  }))

  useEffect(() => {
    setOpen(!below600)
  }, [below600])

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  return (
    <Drawer
      open={open}
      variant={below600 ? "temporary" : "permanent"}
      PaperProps={{
        sx: {
          width: theme.primaryDraw.width,
          mt: `${theme.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        },
      }}
    >
      <Box>
        <Box sx={{ p: 0, width: open ? "auto" : "100%" }}>
          <DrawToggle
            open={open}
            handleDrawerClose={handleDrawerClose}
            handleDrawerOpen={handleDrawerOpen}
          />
          
        </Box>
        {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child as ChildElement, { open })
              : child
          )}
      </Box>
    </Drawer>
  )
}

export default PrimaryDraw
