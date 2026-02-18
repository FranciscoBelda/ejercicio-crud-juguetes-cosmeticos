

# Gestión de Inventario - Juguetes y Cosméticos

Este proyecto es una aplicación frontend desarrollada con **Angular** diseñada para gestionar el inventario de dos categorías de productos: **Juguetes** y **Cosméticos**. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) consumiendo una API REST externa.

## 🚀 Funcionalidades

* **Panel de Control Dual**: Gestión segregada para el catálogo de juguetes y el de cosméticos.
* **Operaciones CRUD**:
* Listado dinámico de productos.
* Formularios de alta de nuevos artículos.
* Edición de productos existentes.
* Eliminación con confirmación.


* **Buscador en tiempo real**: Filtrado de productos por nombre o categoría.
* **Validaciones Avanzadas**: Uso de `ReactiveForms` para asegurar la integridad de los datos (precios positivos, campos obligatorios, etc.).

## 🛠️ Tecnologías Utilizadas

* **Angular 17+** (o versión correspondiente).
* **TypeScript**: Tipado estricto para modelos de datos.
* **Bootstrap / Ng-Bootstrap**: Para un diseño responsivo y componentes de interfaz (modales, alertas).
* **Font Awesome**: Iconografía para acciones (editar, eliminar).
* **RxJS**: Gestión de flujos de datos asíncronos y peticiones HTTP.

## 📋 Requisitos Previos

* [Node.js](https://nodejs.org/) (LTS)
* [Angular CLI](https://angular.io/cli) instalada de forma global:
```bash
npm install -g @angular/cli

```



## 🔧 Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/FranciscoBelda/ejercicio-crud-juguetes-cosmeticos.git
cd ejercicio-crud-juguetes-cosmeticos

```


2. **Instalar dependencias:**
```bash
npm install

```


3. **Configuración del Backend:**
Asegúrate de tener la API REST ejecutándose y configura la URL base en `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1' // Ajustar según tu servidor
};

```


4. **Ejecutar la aplicación:**
```bash
ng serve

```


Navega a `http://localhost:4200/`.

## 📂 Estructura del Proyecto

* `/src/app/components`: Componentes para el listado y los formularios de juguetes y cosméticos.
* `/src/app/services`: Lógica de comunicación con la API (peticiones GET, POST, PUT, DELETE).
* `/src/app/interfaces`: Definición de las interfaces `Juguete` y `Cosmetico`.
* `/src/app/shared`: Componentes comunes como Navbar o Footer.

## 🛡️ Validaciones Implementadas

El proyecto incluye validadores personalizados en los formularios para:

* Evitar nombres de productos duplicados (si la lógica lo requiere).
* Controlar que el stock sea un número entero.
* Validar formatos de precio mediante expresiones regulares.

---

**Autor:** [Francisco Belda](https://github.com/FranciscoBelda)

**Propósito:** Ejercicio académico para la práctica de Angular y consumo de servicios REST.
