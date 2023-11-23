import Button from "@mui/material/Button";
import React, { useState } from "react";
import TaskForm from "../TaskForm";
import TaskItem from "../TaskItem";

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
      <Typography variant="h3" component="h1">
        Mis Tareas!
      </Typography>
      <Button
        variant="outlined"
        onClick={() => {
          //setTareaSeleccionada(null);
          setMostrarForm(!mostrarForm);
        }}
      >
        Agregar Tarea
      </Button>
      <TaskItem tasks={tasks} setTasks={setTasks} />
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
