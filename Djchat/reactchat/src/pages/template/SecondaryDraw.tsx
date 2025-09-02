import { Box, Typography, } from "@mui/material"
import {useTheme }from "@mui/material/styles"

import axios from "axios"

const SecondaryDraw = () =>{
    const theme= useTheme()

   
    return (
        
    <Box
        sx={{
            minWidth: `${theme.secondaryDraw.width}px`,
            height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
            // mt: `${theme.primaryAppBar.height}px`,  // only needed if AppBar is above everything
            borderRight: `1px solid ${theme.palette.divider}`,
            display: { xs: "none", sm: "block" },
            overflow: "auto",
        }}
        >
        {[...Array(100)].map((_, i) => (
            <Typography key={i} paragraph>
            {i + 1}
            </Typography>
        ))}
        </Box>
)}

export default SecondaryDraw;