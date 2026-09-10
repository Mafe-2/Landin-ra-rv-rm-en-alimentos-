#!/usr/bin/env python3
"""
FoodXR - Servidor Web Minimalista en Python
Servidor de archivos estáticos para la Landing Page de Realidad Virtual, Aumentada y Mixta en Ingeniería de Alimentos.

Uso:
    python server.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run_server():
    os.chdir(DIRECTORY)
    
    # Intentar asignar puerto libre
    port = PORT
    for _ in range(10):
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                url = f"http://localhost:{port}"
                print("\n=======================================================")
                print(" [ FoodXR ] Servidor Web Inmersivo Iniciado")
                print("=======================================================")
                print(f" * URL Local:    {url}")
                print(f" * Directorio:   {DIRECTORY}")
                print(" * Presiona Ctrl+C para detener el servidor")
                print("=======================================================\n")
                
                # Abrir navegador automáticamente opcional
                try:
                    webbrowser.open(url)
                except Exception:
                    pass
                
                httpd.serve_forever()
        except OSError:
            port += 1
    
    print("[ERROR] No se pudo abrir un puerto disponible.")
    sys.exit(1)

if __name__ == "__main__":
    try:
        run_server()
    except KeyboardInterrupt:
        print("\nServidor detenido por el usuario.")
        sys.exit(0)
