# Ejercicio 2 - Mejoras Interactivas en Antigravity App

## ¿Qué hice en este ejercicio?

Para el Ejercicio 2, me propuse hacer la aplicación mucho más interactiva. Ya tenía el efecto de partículas funcionando, pero quería que el usuario tuviera más control y que la experiencia fuera más dinámica. Así que implementé un montón de mejoras que van desde controles para las partículas hasta un modo oscuro/claro, pasando por validación de formularios y gamificación.

## Tecnologías que agregué

Además de lo que ya tenía (React, TypeScript, Ionic, Framer Motion), ahora uso:

- **Context API de React**: Para manejar el tema oscuro/claro globalmente
- **Intersection Observer API**: Para las animaciones que aparecen al hacer scroll
- **@capacitor/haptics**: Para dar feedback de vibración en dispositivos móviles
- **Hooks personalizados**: Creé varios hooks reutilizables para lógica de animaciones, hápticos y gamificación

## Nuevas características que implementé

### 1. Panel de control de partículas flotante

Agregué un panel en la esquina inferior derecha desde donde puedes controlar todo el sistema de partículas:

- **Toggle de modo**: Puedes cambiar entre repulsión (las partículas huyen del mouse) y atracción (las partículas siguen al mouse)
- **Toggle de gravedad**: Activa o desactiva la gravedad para que las partículas caigan hacia abajo
- **Slider de cantidad**: Ajusta cuántas partículas hay en pantalla (de 20 a 150)
- **Slider de velocidad**: Controla qué tan rápido se mueven las partículas (de 0.1x a 2x)
- **Slider de radio**: Cambia el radio de interacción con el mouse (de 50px a 300px)
- **Botón de reset**: Vuelve todos los valores a los predeterminados
- **Estadísticas**: Muestra cuántas partículas han sido "activadas" (por explosiones) y la distancia total que ha recorrido tu mouse

### 2. Explosiones al hacer click

Ahora cuando haces click en cualquier parte de la pantalla, se genera una explosión de partículas. Son partículas temporales que salen disparadas en todas direcciones y luego desaparecen. Esto le da un toque muy satisfactorio a la interacción.

### 3. Colores dinámicos según el tema

Las partículas cambian de color dependiendo del tema:
- **Modo oscuro**: Partículas blancas semitransparentes
- **Modo claro**: Partículas oscuras para que se vean bien sobre el fondo claro

### 4. Modo oscuro/claro

Agregué un toggle en el header de todas las páginas (icono de luna/sol) para cambiar entre tema oscuro y claro. El cambio afecta a:
- Colores de fondo y texto
- Estilo de las tarjetas glassmorphism
- Colores de las partículas
- Bordes y sombras

### 5. Animaciones al scroll (Scroll animations)

Implementé un hook personalizado `useScrollAnimation` que usa Intersection Observer. Ahora los elementos aparecen con animaciones suaves cuando haces scroll hacia ellos. Lo usé en:
- La sección hero de Home
- El avatar y tarjetas de Profile
- El formulario de Contact

### 6. Efectos hover en las tarjetas

Las tarjetas con efecto glassmorphism ahora tienen efectos hover:
- Se agrandan ligeramente (scale)
- Aparece un glow azul alrededor
- La sombra se intensifica

### 7. Validación de formulario en tiempo real

El formulario de contacto ahora valida mientras escribes:
- **Nombre y asunto**: Son obligatorios, muestran error si están vacíos
- **Mensaje**: Debe tener al menos 10 caracteres
- **Email**: Aunque no lo puse como campo, preparé la función de validación por si la necesito después

Los errores se muestran con iconos de alerta y mensajes en rojo que aparecen con animación.

### 8. Contador de caracteres animado

En el textarea del mensaje hay un contador que muestra cuántos caracteres has escrito sobre el mínimo de 10. Cambia de color:
- **Amarillo/naranja** cuando aún no llegas al mínimo
- **Verde** cuando ya cumpliste el requisito

### 9. Envío simulado con feedback

Cuando envías el formulario:
- El botón muestra "Enviando..." con un estado de loading
- Después de 2 segundos simulados, muestra "¡Enviado!" con un icono de check
- El formulario se limpia automáticamente
- El mensaje de éxito desaparece después de 3 segundos

### 10. Haptic feedback

Integré vibración en varias acciones:
- Al cambiar de tema (click en el icono luna/sol)
- Al navegar entre páginas en el menú
- Al hacer click en los botones del formulario
- Al hacer click en los social links

En dispositivos que no soportan hápticos, simplemente no hace nada (no rompe nada).

### 11. Gamificación

Agregué un sistema simple de gamificación que rastrea:
- **Partículas activadas**: Cuántas veces has hecho click para crear explosiones
- **Distancia del mouse**: La distancia total en píxeles que ha recorrido tu cursor

Estas estadísticas se muestran en el panel de control y se reinician al recargar la página (no usé localStorage como pediste).

### 12. Skills animadas en el perfil

