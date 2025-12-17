# Sistema de Inventario

Sistema de inventario de escritorio desarrollado con Tauri, Angular y SQLite.

## Características

- Gestión completa de artículos de inventario (CRUD)
- Carga de imágenes para cada artículo
- Base de datos SQLite local
- Exportación de inventario a CSV
- Interfaz moderna con Tailwind CSS

## Tecnologías

- **Frontend**: Angular 20 + Tailwind CSS
- **Backend**: Rust (Tauri)
- **Base de datos**: SQLite (local)
- **Formato de exportación**: CSV

## Requisitos Previos

- Node.js (v18 o superior)
- Rust (última versión estable)
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd inventario-servicio
```

2. Instalar dependencias de Node:
```bash
npm install
```

3. Las dependencias de Rust se instalarán automáticamente al ejecutar la aplicación.

## Ejecución en Desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run tauri dev
```

Esto iniciará:
- El servidor de desarrollo de Angular en http://localhost:1420
- La aplicación de escritorio Tauri

## Compilación para Producción

Para crear un ejecutable de producción:

```bash
npm run tauri build
```

El ejecutable se generará en `src-tauri/target/release/`.

## Estructura del Proyecto

```
inventario-servicio/
├── src/                          # Código Angular
│   ├── app/
│   │   ├── inventory/           # Componente de inventario
│   │   ├── services/            # Servicios Angular
│   │   └── ...
│   └── styles.css               # Estilos globales con Tailwind
└── src-tauri/                   # Código Rust
    ├── src/
    │   └── lib.rs              # Comandos Tauri y lógica de base de datos
    └── Cargo.toml              # Dependencias Rust

Directorio de datos de la app (creado automáticamente):
<AppData>/com.gumi.inventario-servicio/
├── inventario.db               # Base de datos SQLite
└── inventory_images/           # Imágenes de artículos

Carpeta del ejecutable:
└── inventario_export.csv       # Archivo CSV exportado (se crea al exportar)
```

## Funcionalidades

### Agregar Artículo
1. Click en el botón "Agregar Artículo"
2. Ingresar el nombre del artículo
3. Ingresar la cantidad necesaria
4. Ingresar la cantidad disponible
5. Seleccionar una imagen (opcional)
6. Click en "Guardar"

### Editar Artículo
1. Click en el botón "Editar" del artículo
2. Modificar el nombre, cantidades y/o imagen
3. Click en "Actualizar"

### Eliminar Artículo
1. Click en el botón "Eliminar" del artículo
2. Confirmar la eliminación

### Exportar a CSV
1. Click en el botón "Exportar CSV"
2. El archivo se guardará en la misma carpeta donde está el ejecutable de la aplicación como `inventario_export.csv`
3. La aplicación mostrará la ruta completa del archivo exportado

## Base de Datos

La base de datos SQLite (`inventario.db`) se crea automáticamente en el directorio de datos de la aplicación la primera vez que ejecutas la aplicación.

**Ubicación de los datos:**
- Windows: `C:\Users\<usuario>\AppData\Roaming\com.gumi.inventario-servicio\`
- Linux: `~/.local/share/com.gumi.inventario-servicio/`
- macOS: `~/Library/Application Support/com.gumi.inventario-servicio/`

**Esquema de la tabla `inventory`:**
- `id`: INTEGER PRIMARY KEY AUTOINCREMENT
- `name`: TEXT NOT NULL
- `image_path`: TEXT
- `cantidad_necesaria`: INTEGER NOT NULL DEFAULT 0
- `cantidad_disponible`: INTEGER NOT NULL DEFAULT 0
- `created_at`: DATETIME DEFAULT CURRENT_TIMESTAMP

## Almacenamiento de Imágenes

Las imágenes se guardan en la subcarpeta `inventory_images/` dentro del directorio de datos de la aplicación, en formato PNG. Cada imagen tiene un nombre único basado en timestamp.

## IDE Recomendado

[VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) + [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template).

## Solución de Problemas

### Las imágenes no se cargan
Asegúrate de que la configuración de Tauri permite el protocolo de assets en `src-tauri/tauri.conf.json`:
```json
"assetProtocol": {
  "enable": true,
  "scope": ["**"]
}
```

### Error al compilar Rust
Verifica que tienes la última versión de Rust instalada:
```bash
rustup update
```

### Error de permisos en Windows
Ejecuta el terminal como administrador si encuentras problemas de permisos al crear archivos.

## Licencia

MIT
