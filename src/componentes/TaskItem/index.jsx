import "../TaskItem/TaskItem.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import TaskForm from "../TaskForm";
import PropTypes from 'prop-types';

export default function TaskItem(props) {
  const { tasks, setTasks } = props;

  TaskItem.propTypes = {
    tasks: PropTypes.array.isRequired,
    setTasks: PropTypes.func.isRequired,
  };

  const [mostrarForm, setMostrarForm] = useState(false);

  const onChangeCompletado = (tareaId) => {
    setTasks(
      tasks.map((tarea) =>
        tarea.id === tareaId
          ? { ...tarea, completado: !tarea.completado }
          : tarea
      )
    );
  };

  const eliminarTarea = (tareaEliminada) => {
    setTasks(
      tasks.filter((tarea) => {
        return tarea.id != tareaEliminada.id;
      })
    );
  };

//   const editarTarea = (x) => {
//     setMostrarForm(true);
//     tasks.filter((tarea)=>{
//         // console.log("x: ", x)
//         tarea.id == x.id ? tarea : x
//     })
//   };

  return (
    <>
      {tasks.length > 0 ? (
        <div className="container">
          {tasks.map((x) => (
            <div key={x.id} className="container-box">
              <Box lg={{ flexGrow: 1 }} className="box-container">
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
                      color={x.completado ? "success" : "primary"}
                      onClick={() => onChangeCompletado(x.id)}
                    >
                      {x.completado ? "Realizada" : "No Realizada"}
                    </Button>
                  </Grid>

                  <Grid item lg={6}>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {x.nombre}
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
                        <Button size="small" variant="contained" color="error" onClick={() => eliminarTarea(x)}>
                          <DeleteForeverIcon
                            
                          ></DeleteForeverIcon>
                        </Button>
                      </Grid>
                      {!x.completado && (
                        <Grid item lg={2}>
                          <Button
                            size="small"
                            variant="contained"
                            color="warning"
                            onClick={() =>setMostrarForm(true)}
                          >
                            <EditIcon ></EditIcon>
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              {mostrarForm && (
                <TaskForm
                  onCerrar={() => setMostrarForm(false)}
                  tarea={x}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
          No tienes tareas pendientes!
        </Typography>
      )}
    </>
  );
}