En la página de perfil agregué una sección de habilidades con barras de progreso:
- 8 tecnologías: React (90%), TypeScript (85%), Ionic (80%), Flutter (75%), Django (70%), Node.js (85%), PostgreSQL (65%), Git (80%)
- Las barras se llenan con animación cuando la sección aparece en pantalla
- Cada barra tiene un delay diferente para que se vean llenándose en secuencia

### 13. Timeline vertical

Agregué una línea de tiempo con 3 eventos placeholder:
- 2024: Desarrollador Full Stack
- 2023: Especialización Frontend
- 2022: Inicios en Desarrollo

La línea tiene puntos decorativos y los eventos aparecen con animación secuencial. Los datos son placeholder como pediste, así que puedes editarlos después.

### 14. Social links

Agregué botones circulares para GitHub y LinkedIn:
- Tienen efecto glassmorphism igual que las tarjetas
- Efecto hover (se agrandan)
- Efecto tap (se encogen al hacer click)
- Haptic feedback al hacer click
- URLs placeholder que puedes cambiar después

### 15. Avatar interactivo

El avatar ahora tiene más interactividad:
- Efecto de rotación suave al hacer hover
- Se agranda ligeramente
- Sigue teniendo la animación de rebote tipo spring al aparecer

## Archivos nuevos que creé

- `src/context/ThemeContext.tsx`: Contexto para manejar el tema global
- `src/hooks/useScrollAnimation.ts`: Hook para animaciones al scroll con Intersection Observer
- `src/hooks/useHaptic.ts`: Hook para vibración con Capacitor
- `src/hooks/useGamification.ts`: Hook para estadísticas de gamificación
- `src/components/ParticleControls.tsx`: Componente del panel flotante de controles
- `src/components/ParticleControls.css`: Estilos del panel de control

## Archivos que modifiqué

- `src/App.tsx`: Integré ThemeProvider, agregué estado para los controles de partículas, conecté la gamificación
- `src/components/MouseTrail.tsx`: Agregué modos de interacción, explosiones, física de gravedad, colores dinámicos
- `src/pages/Home.tsx`: Toggle de tema, scroll animations, hover effects
- `src/pages/Profile.tsx`: Toggle de tema, skills, timeline, social links, avatar mejorado
- `src/pages/Contact.tsx`: Toggle de tema, validación, contador, envío simulado
- `src/components/Menu.tsx`: Haptic feedback en navegación, cambié título a "Ejercicio 2"
- `src/theme/antigravity.css`: Agregué estilos para modo claro/oscuro

## Cómo probar todo

1. Instala las dependencias si no lo has hecho: `npm install`
2. Levanta el servidor: `npm run dev`
3. Abre la aplicación en tu navegador

### Cosas que puedes probar:

- **Panel de control**: Haz click en el icono de engranaje en la esquina inferior derecha para abrir/ cerrar el panel
- **Modos de interacción**: Cambia entre repulsión y atracción y mueve el mouse para ver la diferencia
- **Explosiones**: Haz click en cualquier parte de la pantalla para ver las explosiones
- **Gravedad**: Activa la gravedad y verás cómo las partículas caen
- **Tema oscuro/claro**: Haz click en el icono de luna/sol en el header de cualquier página
- **Scroll animations**: Haz scroll en las páginas para ver los elementos aparecer
- **Hover effects**: Pasa el mouse sobre las tarjetas para ver los efectos
- **Formulario**: Intenta enviar el formulario vacío o con menos de 10 caracteres en el mensaje
- **Social links**: Haz hover sobre los iconos de GitHub y LinkedIn en el perfil
- **Haptic**: Si estás en un dispositivo móvil, sentirás vibración al interactuar

## Lo que aprendí haciendo este ejercicio

Este ejercicio me sirvió para practicar:

- **Context API**: Entender cómo manejar estado global en React
- **Custom Hooks**: Crear hooks reutilizables para lógica compartida
- **Intersection Observer**: Detectar cuando elementos entran en el viewport
- **Capacitor Haptics**: Integrar APIs nativas de dispositivos
- **Gamificación básica**: Rastrear métricas de usuario
- **Validación de formularios**: Validar en tiempo real con feedback visual
- **Animaciones complejas**: Combinar Framer Motion con scroll
- **Gestión de temas**: Implementar dark/light mode con CSS variables
- **TypeScript avanzado**: Interfaces complejas y tipos genéricos

## Notas finales

Me costó un poco hacer que el sistema de gamificación funcionara bien con el panel de control porque necesitaba pasar los datos desde el hook hasta el componente. Al final lo resolví reestructurando el componente App para tener un componente interno que usa el hook de gamificación.

También tuve que ajustar varias veces las animaciones para que no se sintieran demasiado lentas o rápidas. El balance entre delay y duration en Framer Motion es clave para que se vea natural.

El efecto de explosiones fue divertido de implementar. Tuve que crear partículas temporales con una vida limitada y hacer que desaparecieran gradualmente. Quedó muy satisfactorio al hacer click.

¡Espero que te guste el resultado! La aplicación ahora se siente mucho más viva e interactiva.
