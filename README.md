Nombre del Proyecto: "# TaskList_Grupo1AP56" 
Integrantes: Caballero David, Ruiz Matias Ignacio.

1- Planing del Proyecto:

A- Maquetación:
![image](https://github.com/MR-DW/TaskList_Grupo1AP56/assets/105668337/452542b4-c818-485a-ab9a-88a5811f5e7a)
![image](https://github.com/MR-DW/TaskList_Grupo1AP56/assets/105668337/4fb49874-5859-44b3-b0e2-874060aa0bec)

B- Historias de Usuario con Explicación y Desarrollo del funcionamiento del Proyecto:

.Función de TASK LIST:
Como usuario puedo acceder a la pantalla y ver mis tareas, crear una tarea, eliminarla, editarla y marcarla como realizada.
Para ver el listado de tareas simplemente debo ingresar a la pantalla.
Para agregar una nueva tarea, debo hacer click en el botón agregar tarea y se debe abrir un modal.
Para eliminar una tarea, se debe hacer click en el botón/icono de basura se debe borrar la tarea. posible agregar modal de confirmación - mensaje de confirmación.
Para editar la tarea, se hace click en el botón/ícono de lapiz y se abre modal ( Reutilizar modal y form de nueva tarea. 
(Que el modal y el form reciban props para mantener la información, si las props están vacía es por que se va a crear.)
Para marcar la tarea como realizada, que se presione un botón y le agregue un texto de Completa. (Ver si se le pone colores - si se quita el botón).

.Funcionamiento de TASK FORM:
FUNCIONALIDAD AGREGAR TAREA:
Como usuario luego de haber hecho click en el botón agregar tarea de la pantalla principal, se dispara un modal que contiene un formulario.
Dicho formulario me permite: insertar el nombre de una tarea. mediante el uso de un input. 
Al hacer click en aceptar se guarda la tarea y debe mostrarse en el componente Task list. (Ver que se guarde y luego ver que se aguarde arriba).
Si aprieta cancelar se cierra el modal y no se guarde la tarea.

Funcionalidad Editar Tarea:
Luego de haber hecho click en el botón editar, se dispara el mismo modal y debe traer los datos de la tarea, poder modificarse en el input y el boton cancelar tendra la misma funcionalidad que agregar tarea y el botón <<Editar>> debe guardar el cambio y <<No modificar>> la posición de la tarea. 

.Componentes:
Rojo ( APP COMPONENT)
Verde ( TASK LIST COMPONENT)
CELESTE ( TASK ITEM COMPONENT)
MODAL ( TASK FORM COMPONENT)

.Estilos: MATERIAL UI

.GIT : 
Rama Master. (Rama principal/prod).
Rama Develop. (Rama que contendrá el merge de todos los componentes, al aprobarse los cambios, se realiza merge a la rama MASTER).
Rama Personal (Rama donde cada programador desarrolla su componente).

C- Diagrama de flujo para el uso de herramientas según los componentes a construir:
![image](https://github.com/MR-DW/TaskList_Grupo1AP56/assets/105668337/88a18b66-d84a-423a-a0ca-52f4aa2ca33d)

