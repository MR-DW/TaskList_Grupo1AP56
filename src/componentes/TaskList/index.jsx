import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createContext, useState, useEffect, useRef } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createContext, useEffect, useRef, useState } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import "./TaskList.css";

export const TaskContext = createContext({});
export default function TaskList() {
  const tasksEditado=useRef(false)

  const [tasks, setTasks] = useState([]);
  const [idCounter, setIdCounter] = useState(tasks.length + 1);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  const nombre = "Mi lista de tareas"; //para distinguir varios TaskLists en una app

  const nuevoId = () => {
    //Genera un id unico que se incrementa para que no se repita
    setIdCounter(idCounter + 1);
    return idCounter;
  };

  const cargarLista =()=>{
    const localTasks=localStorage.getItem(nombre);
    if (localTasks!=null){
      const nuevaLista=JSON.parse(localTasks)

      let i=idCounter
      setTasks(nuevaLista.map((x)=>{
        return {...x, id:`TSK_${i++}`}
      }))

      setIdCounter(i)
    }
  }
  const guardarLista =()=>{
    if (!tasksEditado.current) return; //Evita guardar la lista con el setState inicial.
    localStorage.setItem(nombre, 
      JSON.stringify(tasks)
    );
    editarTarea.current=false;
  }    

  const agregarTarea = (nuevaTarea) => {
    tasksEditado.current=true;
    nuevaTarea.id = `TSK_${nuevoId()}`;
    setTasks([nuevaTarea, ...tasks]);
  };

  const eliminarTarea = (tareaEliminada) => {
    tasksEditado.current=true;
    setTasks(
      tasks.filter((tarea) => {
        return tarea.id != tareaEliminada.id;
      })
    );
  };

  const editarTarea = (tareaEditada) => {
    tasksEditado.current=true;
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

  //cargar el estado solo la primera vez al montar el componente
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(cargarLista,[]);
  //guardar el estado cuando tasks es modificado
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(guardarLista,[tasks]);

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
                    abrirFormulario(null)
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
        {mostrarForm && (
          <TaskForm
            tarea={tareaSeleccionada}
          />
        )}
      </div>
    </TaskContext.Provider>
  );
}
