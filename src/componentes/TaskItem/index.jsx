import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useContext } from "react";
import "../TaskItem/TaskItem.css";
import { TaskContext } from "../TaskList"
export default function TaskItem(props) {
  const { task } = props;
  // eslint-disable-next-line no-unused-vars
  const { abrirFormulario, agregarTarea, editarTarea, eliminarTarea } = useContext(TaskContext)

  TaskItem.propTypes = {
    task: PropTypes.object.isRequired
  };

  const onChangeCompletado = (tareaCambiada) => {
    editarTarea({ ...tareaCambiada, completado: !tareaCambiada.completado })
  };

  return (
    <Card sx={{ minWidth: 275 }} key={task.id} variant="outlined">
      <CardContent>
        <Box lg={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item lg={2}>
              <Button
                size="small"
                variant="contained"
                color={task.completado ? "success" : "primary"}
                onClick={() => onChangeCompletado(task)}
              >
                {task.completado ? "Realizada" : "No Realizada"}
              </Button>
            </Grid>

            <Grid item lg={6}>
              <Typography
                sx={{ fontSize: 24 }}
                color="text.secondary"
                gutterBottom
              >
                {task.nombre}
              </Typography>
            </Grid>

            <Grid item lg={2}>
              <Grid
                container
                spacing={1}
                direction="column"
                alignItems="center"
              >
                <Grid item lg={2}>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => eliminarTarea(task)}
                  >
                    <DeleteForeverIcon></DeleteForeverIcon>
                  </Button>
                </Grid>
                {!task.completado && (
                  <Grid item lg={2}>
                    <Button
                      size="small"
                      variant="contained"
                      color="warning"
                      onClick={() => abrirFormulario(task)}
                    >
                      <EditIcon></EditIcon>
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
