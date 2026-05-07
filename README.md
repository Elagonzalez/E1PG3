# antigravity-app

## ¿Qué es este proyecto?

Esta es una aplicación móvil que desarrollé como ejercicio práctico, usando Ionic con React y TypeScript. La llamé "antigravity" porque quise jugar con la idea de desafiar la gravedad visualmente, creando una experiencia inmersiva y futurista. El proyecto tiene un efecto de partículas interactivo que se mueve como si no hubiera gravedad, inspirado en la página de Google Antigravity.

## Tecnologías que usé

- **React 19**: Para construir la interfaz de usuario con componentes.
- **TypeScript**: Porque me gusta tener el código tipado y evitar errores.
- **Ionic React 8**: Para los componentes visuales y la estructura móvil.
- **Vite**: Como herramienta de construcción, es muy rápida.
- **Framer Motion**: Para las animaciones de entrada de las páginas, me permite hacer cosas muy fluidas.
- **Capacitor**: Por si quiero convertir esto en una app nativa después.

## Cómo ejecutar el proyecto

Primero instalas las dependencias:
```bash
npm install
```

Luego levantas el servidor de desarrollo:
```bash
npm run dev
```

Si quieres construir la versión de producción:
```bash
npm run build
```

---

## Documentación del código fuente

Aquí voy a explicar con mis palabras qué hace cada parte del código que yo programé.

### `src/main.tsx` - El punto de partida

Este archivo es donde todo comienza. Aquí le digo a React que tome mi aplicación (el componente `App`) y lo renderice dentro del elemento del DOM que tiene el id "root". Uso `createRoot` porque es la forma moderna de hacerlo en React 19. Envolví todo en `StrictMode` para que React me ayude a encontrar errores durante el desarrollo.

### `src/App.tsx` - El esqueleto de la aplicación

Este es el componente principal donde armé toda la estructura. Usé `IonApp` como contenedor principal de Ionic. Lo más importante aquí es que integré el efecto de partículas con el componente `MouseTrail`, que siempre está activo.

Usé `IonReactRouter` para manejar las rutas, y `IonSplitPane` para tener ese menú lateral que se puede mostrar u ocultar, lo conecté con el componente `Menu`. Dentro de `IonRouterOutlet` definí tres rutas: Inicio, Perfil y Contacto. Si alguien entra a la raíz "/", lo redirijo automáticamente a "/home".

También importé todos los estilos de Ionic que necesito (normalize, estructura, tipografía) y mis propios temas de la carpeta `theme`.

### `src/components/MouseTrail.tsx` - El efecto de partículas (Lo más complejo)

Aquí fue donde más tiempo invertí. Este archivo crea un efecto visual de red de partículas flotantes sobre toda la aplicación.

**La clase Particle:**
Cada partícula es un objeto con posición (x, y), velocidad (vx, vy), tamaño y color. La propiedad `density` la usé para variar un poco el comportamiento de cada una. El color lo hice blanco con transparencia para que sea sutil y no moleste la lectura.

**El movimiento:**
En el método `update`, cada partícula se mueve sumando su velocidad a su posición. Si llega a los bordes del canvas, invierto su velocidad para que rebote y se quede dentro de la pantalla. También agregué una corrección de posición por si alguna partícula se sale un poco.

**La interacción con el mouse:**
Esta es mi parte favorita. Cuando muevo el mouse, detecto la distancia entre el cursor y cada partícula. Si están cerca (menos de 200 píxeles), aplico una fuerza de repulsión. Usé una fórmula cuadrática `(force * force * 8)` para que el empuje sea suave cuando está lejos y más fuerte cuando está cerca del cursor, así se siente más natural.

**Dibujar las líneas:**
En la función `animate`, recorro todas las partículas y por cada par que esté cerca (menos de 180 píxeles), dibujo una línea. La opacidad de la línea depende de qué tan cerca estén: si están muy cerca la línea se ve más, si están lejos se desvanece. Esto crea ese efecto de "constelación" o red.

**El canvas:**
Manejo el redimensionamiento de la ventana con `handleResize`. Ahí calculo cuántas partículas crear basándome en el tamaño de la pantalla (entre más grande, más partículas, pero con un máximo de 120 para no matar la computadora).

### `src/pages/Home.tsx` - Página de bienvenida

Esta es la primera página que ve el usuario. Quise darle una entrada dramática usando Framer Motion. El título principal "Bienvenido profesor Carlos Márquez" entra con un efecto de opacidad y movimiento hacia arriba.

Creé una tarjeta con efecto "glassmorphism" (el fondo semitransparente con desenfoque) que contiene el mensaje principal. Le puse un pequeño delay a la animación para que se vea que entra después del título. Al final, dejé un mensaje para que el usuario mueva el mouse y pruebe el efecto que programé en `MouseTrail`.

### `src/pages/Profile.tsx` - Mi información personal

En esta página decidí mostrar mi perfil profesional. El avatar tiene una animación de tipo "spring" (resorte), lo que hace que rebote un poco al aparecer, me pareció divertido y acorde al tema "antigravity".

La información está organizada en una tarjeta de vidrio similar a la de inicio. Puse mi nombre, mi rol como Desarrollador Full Stack, y mis datos de contacto (email y ubicación). La biografía la escribí con la temática del proyecto: "Apasionado por crear interfaces que desafían la gravedad".

### `src/pages/Contact.tsx` - Formulario de contacto

Una página simple para que alguien pueda enviarme un mensaje. Usé los componentes de Ionic como `IonInput` para el nombre y asunto, y `IonTextarea` para el mensaje. Todo está envuelto en una tarjeta con el mismo estilo de las otras páginas.

Las animaciones tienen pequeños retardos (delays) para que los elementos aparezcan en secuencia, dándole un efecto más profesional.

### `src/components/Menu.tsx` - El menú de navegación

Este componente usa `IonMenu` de Ionic. Es el panel lateral que se desliza. Puse un encabezado con el título "Ejercicio 1" y tres botones de navegación que usan `useHistory` de React Router para cambiar de página. Cada botón tiene un icono que le da contexto visual a la acción.

### `src/theme/antigravity.css` - El tema visual

Aquí definí los colores y efectos que dan la identidad al proyecto. El fondo es casi negro (#050505) para que las partículas blancas resalten. Los colores primarios son un degradado de cyan a azul (#00d2ff a #3a7bd5).

El efecto "glassmorphism" lo logré con la clase `.glass-card` usando `backdrop-filter: blur(12px)` y un fondo semitransparente. También definí aquí que el canvas de las partículas sea de ancho completo, fijo y sin interferir con los clics del mouse.

### `src/theme/variables.css` - Variables de Ionic

Este archivo lo dejo preparado por si quiero cambiar las variables globales de Ionic más adelante, aunque la mayoría de mis estilos los estoy manejando en `antigravity.css`.

---

## Notas del estudiante

Este proyecto me sirvió para practicar:
- Animaciones con Framer Motion
- Manipulación de canvas con TypeScript puro
- Física básica (velocidad, repulsión, rebotes) para el efecto de partículas
- Uso de Ionic React para interfaces móviles
- Crear un tema visual coherente con CSS moderno

El efecto de partículas fue el mayor reto porque tuve que entender cómo funciona `requestAnimationFrame` y cómo calcular distancias entre puntos en un plano 2D.
