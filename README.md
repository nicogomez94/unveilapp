# Unveil App - Prueba Técnica Desarrollador Móvil

Este repositorio contiene el código fuente para la prueba técnica de Desarrollador Móvil (React Native) para Unveil.

## Instrucciones para Compilar y Ejecutar el Proyecto

Sigue estos pasos para compilar y ejecutar el proyecto en tu entorno local:

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/nicogomez94/unveilapp
    cd unveilapp
    ```
2.  **Instalar las dependencias:**

    Asegurate de tener Node.js y npm o yarn instalados en tu sistema.

    ```bash
    npm install
    # o
    yarn install
    ```
3.  **Ejecutar la aplicación:**

    Para ejecutar la aplicación en un emulador o dispositivo, utiliza los siguientes comandos:

    *   Para Android:

        ```bash
        npm run android
        # o
        yarn android
        ```
    *   Para iOS:

        ```bash
        npm run ios
        # o
        yarn ios
        ```

    Asegurate de tener un emulador de Android o iOS configurado, o un dispositivo conectado a tu máquina.

## Versión de la Tecnología Utilizada

*   **React Native:** 0.72.6
*   **Node.js:** 16.x
*   **npm:** 8.x

## Dependencias Principales

A continuación, se muestra una lista de las dependencias principales utilizadas en este proyecto y su propósito:

*   **react-native:** Framework para construir aplicaciones móviles multiplataforma.
*   **@react-navigation/native:** Librería de navegación para React Native.
*   **@react-navigation/stack:** Navegador de pila para la navegación entre pantallas.
*   **zustand:** Librería para la gestión del estado de la aplicación.
*   **react-native-safe-area-context:** Proporciona un contexto para renderizar contenido de forma segura dentro de los límites de la pantalla en dispositivos iOS con "notch".
*   **react-native-screens:** Proporciona componentes nativos para mejorar el rendimiento de la navegación.