# MELI Frontend Challenge

Este repositorio contiene la solución al test práctico de frontend proporcionado por Mercado Libre.

## 🔗 Link del proyecto desplegado en Vercel

https://meli-frontend-challenge-itpe6z9rz-wawis-projects-253f345d.vercel.app/

## 💡 Descripción

La aplicación simula una versión reducida del sitio de Mercado Libre. Permite a los usuarios buscar productos, ver resultados con paginación y acceder al detalle de cada producto.

> Por las limitaciones del mock proporcionado, solo el primer resultado muestra datos; los demás arrojan error.

## 🚀 Funcionalidades implementadas

- 🔍 Barra de búsqueda con historial reciente (almacenado en `localStorage`).
- 🛍️ Listado de productos filtrados y paginados.
- 📄 Página de detalle de producto con imágenes y descripción.
- 🧪 Tests unitarios e integración con cobertura.

## 🧱 Stack tecnológico

- React
- React Router
- Zustand (manejo de estado)
- Tailwind CSS (estilos)
- Vitest + Testing Library (testeo)
- TypeScript

### 📌 Decisiones técnicas

- **Zustand**: preferí Zustand sobre Redux porque es una herramienta ligera y eficiente para manejar estado global. Aunque no era estrictamente necesario en un proyecto de este tamaño, lo integré pensando en la escalabilidad, especialmente para la funcionalidad de búsqueda, que podría crecer con más filtros y lógica.
- **Tailwind CSS**: lo elegí por su rapidez de desarrollo y bajo overhead para proyectos pequeños. Si este proyecto creciera en tamaño, consideraría usar estilos modulares o una solución CSS-in-JS para mejor mantenibilidad.

- **Vitest**: al utilizar Vite como bundler, Vitest fue la opción más natural y rápida para las pruebas.

- **TypeScript**: para mejorar la robustez del código, evitar errores comunes y mejorar la DX (developer experience).

## 📦 Instalación

```bash
git clone https://github.com/goncy/mercadolibre-details-challenge.git
cd meli-frontend-challenge
npm install
npm run dev
```

## 🔧 Tests

```bash
npm run test
npm run test:coverage
```

> El proyecto cuenta con más del 80% de cobertura, incluyendo tests para componentes, hooks y flujos principales.

## 📁 Estructura del proyecto

```
src/
├── Components/         # Componentes reutilizables (paginador, íconos, etc)
├── features/           # Vistas principales como Home, Product Detail y SearchBar
├── services/           # Lógica de acceso a datos mockeados
├── stores/             # Zustand store para la búsqueda
├── types/              # Tipos TypeScript globales
├── App.tsx             # Enrutador principal
├── main.tsx            # Entrada de la app
└── styles.css          # Tailwind y estilos generales
```

## 📄 Consideraciones

- Se usan mocks locales (`/mock/*.json`) para simular la API de MELI.
- Se introdujo un `setTimeout` artificial de 2 segundos para simular latencia real.
- El diseño intenta respetar la estética de Mercado Libre sin replicarla exactamente.
- El código está estructurado de forma modular y escalable, con una clara separación de responsabilidades.

## 🛠️ Mejoras futuras

Si tuviera más tiempo me gustaría:

- Pulir más la vista de detalle del producto, dándole estado con Zustand para simplificar el flujo de datos.
- Aumentar la cobertura de tests e incluir pruebas de integración más completas.
- Crear una interfaz responsive más elaborada, no solo reubicando elementos sino usando componentes específicos para mobile.
- Ampliar el mock para que la barra de búsqueda permita filtrar por categorías, y para que más productos tengan datos completos.
- Añadir una sección de productos destacados en la Home con un diseño de tarjeta alternativo.

---

Desarrollado por **Lucas Piantini** para el challenge técnico de Mercado Libre.
