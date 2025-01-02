import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, height: "100" }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            売上記録
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
