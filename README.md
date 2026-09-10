# 🚀 FoodXR - Landing Page de Realidad Virtual, Aumentada y Mixta en Ingeniería de Alimentos

Landing page **minimalista, moderna e interactiva** especializada en la aplicación de tecnologías inmersivas (**Realidad Virtual - VR**, **Realidad Aumentada - AR** y **Realidad Mixta - MR**) aplicadas a la **Ingeniería de Alimentos y la Industria Agroalimentaria**.

---

## 🌟 Características Principales

1. **Diseño Minimalista e Interactivo**:
   - **Menú Lateral Izquierdo (Sidebar)**: Menú de navegación vertical fluido con estados activos, colapsable/expandible y adaptación móvil.
   - **Modo Oscuro / Modo Claro (Dark/Light Mode)**: Conmutador de tema con persistencia automática en `localStorage` y paleta de colores cuidadosamente seleccionada.
   - **Imágenes Vibrantes de Alta Calidad**: Renderizados futuristas generados que ilustran aplicaciones reales en plantas procesadoras de alimentos.

2. **Secciones de la Landing Page**:
   - **Hero Section**: Titular inmersivo con métricas clave y vista previa del gemelo digital.
   - **Módulos Tecnológicos (VR, AR, MR)**:
     - **Realidad Virtual (VR)**: Capacitación de personal sin riesgos en normas HACCP y simulación de plantas UHT.
     - **Realidad Aumentada (AR)**: Control de calidad en tiempo real e inspección térmica de la cadena de frío.
     - **Realidad Mixta (MR)**: Diseño molecular 3D de proteínas y holografía sobre biorreactores.
   - **Catálogo de Soluciones Industriales**: Módulos interactivos filtrables (Pasteurización, Cadena de Frío, Empaque y Biorreactores).
   - **Casos de Éxito**: Ejemplos reales y porcentajes de impacto en la industria láctea, de bebidas y procesamiento cárnico.
   - **Simulador Interactivo JS (Canvas)**: Demostracion dinámica en tiempo real que permite alternar entre modos de escáner AR, simulación de planta VR y holograma molecular MR.
   - **Formulario de Contacto**: Captura de solicitudes de demostración con validación visual.

---

## 📁 Estructura del Proyecto

El código está optimizado para ser lo más limpio, mantenible y simple posible:

```text
Landin-ra-rv-rm-en-alimentos/
├── index.html            # Estructura semántica HTML5 de la landing page
├── styles.css            # Estilos CSS minimalistas, sistema de temas y menú lateral
├── app.js                # Lógica interactiva JS, temas, filtros y simulador Canvas
├── server.py             # Servidor HTTP ligero en Python para ejecución en 1 paso
├── assets/
│   └── images/           # Imágenes en alta resolución con colores vivos
│       ├── vr_food_factory.jpg
│       ├── ar_quality_control.jpg
│       └── mr_molecular_food.jpg
└── README.md             # Documentación del proyecto (este archivo)
```

---

## 🛠️ Cómo Ejecutar el Proyecto

No requiere librerías ni dependencias externas complejas. Solo necesitas tener instalado **Python 3**.

### Opción 1: Ejecutar con el servidor incluido en Python
Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
python server.py
```

El servidor abrirá automáticamente la aplicación en tu navegador web en `http://localhost:8000`.

### Opción 2: Abrir directamente en el navegador
Puedes abrir directamente el archivo `index.html` en tu navegador favorito.

---

## 🎨 Paleta de Colores y Sistema de Diseño

- **Realidad Virtual (VR)**: `#3b82f6` (Azul Neón)
- **Realidad Aumentada (AR)**: `#10b981` (Verde Esmeralda)
- **Realidad Mixta (MR)**: `#8b5cf6` (Violeta Inmersivo)
- **Alimentos & Procesos**: `#f59e0b` (Ámbar Calidez)

---

## 📄 Licencia

Desarrollado para la solución de requerimientos de la industria agroalimentaria con tecnologías de vanguardia.
