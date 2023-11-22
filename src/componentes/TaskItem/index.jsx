import "../TaskItem/TaskItem.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";

export default function TaskItem() {
  const [tasks, setTasks] = useState([
    { id: "TSK_1", nombre: "Tarea del dia - TaskForm", completado: false },
    { id: "TSK_2", nombre: "Tomar un cafe", completado: true },
  ]);

//   const tareaRealizada = (tareaTerminada) => {
//     setTasks(
//       tasks.filter((tarea) => {
//         return (tarea.id = tareaTerminada.id
//           ? (tarea.completado = true)
//           : (tarea.completado = false));
//       })
//     );
//   };
//   const eliminarTarea = (tareaEliminada) => {
//     //filtrar la tarea a eliminar segun id
//     setTasks(
//       tasks.filter((tarea) => {
//         return tareaEliminada.id != tarea.id;
//       })
//     );
//   };
//   const editarTarea = (tareaEditada) => {
//     //reemplazar la tarea en tasks segun id
//     setTasks(
//       tasks.map((tarea) => {
//         return tareaEditada.id != tarea.id ? tarea : tareaEditada;
//       })
//     );
//   };

  return (
    <>
      {tasks.length > 0 ? (
        <div>
          {tasks.map((x) => {
            return (
              <Box lg={{ flexGrow: 1 }} class="box-container" key={x.id}>
                <Grid container spacing={0}>
                  <Grid
                    container
                    lg={2}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Button
                      size="small"
                      variant="contained"
                      color={x.completado ? "success" : "primary"}
                    //   onClick={tareaRealizada}
                    >
                      {x.completado ? "Realizada" : "No Realizada"}
                    </Button>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    lg={8}
                  >
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {x.nombre}
                    </Typography>
                  </Grid>

                  <Grid
                    container
                    lg={2}
                    spacing={1}
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Grid item lg={12}>
                      <Button size="small" variant="contained" color="error">
                        <DeleteForeverIcon
                        //   onClick={eliminarTarea(x)}
                        ></DeleteForeverIcon>
                      </Button>
                    </Grid>

                    <Grid item lg={12}>
                      <Button size="small" variant="contained" color="warning">
                        <EditIcon 
                        // onClick={editarTarea(x)}
                        ></EditIcon>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </div>
      ) 
    :
    (
        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
          No tienes tareas pendientes!
        </Typography>
      ) 
      }
    </>
  );
}
