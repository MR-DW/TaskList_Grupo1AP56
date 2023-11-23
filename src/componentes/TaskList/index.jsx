import Button from "@mui/material/Button";
import React, { useState } from "react";
import TaskForm from "../TaskForm";
import TaskItem from "../TaskItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./TaskList.css";
import Typography from "@mui/material/Typography";

export default function TaskList() {
  const [tasks, setTasks] = useState([
    { id: "TSK_1", nombre: "Tarea del dia - TaskForm", completado: false },
    { id: "TSK_2", nombre: "Tomar un cafe", completado: true },
  ]);
  const [idCounter, setIdCounter] = useState(tasks.length + 1);
  const [mostrarForm, setMostrarForm] = useState(false);
  //const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  const nuevoId = () => {
    //La forma mas simple de generar un id unico, es siempre incrementarlo, asi nunca se repite
    setIdCounter(idCounter + 1);
    return idCounter;
  };

  const agregarTarea = (nuevaTarea) => {
    nuevaTarea.id = `TSK_${nuevoId()}`;
    setTasks([nuevaTarea, ...tasks]);
  };

  return (
    <>
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
            <TaskItem tasks={tasks} setTasks={setTasks} />
          </Grid>
        </Grid>
      </Box>

      <div>
        {/* Renderizar el TaskForm. Mantener el condicional por fuera del componente (tarea se copia durante el primer renderizado, hasta que se cierra) */}
        {mostrarForm && (
          <TaskForm
            onCerrar={() => setMostrarForm(false)}
            tarea={null} //en agregar siempre será null
            agregarTarea={agregarTarea}
            //editarTarea={(x)=>{console.warn("Componente equivocado")}}
          />
        )}
      </div>
    </>
  );
}
