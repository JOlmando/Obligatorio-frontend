# Aplicación de Gimnasio — Frontend

Frontend de una aplicación web para la gestión de visitas y reservas de un gimnasio, con funcionalidades de entrenamiento y nutrición.

El proyecto corresponde al **Obligatorio 2 de la materia Desarrollo Full Stack integrado con IA**, de la Universidad ORT Uruguay, y complementa el backend desarrollado durante el Obligatorio 1.

## Objetivo

Desarrollar una aplicación web que permita a los usuarios gestionar sus visitas al gimnasio, consultar actividades, administrar sus reservas y acceder a funcionalidades de entrenamiento y nutrición.

El frontend consume los servicios REST del backend y proporciona una interfaz gráfica para las operaciones de la aplicación, incorporando validaciones, navegación, manejo del estado global y control de acceso según el tipo de usuario.

## Funcionalidades

### 1. Registro de usuarios

La aplicación permite crear una cuenta mediante un formulario de registro.

El formulario contempla:

- Validación de los campos requeridos.
- Validación de los datos ingresados.
- Campo para repetir la contraseña.
- Verificación de coincidencia entre ambas contraseñas.
- Botón de registro deshabilitado mientras los datos sean inválidos.
- Visualización de mensajes de error o confirmación devueltos por la API.
- Inicio de sesión automático después del registro, si se implementa.

### 2. Login y logout

Los usuarios pueden iniciar sesión utilizando sus credenciales.

El formulario de login contempla:

- Validación de campos obligatorios.
- Botón de ingreso deshabilitado mientras falte el usuario o la contraseña.
- Visualización de errores de autenticación.
- Acceso a las secciones protegidas después de iniciar sesión.

También se permite cerrar la sesión para que otro usuario pueda ingresar a la aplicación.

### 3. Gestión de visitas y reservas

La entidad principal de la aplicación es `Visita`.

El usuario puede consultar sus visitas y realizar las operaciones disponibles desde la interfaz.

Funcionalidades:

- Registrar una visita.
- Listar las visitas del usuario autenticado.
- Modificar una reserva.
- Cancelar una reserva.
- Filtrar las visitas.
- Consultar los resultados de forma paginada.

#### Sala de musculación

El acceso se registra mediante un check-in en el momento de ingreso al gimnasio.

La fecha y la hora se determinan desde el backend.

#### Funcional, Calistenia y Crossfit

Estas actividades funcionan mediante reservas anticipadas. El usuario selecciona la fecha y uno de los horarios disponibles.

Las reservas deben respetar las reglas de anticipación y disponibilidad establecidas por el backend.

No se permite cambiar una visita de sala de musculación a una actividad reservable ni realizar el cambio inverso.

### 4. Planes Plus y Premium

La aplicación dispone de dos planes.

**Plus**

- Permite realizar hasta cuatro visitas por semana, considerando el período de lunes a domingo.
- Todas las visitas cuentan para el límite semanal.

**Premium**

- Permite realizar una cantidad ilimitada de visitas.

La interfaz muestra la información de uso del usuario y ofrece la posibilidad de cambiar de Plus a Premium cuando corresponda.

### 5. Informe de uso

Se incluye un componente independiente para mostrar el uso de las visitas según el plan del usuario.

Para los usuarios Plus, se muestra la proporción de visitas utilizadas respecto del límite semanal de cuatro.

Para los usuarios Premium, se muestra la cantidad de visitas registradas.

Este componente permite visualizar de forma clara el consumo del servicio según el plan.

### 6. Categorías y actividades

Las categorías representan los tipos de actividades disponibles en el gimnasio:

- Sala de musculación.
- Funcional.
- Calistenia.
- Crossfit.

Los usuarios pueden consultar las categorías y sus horarios para seleccionar una actividad al realizar una reserva.

Los administradores disponen de las operaciones de gestión de categorías habilitadas por el backend.

### 7. Generación de rutinas mediante IA

La aplicación incorpora una funcionalidad para generar rutinas de entrenamiento mediante inteligencia artificial.

El usuario indica los músculos o grupos musculares que desea trabajar. El frontend envía la solicitud al backend, que consulta el servicio de IA y devuelve la rutina generada.

Las rutinas quedan asociadas al usuario que las solicita.

### 8. Funcionalidades nutricionales

La aplicación incluye funcionalidades complementarias relacionadas con nutrición.

**Consulta de productos alimenticios**

Permite consultar productos según el momento del día:

- Desayuno.
- Almuerzo.
- Merienda.
- Cena.

La información se obtiene mediante el backend a partir de una API externa de productos alimenticios e incluye los datos nutricionales disponibles.

**Calculadora nutricional**

Permite ingresar datos como sexo, edad, peso, altura, nivel de actividad y objetivo para obtener estimaciones de metabolismo basal, gasto energético diario, calorías objetivo y macronutrientes.

