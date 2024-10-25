# Proyecto de Gestión de Productos

Video de la aplicación en funcionamiento:

[ Video ](https://github.com/user-attachments/assets/4cd71189-c5a0-4ade-b64f-5a8078ba9511)

Este es un proyecto web desarrollado con Java utilizando **Spring Boot**, **Hibernate/JPA** para la persistencia, y **MySQL** como base de datos. El frontend está desarrollado en **React** con **Vite**, y está configurado para ejecutarse dentro de un contenedor Docker.

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
