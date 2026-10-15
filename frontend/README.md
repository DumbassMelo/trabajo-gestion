# Frontend - AdventureWorks

Aplicación frontend desarrollada con **React 19**, **Vite** y **React Router 7**, conectada a la API de AdventureWorks.

## 📦 Instalación

`ash
npm install
`

## 🛠️ Desarrollo

Para levantar el servidor de desarrollo local:
`ash
npm run dev
`
La aplicación abrirá por defecto en http://localhost:5173.

## ⚙️ Variables de Entorno

Puedes configurar la URL del backend creando un archivo .env basado en .env.example:

`env
VITE_API_URL=https://localhost:7285/api
`

Si no se define, se utilizará https://localhost:7285/api automáticamente.

## 🚀 Scripts Disponibles

- 
pm run dev: Inicia el servidor de desarrollo Vite con Hot Module Replacement (HMR).
- 
pm run build: Compila la aplicación para producción en la carpeta dist.
- 
pm run preview: Previsualiza localmente el build de producción.
- 
pm run lint: Ejecuta ESLint para verificar el estilo y calidad del código.
