import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { TaskContext } from "../../TaskList";
import "./TaskForm.css";

export default function TaskForm(props) {
  // eslint-disable-next-line no-unused-vars
  const { abrirFormulario, agregarTarea, editarTarea } =
    useContext(TaskContext);
  const { tarea } = props;

  TaskForm.propTypes = {
    tarea: PropTypes.object,
  };

  const [miTarea, setMiTarea] = useState(
    tarea ?? { id: null, nombre: "", completado: false }
  );
  const onCerrar = () => {
    abrirFormulario(null, false);
  };

  const inputTarea = (propiedad) => {
    return (
      <TextField
        id="standard-basic"
        variant="standard"
        key={"PROP_" + propiedad}
        label="Título de tu tarea"
        onChange={(e) => {
          setMiTarea({ ...miTarea, [propiedad]: e.target.value });
        }}
        value={miTarea[propiedad]}
      />
    );
  };
  const onSubmitForm = () => {
    miTarea.id ? editarTarea(miTarea) : agregarTarea(miTarea);
    onCerrar();
  };
  const campos = ["nombre"];
  return (
    <Dialog open={true} onClose={onCerrar}>
      <form onSubmit={onSubmitForm}>
        <DialogTitle className="dialogTitle">
          <Stack direction="row" spacing={2} className="stack">
            <div>{miTarea.id ? <EditIcon /> : <AddIcon />}</div>
            <div>{miTarea.id ? "Modificando" : "Añadiendo"}</div>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <FormControl>{campos.map((x) => inputTarea(x))}</FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            type="submit"
            disabled={campos.some((x) => miTarea[x].trim() === "")}
          >
            {miTarea.id ? "Modificar" : "Añadir"}
          </Button>
          <Button variant="outlined" type="button" onClick={onCerrar}>
            Cerrar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
