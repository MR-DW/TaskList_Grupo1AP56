import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskForm from './componentes/TaskForm'
import TaskItem from './componentes/TaskItem'
//Esta app es solo para testeo del componente TaskForm hasta que estén implementadas sus dependencias e interfaces
function App() {
  const [tasks,setTasks]=useState([
    {id:"TSK_1",nombre:"Tarea del dia - TaskForm", completado: false},
    {id:"TSK_2",nombre:"Tomar un cafe", completado: true},
  ])
  const [idCounter, setIdCounter] = useState(tasks.length+1)
  const [mostrarForm, setMostrarForm]=useState(false)
  const [tareaSeleccionada, setTareaSeleccionada]=useState(null)

  const nuevoId=()=>{
    //La forma mas simple de generar un id unico, es siempre incrementarlo, asi nunca se repite
    setIdCounter(idCounter+1)
    return idCounter
  }

  const eliminarTarea=(tareaEliminada)=>{
    //filtrar la tarea a eliminar segun id
    setTasks(tasks.filter((tarea)=>{
      return (tareaEliminada.id!=tarea.id)
    }))
  }
  const editarTarea=(tareaEditada)=>{
    //reemplazar la tarea en tasks segun id
    setTasks(tasks.map((tarea)=>{
      return (tareaEditada.id!=tarea.id)?tarea:tareaEditada
    }))
  }
  const agregarTarea=(nuevaTarea)=>{
    nuevaTarea.id=`TSK_${nuevoId()}`
    setTasks([nuevaTarea, ...tasks])
  }

  return (
    <>
      <h1>mis Tareas</h1>

      <button onClick={()=>{
        setTareaSeleccionada(null)
        setMostrarForm(!mostrarForm)
        }}>Agregar Tarea</button>
      
      {/* Renderizar una lista de TaskItem*/}

      <TaskItem/>
      
      <ul>
        {tasks.map((x)=>{
          return <li key={x.id}>
            <div>[{x.id}] {x.nombre}</div>
            <button onClick={()=>{
              setTareaSeleccionada(x)
              setMostrarForm(true)
            }}>editar</button>
            <button onClick={()=>{
              eliminarTarea(x)
            }}>Borrar</button>
          </li>
        })}
      </ul>

      <div>
        {/* Renderizar el TaskForm. Mantener el condicional por fuera del componente (tarea se copia durante el primer renderizado, hasta que se cierra)*/}
        {mostrarForm&&<TaskForm onCerrar={()=>setMostrarForm(false)} tarea={tareaSeleccionada} agregarTarea={agregarTarea} editarTarea={editarTarea}/>}
      </div>
    </>
  )
}

export default App
