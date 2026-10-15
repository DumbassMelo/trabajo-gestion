# AdventureWorks - Proyecto de Gestión

Sistema completo de gestión y catálogo de productos basado en la base de datos AdventureWorks, desarrollado con una arquitectura desacoplada: **ASP.NET Core Web API** en el backend y **React + Vite** en el frontend.

---

## 📋 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada) y npm.
- [.NET SDK](https://dotnet.microsoft.com/download) (versión 8.0 o superior).
- [SQL Server](https://www.microsoft.com/sql-server/) con la base de datos AdventureWorks restaurada y accesible.

---

## 🚀 Inicio Rápido

### 1. Clonar el repositorio
`ash
git clone https://github.com/DumbassMelo/trabajo-gestion.git
cd trabajo-gestion
`

---

### 2. Frontend (React + Vite)

Tienes dos formas de instalar y ejecutar el frontend:

#### Opción A (Desde la raíz del proyecto - Recomendada)
El proyecto cuenta con *npm workspaces* configurado, por lo que puedes ejecutar todo desde la raíz:
`ash
# 1. Instalar todas las dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev:frontend
`

#### Opción B (Desde la carpeta frontend)
`ash
# 1. Entrar a la carpeta frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
`

El frontend estará disponible en: **http://localhost:5173**

#### Configuración de Variables de Entorno (Opcional)
Por defecto, el frontend se conecta a https://localhost:7285/api. Si tu backend corre en otro puerto u host, crea un archivo .env en la carpeta rontend/:
`ash
# En la carpeta frontend/
cp .env.example .env
`
Y edita VITE_API_URL:
`env
VITE_API_URL=https://localhost:7285/api
`

---

### 3. Backend (ASP.NET Core Web API)

Para iniciar la API:

#### Vía Terminal / .NET CLI:
`ash
cd backend/Adventureworks/Adventureworks
dotnet restore
dotnet run
`

#### Vía Visual Studio:
1. Abre la solución ackend/Adventureworks/Adventureworks.slnx en Visual Studio.
2. Configura tu cadena de conexión a SQL Server en ppsettings.json o ppsettings.Development.json.
3. Presiona **F5** o haz clic en **Iniciar depuración** (perfil https: https://localhost:7285).

Documentación interactiva de Swagger disponible en:
**https://localhost:7285/swagger**

---

## 📁 Estructura del Repositorio

`	ext
trabajo-gestion/
├── .gitignore              # Ignora node_modules, dist, bin, obj, .vs, .env
├── package.json            # Configuración de workspaces y scripts raíz
├── README.md               # Guía principal del proyecto
├── backend/                # API REST en ASP.NET Core
│   └── Adventureworks/
│       ├── Controllers/    # Controladores de la API (Auth, Products, etc.)
│       ├── Models/         # Modelos de EF Core
│       └── Program.cs      # Configuración de pipeline, CORS y JWT
└── frontend/               # Aplicación cliente React + Vite
    ├── .env.example        # Plantilla de variables de entorno
    ├── .gitignore          # Reglas locales de git
    ├── package.json        # Dependencias (React, Vite, Axios, React Router)
    └── src/
        ├── services/api.js # Cliente HTTP centralizado con token JWT
        ├── components/     # Componentes reutilizables (Navbar, ProtectedRoute)
        └── pages/          # Páginas (Home, Login, Register, ProductDetail)
`
