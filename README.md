Este repositorio contiene la solución al test práctico de frontend proporcionado por Mercado Libre.

## Link del proyecto deployado Vercel!
- https://meli-frontend-challenge-itpe6z9rz-wawis-projects-253f345d.vercel.app/

## 💡 Descripción

La aplicación simula una versión reducida del sitio de Mercado Libre. Permite a los usuarios buscar productos, ver resultados con paginación, y acceder al detalle de cada producto (Por las limitaciones del mock proporcionado solo el primer resultado muestra datos, los demas arrojan error).

## 🚀 Funcionalidades implementadas

- 🔍 Barra de búsqueda con historial reciente (almacenado en `localStorage`).
- 🛍️ Listado de productos filtrados y paginados.
- 📄 Página de detalle de producto con imágenes y descripción.
- 💰 Información monetaria con cuotas, envío, precio original y descuento.
- ⭐ Calificaciones y reviews.
- 🧪 Test unitarios y de integración con cobertura.

## 🧱 Tech stack

- React
- React Router
- Zustand (manejo de estado)
- Tailwind CSS (estilos)
- Vitest + Testing Library (testeo)
- TypeScript

Decidi usar Zustand en vez de Redux por que es una herramienta que me gusta mucho para manejar el estado global
del proyecto, aun que es cierto que no era estrictamente necesario para un proyecto de este tamaño lo quize integrar
por temas de escabilidad sobre todo con la feature de la busqueda en la que se pueden ampliar de tantas formas

Decidi usar Tailwind por que es una herramienta muy buena para proyectos pequeños ya que a coste de un poco de ruido en
el HTML permite la creacion rapida de una interfaz estetica y con menos archivos. si el proyecto estuviera pensado a mas
grande escala podria optar por no usarla.

Use Vitest en vez de Jest por que al usar Vite para levantar el proyecto es la herramienta ideal de testeo

Use Typescript para que el codigo sea mas robusto y menos propenso a errores

## 📦 Instalación

```bash
git clone https://github.com/goncy/mercadolibre-details-challenge.git
cd meli-frontend-challenge
npm install
npm run dev

```
## 🔧 Test

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
- Se introdujo un `setTimeout` artificial de 2s para simular latencia real.
- El diseño intenta respetar la estética de Mercado Libre sin depender de su diseño exacto.
- El código es modular y escalable con separación clara por responsabilidades.


Si tuviera mas tiempo me gustaria:
- Pulir mas la feature del detalle del producto dandole algun tipo de estado con Zustand 
para facilitar la lectura del codigo.

- Llevar el test coverage a un numero mas alto e incluir pruebas integrales

- Crear una estetica responsive mas compleja a que solo se muevan los componentes para que
  entren a la pantalla si no tener componentes especializados para el formato en el que se consume la app

- Editar a profundidad el Mock para incluir mas funcionalidades como filtrar la barra de busqueda o que los productos
  tengan mas categorias

- Agregar productos en la Home con otro diseño de Card  


Desarrollado por Lucas Piantini para el challenge técnico de Mercado Libre.