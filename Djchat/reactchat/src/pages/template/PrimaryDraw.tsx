import { Box,  styled,  Typography, useMediaQuery, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import DrawToggle from "../../components/PrimaryDraw/DrawToggle";
import MuiDrawer from "@mui/material/Drawer"

const PrimaryDraw=()=>{
    const theme= useTheme()
    const below600 = useMediaQuery("(max-width:599px)")
    const [open, setOpen] = useState(!below600)
    // console.log(below600)

const openedMixen=()=>({
    transition: theme.transitions.create('width',{
        easing:theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX:'hidden'
})

const closedMixen=()=>({
    transition:theme.transitions.create('width',{
        easing:theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX:'hidden',
    width: theme.primaryDraw.closed
})

const Drawer = styled(
    MuiDrawer,
    {}
)(({theme,open})=>({
    width:theme.primaryDraw.width,
    whiteSpace:'nowrap',
    boxSizing:"border-box",
    ...(open && {
        ...openedMixen(),
        "& .MuiDrawer-paper":openedMixen()
    }),
    ...(!open && {
        ...closedMixen(),
        "& .MuiDrawer-paper":closedMixen()
    }),

}))
    useEffect(()=>{
        setOpen(!below600)
    },[below600])

    const handleDrawerOpen=()=>{
        setOpen(true)
    }
    const handleDrawerClose = () =>{
        setOpen(false)
    }
    return (
    <Drawer open={open} variant={below600 ? "temporary" : "permanent"} PaperProps={{sx:{ width : theme.primaryDraw.width, mt: `${theme.primaryAppBar.height}px`, height:`calc(100vh - ${theme.primaryAppBar.height}px)`}}}>
        <Box>
            <Box sx={{position:"absolute",top:0, right:0,p:0,width:open? "auto" : "100%"}}>
                <DrawToggle open={open} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen}/>
                {[...Array(100)].map((_,i)=>(
                
                <Typography key={i} paragraph>
                    {i +1}
                </Typography>
            ))}
            </Box>
        </Box>
    </Drawer>
    )
};

export default PrimaryDraw