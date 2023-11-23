import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import { useState } from "react";

export default function TaskForm(props) {
  //const { onCerrar, tarea, agregarTarea, editarTarea } = props;
  //Como no estan respetando el orden de los props, los seteo explícitamente
  const onCerrar = props.onCerrar;
  const tarea = props.tarea;
  const agregarTarea =
    props.agregarTarea ??
    ((x) => {
      console.warn("agregarTarea@TaskForm no implementado");
    });
  const editarTarea =
    props.editarTarea ??
    ((x) => {
      console.warn("editarTarea@TaskForm no implementado");
    });

  TaskForm.propTypes = {
    onCerrar: PropTypes.func.isRequired,
    tarea: PropTypes.object.isRequired,
    agregarTarea: PropTypes.func,
    editarTarea: PropTypes.func,
  };

  const [miTarea, setMiTarea] = useState(
    tarea ?? { id: null, nombre: "Nueva tarea!", completado: false }
  );

  //bien podría ser un componente en sí.
  const inputTarea = (propiedad) => {
    return (
      <div key={"PROP_" + propiedad}>
        <label>{`${propiedad}: `}</label>
        <input
          onChange={(e) => {
            setMiTarea({ ...miTarea, [propiedad]: e.target.value });
          }}
          value={miTarea[propiedad]}
        ></input>
      </div>
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
        {campos.map((x) => inputTarea(x))}
        <input
          type="submit"
          value={miTarea.id ? "Modificar" : "Añadir"}
        ></input>
        <input type="button" value="Cerrar" onClick={onCerrar}></input>
      </form>
    </Dialog>
  );
}
