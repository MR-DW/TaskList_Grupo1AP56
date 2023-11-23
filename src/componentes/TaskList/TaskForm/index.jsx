import { Stack, Dialog, TextField, FormControl, Button, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import { useState, useContext } from "react";
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from "@mui/icons-material/Edit";
import './TaskForm.css'
import { TaskContext } from ".."

export default function TaskForm(props) {
  // eslint-disable-next-line no-unused-vars
  const { abrirFormulario, agregarTarea, editarTarea, eliminarTarea } = useContext(TaskContext)
  const {tarea} = props
  
  TaskForm.propTypes = {
    tarea: PropTypes.object,
  };

  const [miTarea, setMiTarea] = useState(
    tarea ?? { id: null, nombre: "", completado: false }
  );
  const onCerrar=()=>{
    abrirFormulario(null,false)
  }
  //bien podría ser un componente en sí.
  const inputTarea = (propiedad) => {
    return (
      <TextField
        id="standard-basic"
        variant="standard"
        key={"PROP_" + propiedad}
        label='Título de tu tarea'
        onChange={(e) => {
          setMiTarea({ ...miTarea, [propiedad]: e.target.value });
        }}
        value={miTarea[propiedad]}
      />
    );
  };
  const onSubmitForm = (e) => {
    miTarea.id ? editarTarea(miTarea) : agregarTarea(miTarea);
    onCerrar();
    e.preventDefault();
  };
  const campos = ["nombre"];
  return (
    <Dialog open={true} onClose={onCerrar} >
      <form onSubmit={onSubmitForm} >
        <DialogTitle className="dialogTitle">
          <Stack direction="row" spacing={2} className="stack">
            <div>{miTarea.id ? <EditIcon /> : <AddIcon />}</div>
            <div>{miTarea.id ? "Modificando" : "Añadiendo"}</div>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <FormControl>
            {campos.map((x) => inputTarea(x))}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={miTarea.nombre===""} //No permitir añadir una tarea sin nombre
            variant="outlined"
            type="submit"
          >{miTarea.id ? "Modificar" : "Añadir"}</Button>
          <Button
            variant="outlined"
            type="button"
            onClick={onCerrar}>Cerrar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
