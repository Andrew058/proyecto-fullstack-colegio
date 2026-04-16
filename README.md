# Prueba Técnica Full Stack

Aplicación web Full Stack para la gestión de alumnos, materias y notas.

Incluye:

Backend en **Spring Boot**
Frontend en **React**
Base de datos **MySQL**
Despliegue completo con **Docker**


# Tecnologías utilizadas

# Backend

Java 17
Spring Boot 3
Spring Data JPA
Maven

# Frontend

React (Vite)
Axios
HTML + CSS

#Infraestructura

Docker
Docker Compose
MySQL 8


# Estructura del proyecto


PROYECTODESARROLLO/
    backend/           # API Spring Boot
        src/
           Dockerfile
             db/
                backup.sql
    
    frontend/          # Aplicación React
        src/
            Dockerfile

docker-compose.yml

# Variables de entorno

El backend utiliza las siguientes variables:

DB_URI=jdbc:mysql://mysql:3306/colegio_db
DB_USER=admin
DB_PASSWORD=admin123
DB_DRIVER=com.mysql.cj.jdbc.Driver



# Ejecución con Docker (IMPORTANTE)

# Clonar repositorio


git clone <URL_DEL_REPO>
cd PROYECTODESARROLLO


# 2. Levantar todo el sistema

Con un solo comando se levanta todo el sistema (backend, frontend y base de datos):
docker-compose up --build


# Acceso a la aplicación

Frontend:
  http://localhost:5173

Backend (API):
  http://localhost:8080


# Endpoints principales

# Alumnos

GET /alumnos
POST /alumnos
PUT /alumnos/{id}
DELETE /alumnos/{id}

# Materias

GET /materias
POST /materias
PUT /materias/{id}
DELETE /materias/{id}

#Notas

POST /notas
GET /notas/alumno/{id}



# Base de datos

La base de datos se levanta automáticamente con Docker.

# Restaurar datos de prueba

El proyecto incluye un backup en:

backend/db/backup.sql

Para restaurarlo:


docker exec -i mysql_db mysql -u root -proot colegio_db < backend/db/backup.sql

---

# Datos de prueba

El archivo `backup.sql` incluye:

Alumnos
Materias
Notas relacionadas

Esto permite probar inmediatamente la aplicación.


# Consideraciones importantes

No se usan rutas hardcodeadas
Configuración mediante variables de entorno
Compatible con entorno Docker limpio
Backend y frontend desacoplados

# Estado del proyecto

CRUD completo de alumnos
CRUD completo de materias
Registro de notas
Listado de notas por alumno
Integración frontend-backend
Despliegue con Docker funcionando


## Nota sobre el backup

El archivo se proporciona en formato .sql compatible con MySQL.


# Autor

Andrés Santiago Cárdenas Zabala