El cálculo se realiza mediante el servicio externo integrado en el backend.

### 9. Manejo de imágenes

La interfaz consume los endpoints de manejo de imágenes disponibles en el backend, según las funcionalidades implementadas.

### 10. Gráficos

Se incluye un componente gráfico para representar información relevante de la aplicación.

Como indicador del gimnasio, se pueden visualizar las visitas registradas agrupadas por categoría, permitiendo observar cómo se utilizan las distintas actividades.

## Tecnologías

El frontend se desarrolla utilizando las tecnologías requeridas en la consigna:

- **React:** construcción de la interfaz mediante componentes.
- **Redux:** gestión del estado global compartido entre componentes.
- **React Router:** navegación entre las distintas secciones.
- **Biblioteca de formularios:** gestión de formularios y validaciones.
- **CSS:** presentación y diseño visual de la aplicación.

El frontend consume la API REST del backend desarrollado con Node.js y Express, utilizando MongoDB como base de datos.

## Arquitectura general

La aplicación organiza la interfaz en componentes y páginas, manteniendo separadas la presentación, la gestión del estado y la comunicación con la API.

```text
Frontend React
│
├── Páginas
│   ├── Registro
│   ├── Login
│   ├── Inicio
│   ├── Visitas
│   ├── Categorías
│   ├── Rutinas
│   └── Nutrición
│
├── Componentes reutilizables
│   ├── Formularios
│   ├── Listados
│   ├── Filtros
│   ├── Informe de uso
│   └── Gráficos
│
├── Redux
│   └── Estado global compartido
│
├── React Router
│   └── Navegación y rutas protegidas
│
└── Servicios de API
    └── Comunicación con el backend
```

Esta estructura es orientativa y se ajustará a la organización definitiva del código fuente.

## Integración con el backend

El frontend consume los endpoints de la API desarrollada en el Obligatorio 1.

Las funcionalidades integradas incluyen:

- Autenticación y gestión de usuarios.
- Cambio de plan.
- CRUD de visitas.
- Filtros y paginación.
- Consulta y gestión de categorías según permisos.
- Generación de rutinas mediante IA.
- Consulta de información nutricional.
- Cálculo nutricional.
- Manejo de imágenes.

Las rutas definitivas dependen de las configuradas en el backend.

## Validaciones y manejo de errores

El frontend realiza validaciones antes de enviar las solicitudes para evitar peticiones innecesarias.

Se contemplan:

- Campos obligatorios.
- Formatos de datos.
- Repetición y coincidencia de contraseñas.
- Deshabilitación de botones cuando los formularios son inválidos.
- Mensajes de error y confirmación.
- Manejo de errores devueltos por la API.
- Restricción visual de funcionalidades según el usuario y sus permisos.

Las validaciones del frontend complementan las existentes en el backend, sin reemplazarlas.

## Instalación y ejecución

### Requisitos previos

- Node.js y npm instalados.
- Acceso al backend y a su URL base.
- Variables de entorno configuradas según el entorno de ejecución.

### Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar a la carpeta del frontend e instalar las dependencias:

```bash
cd <CARPETA_DEL_FRONTEND>
npm install
```

Configurar las variables de entorno necesarias para la comunicación con el backend.

Iniciar el servidor de desarrollo utilizando el script definido en `package.json`. Si el proyecto utiliza Vite, normalmente se ejecuta:

```bash
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
```

Los comandos definitivos deben coincidir con los scripts configurados en el proyecto.

## Variables de entorno

La URL base del backend debe configurarse mediante una variable de entorno del frontend.

Por ejemplo, si el proyecto utiliza Vite:

```env
VITE_API_URL=
```

En desarrollo se debe indicar la URL local del backend y en producción la URL publicada.

Las claves privadas y credenciales de servicios externos deben permanecer en el backend y no deben exponerse desde el frontend.

## Deploy

La aplicación se publicará en **Vercel**, de acuerdo con la consigna.

La configuración de producción deberá incluir:

- La URL pública del frontend.
- La URL del backend publicado.
- Las variables de entorno necesarias para el frontend.
- La configuración de navegación para permitir el acceso directo a las rutas de la aplicación.

## Entrega

La entrega del Obligatorio 2 contempla:

- La versión compilada de la aplicación (*build*).
- El código fuente del frontend, excluyendo la carpeta `node_modules`.
- Un archivo con el enlace a la aplicación publicada.

La entrega final debe ajustarse a las condiciones establecidas en la letra del obligatorio.

## Consideraciones sobre el uso de IA

La inteligencia artificial generativa se integra como una funcionalidad de la aplicación para generar rutinas de entrenamiento.

El código y las funcionalidades desarrolladas deben comprenderse y verificarse antes de su entrega. Las herramientas de IA utilizadas durante el desarrollo deben citarse de acuerdo con las pautas de la materia.
