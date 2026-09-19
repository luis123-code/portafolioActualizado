# Portafolio frontend profesional

## Objetivo
Crear una página única, responsive y accesible que presente perfil, experiencia, actividad, proyectos, certificados y contacto con una estética oscura, minimalista y orientada a reclutadores.

## Alcance
- Barra fija con navegación por secciones, progreso de lectura, menú móvil y selector claro/oscuro.
- Inicio con presentación, texto rotativo, avatar, enlaces sociales y acciones para proyectos, contacto y CV.
- Métricas animadas al entrar en pantalla.
- Biografía y tecnologías con entradas escalonadas.
- Perfil y actividad de GitHub con estadísticas y mapa de contribuciones simulado.
- Seis proyectos editables con imágenes, resultados, etiquetas y enlaces.
- Seis certificados editables con visor modal accesible.
- Formulario de contacto con validación, estados de envío y confirmación local demostrativa.
- Pie de página y botón flotante para volver al inicio.

## Diseño
- Tema principal grafito con acento verde eléctrico y un modo claro equilibrado.
- Tipografía sans-serif limpia, jerarquía editorial y superficies compactas.
- Animaciones suaves de entrada, conteo, escritura y desplazamiento; se desactivan cuando el usuario prefiere menos movimiento.
- Contenido y enlaces de ejemplo agrupados en estructuras fáciles de editar.

## Implementación técnica
- Componentes React pequeños y reutilizables dentro de la ruta principal.
- Tokens semánticos y animaciones centralizadas en la hoja de estilos.
- Iconos Lucide, observadores de viewport y validación con Zod.
- El formulario simulará el envío en el navegador, ya que no se solicitó un servicio de correo.
- `/cv.pdf` y los enlaces externos quedarán como placeholders reemplazables.
- Metadatos propios para la página y navegación accesible con teclado.

## Verificación
- Comprobar carga, navegación, tema, modal, formulario y animaciones.
- Revisar visualmente escritorio y móvil, incluyendo desbordes, contraste y superposición.
