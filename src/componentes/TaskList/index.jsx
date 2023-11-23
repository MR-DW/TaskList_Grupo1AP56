import Button from "@mui/material/Button";
import { createContext, useState } from "react";
import TaskForm from "../TaskForm";
import TaskItem from "../TaskItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./TaskList.css";
import Typography from "@mui/material/Typography";

export const TaskContext = createContext({});

export default function TaskList() {
  const [tasks, setTasks] = useState([
    { id: "TSK_1", nombre: "Tarea del dia - TaskForm", completado: false },
    { id: "TSK_2", nombre: "Tomar un cafe", completado: true },
  ]);
  const [idCounter, setIdCounter] = useState(tasks.length + 1);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  const nuevoId = () => {
    //La forma mas simple de generar un id unico, es siempre incrementarlo, asi nunca se repite
    setIdCounter(idCounter + 1);
    return idCounter;
  };

  const agregarTarea = (nuevaTarea) => {
    nuevaTarea.id = `TSK_${nuevoId()}`;
    setTasks([nuevaTarea, ...tasks]);
  };
  const eliminarTarea = (tareaEliminada) => {
    setTasks(
      tasks.filter((tarea) => {
        return tarea.id != tareaEliminada.id;
      })
    );
  };

  const editarTarea = (tareaEditada) => {
    setMostrarForm(false);
    setTasks(
      tasks.map((tarea) => {
        return tareaEditada.id != tarea.id ? tarea : tareaEditada;
      })
    );
  };
  const abrirFormulario = (tarea = null, mostrar = true) => {
    setTareaSeleccionada(tarea);
    setMostrarForm(mostrar);
  }
  const ContextValue = {
    abrirFormulario: abrirFormulario,
    agregarTarea: agregarTarea,
    editarTarea: editarTarea,
    eliminarTarea: eliminarTarea
  }

  return (
    <TaskContext.Provider value={ContextValue}>
      <Box sx={{ flexGrow: 12 }} className="boxContainer">
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={10}>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={8}>
                <Typography variant="h3" component="h1">
                  Mis Tareas!
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    //setTareaSeleccionada(null);
                    setMostrarForm(!mostrarForm);
                  }}
                >
                  Agregar Tarea
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={8}>
            {
              (tasks.length > 0) ? (
                tasks.map((x) => { return <TaskItem task={x} key={`TaskItem_${x.id}`} /> })
              ) : (
                <Typography sx={{ fontSize: 24 }} color="text.secondary" bgcolor={"whitesmoke"} gutterBottom>
                  No tienes tareas pendientes!
                </Typography>
              )
            }
          </Grid>
        </Grid>
      </Box>

      <div>
        {/* Renderizar el TaskForm. Mantener el condicional por fuera del componente (tarea se copia durante el primer renderizado, hasta que se cierra) */}
        {mostrarForm && (
          <TaskForm
            tarea={tareaSeleccionada}
          />
        )}
      </div>
    </TaskContext.Provider>
  );
}
