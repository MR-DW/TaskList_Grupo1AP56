import Dialog from '@mui/material/Dialog';
import { useState } from "react";

export default function TaskForm(props){
    const {onCerrar, tarea, agregarTarea, editarTarea}=props
    const [miTarea, setMiTarea] = useState(tarea??{id:null,nombre:"Nueva tarea!", completado: false})
   
    //bien podría ser un componente en sí.
    const inputTarea=(propiedad)=>{
        return <input onChange={(e)=>{
            setMiTarea({...miTarea, [propiedad]:e.target.value})
        }} value={miTarea[propiedad]}></input>
    }
    const campos=["nombre"]
    return <Dialog open={true} onClose={onCerrar}>
        {campos.map((x)=>inputTarea(x))}
        <button onClick={()=>{
            miTarea.id?editarTarea(miTarea):agregarTarea(miTarea); onCerrar()
        }}>{miTarea.id?"Modificar":"Añadir"}</button>
        <button onClick={onCerrar}>Cerrar</button>
    </Dialog>
}