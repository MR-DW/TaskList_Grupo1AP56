import "../TaskItem/TaskItem.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import TaskForm from "../TaskForm";

export default function TaskItem() {
  const [tasks, setTasks] = useState([
    { id: "TSK_1", nombre: "Tarea del dia - TaskForm", completado: false },
    { id: "TSK_2", nombre: "Tomar un cafe", completado: true },
  ]);

  const [mostrarForm, setMostrarForm] = useState(false);

const onChangeCompletado = (tareaId) => {
  setTasks((prevTasks) =>
    prevTasks.map((tarea) =>
      tarea.id === tareaId ? { ...tarea, completado: !tarea.completado } : tarea
    )
  );
};

  const eliminarTarea = (tareaEliminada) => {
    //filtrar la tarea a eliminar segun id
    setTasks(
      tasks.filter((tarea) => {
        return tareaEliminada.id != tarea.id;
      })
    );
  };
  const editarTarea = (tareaEditada) => {
    //reemplazar la tarea en tasks segun id
    setTasks(
      tasks.map((tarea) => {
        return tareaEditada.id != tarea.id ? tarea : tareaEditada;
      })
    );
  };

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
                      onClick={()=>onChangeCompletado(x.id)}
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
                        <Button size="small" variant="contained" color="error">
                          <DeleteForeverIcon
                          onClick={()=> eliminarTarea(x.id)}
                          ></DeleteForeverIcon>
                        </Button>
                      </Grid>
                      {x.completado && (
                        <Grid item lg={2}>
                          <Button
                            size="small"
                            variant="contained"
                            color="warning"
                          >
                            <EditIcon
                              onClick={() => {
                                setMostrarForm(true);
                              }}
                            ></EditIcon>
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
                  editarTarea={editarTarea}
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
