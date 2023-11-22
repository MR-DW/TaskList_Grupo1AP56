import { useState } from "react";
import "./App.css";
import TaskItem from "./componentes/TaskItem";
//Esta app es solo para testeo del componente TaskForm hasta que estén implementadas sus dependencias e interfaces
function App() {


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

  return (
    <>
      <h1>mis Tareas</h1>

      <button
        onClick={() => {
          setTareaSeleccionada(null);
          setMostrarForm(!mostrarForm);
        }}
      >
        Agregar Tarea
      </button>

      {/* Renderizar una lista de TaskItem*/}

      <TaskItem/>

      {/* <ul>
        {tasks.map((x) => {
          return (
            <li key={x.id}>
              <div>
                [{x.id}] {x.nombre}
              </div>
              <button
                onClick={() => {
                  setTareaSeleccionada(x);
                  setMostrarForm(true);
                }}
              >
                editar
              </button>
              <button
                onClick={() => {
                  eliminarTarea(x);
                }}
              >
                Borrar
              </button>
            </li>
          );
        })}
      </ul> */}

   
    </>
  );
}

export default App;
