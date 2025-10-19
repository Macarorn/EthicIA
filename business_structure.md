# Business Structure

## Introducción

Este documento describe la estructura de negocio del proyecto EthicIA.



# Variables Clave

### Usuarios

- **Id**: Identificador único del usuario.
- **Nombre**: Nombre completo del usuario.
- **Correo Electrónico**: Para autenticación y comunicación.
- **Contraseña**: Para autenticación (almacenada de forma segura).
- **Rol**: Aprediz o Administrador (el rol de Administrador será asignado desde el backend).

## Flujo de Trabajo

1. **Registro de Usuarios**:

   - El usuario se registra proporcionando su nombre, correo electrónico, contraseña.
   - Durante el registro, el rol se asigna como "Aprendiz" por default.
   - El rol de Administrador no se asigna en esta etapa; será gestionado posteriormente desde el backend.


---

_Este documento está sujeto a cambios a medida que el proyecto evolucione._
