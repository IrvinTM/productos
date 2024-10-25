# Proyecto de Gestión de Productos

Video de la aplicación en funcionamiento:

[ Video ](https://github.com/user-attachments/assets/4cd71189-c5a0-4ade-b64f-5a8078ba9511)



## Descripción del proyecto
Este es un proyecto web desarrollado con Java utilizando **Spring Boot**, **Hibernate/JPA** para la persistencia, y **MySQL** como base de datos. El frontend está desarrollado en **React** con **Vite**, y está configurado para ejecutarse dentro de un contenedor Docker.

#### Diseño

En este proyecto, he implementado una arquitectura basada en Spring Boot, donde he seguido un diseño estructurado que separa los controladores, repositorios, servicios y entidades para asegurar una mayor modularidad y mantenibilidad del código.

#### Inyección de Dependencias

Utilicé el principio de inyección de dependencias proporcionado por Spring Boot. Mediante el uso de anotaciones como @Autowired, @Service, entre otros los servicios y repositorios se inyectan automáticamente donde son necesarios, facilitando la modularidad y la flexibilidad en la construcción de la aplicación. Esto permite un código más limpio y fácilmente testeable.
Integración con el Frontend

#### Frontend
El frontend está desarrollado con React, utilizando Vite para la creación y construcción rápida de la aplicación, y está escrito en TypeScript para un mejor control de tipos y mayor robustez del código. Además, se implementó una biblioteca de componentes (shadcn) para proporcionar una experiencia de usuario más intuitiva y amigable. Esto permite un diseño más uniforme y componentes reutilizables, mejorando tanto la productividad como la consistencia visual de la aplicación.

#### Docker Compose

He configurado Docker Compose para facilitar la integración entre el frontend y backend, asegurando que ambos servicios puedan ejecutarse de manera eficiente. Con maven, puedo iniciar el backend que utiliza Spring Boot y la base de datos MySQL, junto con el frontend en React, garantizando una ejecución coordinada entre todos los componentes.

Este enfoque modular y escalable facilita el mantenimiento del proyecto, permitiendo una clara separación de responsabilidades y asegurando que cada capa pueda ser modificada y testeada de manera independiente.

## Requisitos previos

Antes de comenzar tener instalados lo siguiente

- **Java 17** o superior
- **Maven** o superior
- **Docker** y **Docker Compose** para la base de datos y el entorno frontend

## Local

###  Clonar el repositorio

Clona el repositorio a tu máquina local usando el siguiente comando:

```bash
git clone https://github.com/IrvinTM/productos.git
```
### Cambiar al directorio del proyecto

```bash
cd productos
```

###  Instalar dependencias con maven 

```bash
mvn install
```

###  Iniciar la aplicación

```bash
 mvn spring-boot:run  
```
Esto construirá y ejecutará la aplicación en el puerto 3000
<br>
ahora puedes acceder a la aplicación en [http://localhost:3000](http://localhost:3000)

## Para producción

Una vez completados los pasos anterores
podemos configurar nginx para servir la aplicación en producción

### Instalar Nginx

```bash
sudo apt update
sudo apt install nginx
```
### Configurar el bloque de servidor para un dominio
```bash
sudo nano /etc/nginx/sites-available/dominio.com
```
```nginx
server {
    listen 80;
    server_name dominio.com www.dominio.com;

    # Directorio donde se encuentra el build de la aplicación frontend
    root /productos/frontend/dist;

    index index.html;

    location / {
        try_files $uri /index.html;
    }

}
```

### Activar la configuración
    
```bash
sudo ln -s /etc/nginx/sites-available/tu-dominio.com /etc/nginx/sites-enabled/
```

### Reiniciar Nginx

```bash
sudo systemctl restart nginx
```

#### Para el certificado SSL podriamos usar cloudflare o instalarlo localmente
