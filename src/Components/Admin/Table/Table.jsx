import { Container, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const Table = (prop) => {
  const { rows = [], columns = [], heading, height = "90vh" } = prop;

  return (
    <Container
      sx={{
        height: height,
        ".table-heading": {
          color: "white",
          background: "green",
        },
      }}
    >
      <Paper
        sx={{
          padding: "2rem 4rem",
          width: "100%",
          height: "100vh",
        }}
      >
        <Typography variant="h5" padding={"1rem"}>
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
            height: height,
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[15]}
          checkboxSelection
        />
      </Paper>
    </Container>
  );
};

export default Table;
