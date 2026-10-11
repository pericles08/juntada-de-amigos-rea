# Organizamos una juntada de amigos

Recurso educativo abierto de Carlos Antonio Pardo. Seis estaciones para comprender un problema cotidiano, diseñar un algoritmo secuencial, representarlo con pseudocódigo, probarlo, traducirlo a Python y reflexionar.

## Usar el recurso

[Abrir el REA online](https://pericles08.github.io/juntada-de-amigos-rea/). También podés abrir `index.html` localmente en un navegador.
El sitio utiliza HTML, CSS y JavaScript, sin instalación ni compilación.

Las imágenes y actividades principales se incluyen localmente. Python utiliza Pyodide 0.27.7 desde jsDelivr y necesita internet para cargar. Las lecturas externas también requieren conexión; no se promete funcionamiento totalmente offline.

## Actividades y portafolio

- Datos compartidos sobre participantes y precio.
- Bloques ordenables con arrastre o botones.
- Simulador educativo de un subconjunto de sintaxis de PSeInt; no integra PSeInt completo.
- Pruebas del pseudocódigo y ejecución real de Python mediante Pyodide.
- Reflexión, guardado en el navegador, respaldo JSON y exportación de texto.

Las respuestas se guardan localmente en el navegador. Descargar un respaldo permite trasladarlas a otro navegador o a la versión online; el guardado de la versión local no se transfiere automáticamente al sitio web. No incluyas datos personales en las producciones.

## Software libre y contenidos abiertos

Código original: [MIT](LICENSE), software libre que se puede usar, estudiar, modificar y redistribuir, incluso comercialmente, conservando los avisos correspondientes.
Contenidos originales: [CC BY-SA 4.0](LICENSE-CONTENIDOS.md), reutilizables y adaptables con atribución a Carlos Antonio Pardo.
Ver [condiciones de reutilización](licencias/README.md) y [atribuciones de terceros](docs/ATRIBUCIONES.md).

## Desarrollo y verificación

No se necesita un servidor para abrir el recurso localmente. Para pruebas de desarrollo se utilizan Node.js, Playwright y Chromium. Los scripts están en `tests/`; se ejecutan desde el directorio padre de `pizza-party-rea`. Las variables PLAYWRIGHT_MODULE y CHROMIUM_PATH permiten indicar sus ubicaciones. Las pruebas de Python requieren acceso a internet.

La publicación permite utilizar la versión actual. La evaluación profesional de experiencia de usuario, accesibilidad y estética sigue pendiente. La [guía docente](docentes/guia-docente.html) se publica por separado de la interfaz estudiantil, con [fuente editable](docentes/guia-docente.docx). Destinatarios: primer año de secundaria, Informática, segundo cuatrimestre, con acompañamiento docente. El expediente académico y la reflexión para validar se conservan en la carpeta de entrega del autor.

La versión de entrega adopta CC BY-SA 4.0 como exige la consigna. Los permisos de copias anteriores bajo CC BY 4.0 no se revocan.
