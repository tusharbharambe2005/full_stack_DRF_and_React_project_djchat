import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./template/PrimaryAppBar";
import PrimaryDraw from "./template/PrimaryDraw";
import SecondaryDraw from "./template/SecondaryDraw";
import Main from "./template/Main";
import PopularChannel from "../components/PrimaryDraw/PopularChannel"
import { useState } from "react";

const Home = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {/* AppBar on top */}
        <PrimaryAppBar />

        {/* Main body (flex row) */}
        <Box sx={{ display: "flex", flex: 1 }}>
          {/* Left drawer */}
          <PrimaryDraw open={open} setOpen={setOpen}>
            <PopularChannel open={open} />
          </PrimaryDraw>

          {/* Secondary drawer */}
          <SecondaryDraw />

          {/* Main content area */}
          <Main />
        </Box>
      </Box>
    </>
  );
};

export default Home;
