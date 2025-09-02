import  ChevronRight  from "@mui/icons-material/ChevronRight"
import  ChevronLeft  from "@mui/icons-material/ChevronLeft"
import { Box, IconButton } from "@mui/material"
import React from "react"

type props={
    open:boolean;
    handleDrawerClose :()=>void;
    handleDrawerOpen :()=> void;
}

const DrawToggle: React.FC<props> = ({open,handleDrawerClose,handleDrawerOpen}) =>{
    return (
        <Box
            sx={{
                height:"50px",
                display:"flex",
                alignItems:"center",
                justifyContent:"center"
            }}
            >
                <IconButton onClick={open? handleDrawerClose:handleDrawerOpen}>
                    {open? <ChevronLeft/>:<ChevronRight/>}
                </IconButton>
        </Box>
    )
}

export default DrawToggle