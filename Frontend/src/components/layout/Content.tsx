import { Grid, Paper } from "@mui/material";

interface ContentProps {
  children: React.ReactNode;
}

const Content = (props: ContentProps) => {
  const { children } = props;
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          backgroundColor: "white",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <Paper elevation={0} sx={{ backgroundColor: "inherit" }}>
          {children}
        </Paper>
      </Paper>
    </Grid>
  );
};

export default Content;
