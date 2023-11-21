import Dialog from '@mui/material/Dialog';
import { useState } from "react";

export default function TaskForm(props){
    const {onCerrar, tarea, agregarTarea, editarTarea}=props
    const [miTarea, setMiTarea] = useState(tarea??{id:null,nombre:"Nueva tarea!", completado: false})
   
    //bien podría ser un componente en sí.
    const inputTarea=(propiedad)=>{
        return <div key={"PROP_"+propiedad}>
            <label>{`${propiedad}: `}</label>
            <input onChange={(e)=>{
                setMiTarea({...miTarea, [propiedad]:e.target.value})
            }} value={miTarea[propiedad]}></input>
        </div>
    }
    const onSubmitForm=(e)=>{
        miTarea.id?editarTarea(miTarea):agregarTarea(miTarea); onCerrar()
    }
    const campos=["nombre"]
    return <Dialog open={true} onClose={onCerrar}>
        <form onSubmit={onSubmitForm}>
            {campos.map((x)=>inputTarea(x))}
            <input type="submit" value={miTarea.id?"Modificar":"Añadir"}></input>
            <input type="button" value="Cerrar" onClick={onCerrar}></input>
        </form>
    </Dialog>
}