// Home.jsx
import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./template/PrimaryAppBar";
import PrimaryDraw from "./template/PrimaryDraw";
import SecondaryDraw from "./template/SecondaryDraw";
import Main from "./template/Main";
const Home = () => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        {/* AppBar on top */}
        <PrimaryAppBar />

        {/* Main body (flex row) */}
        <Box sx={{ display: "flex", flex: 1 }}>
          {/* Left drawer */}
          <PrimaryDraw />

          {/* Secondary drawer */}
          <SecondaryDraw />

          {/* Main content area */}
          {/* <Box sx={{ flex: 1, p: 2, overflow: "auto" }}> */}
          {/* </Box> */}
          <Main></Main>

        </Box>
      </Box>
    </>
  );
};

export default Home;
