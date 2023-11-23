import { Stack, Dialog, TextField, FormControl, Button, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import { useState } from "react";
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from "@mui/icons-material/Edit";

export default function TaskForm(props) {
  //const { onCerrar, tarea, agregarTarea, editarTarea } = props;
  //Como no estan respetando el orden de los props, los seteo explícitamente
  const onCerrar = props.onCerrar;
  const tarea = props.tarea
  const agregarTarea = props.agregarTarea ?? ((x) => { console.warn("agregarTarea@TaskForm no implementado") });
  const editarTarea = props.editarTarea ?? ((x) => { console.warn("editarTarea@TaskForm no implementado") });

  TaskForm.propTypes = {
    onCerrar: PropTypes.func.isRequired,
    tarea: PropTypes.object,
    agregarTarea: PropTypes.func,
    editarTarea: PropTypes.func
  };

  const [miTarea, setMiTarea] = useState(
    tarea ?? { id: null, nombre: "Nueva tarea!", completado: false }
  );

  //bien podría ser un componente en sí.
  const inputTarea = (propiedad) => {
    return (
      <TextField
        id="standard-basic"
        variant="standard"
        key={"PROP_" + propiedad}
        label={propiedad}
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
  };
  const campos = ["nombre"];
  return (
    <Dialog open={true} onClose={onCerrar}>
      <form onSubmit={onSubmitForm}>
        <DialogTitle>
          <Stack direction="row" spacing={2}>
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
