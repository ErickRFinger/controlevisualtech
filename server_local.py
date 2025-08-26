#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🚀 Servidor Local para Sistema Empresarial
Rode este arquivo para testar o sistema localmente antes do deploy
"""

from flask import Flask, send_from_directory, render_template_string
import os

app = Flask(__name__)

# Configurações
PORT = 8000
HOST = '127.0.0.1'
DEBUG = True

@app.route('/')
def index():
    """Página inicial - redireciona para login"""
    return send_from_directory('static', 'login.html')

@app.route('/dashboard')
def dashboard():
    """Dashboard principal"""
    return send_from_directory('static', 'index.html')

@app.route('/<path:filename>')
def static_files(filename):
    """Servir arquivos estáticos"""
    return send_from_directory('static', filename)

@app.route('/api/health')
def health_check():
    """Verificação de saúde da API"""
    return {
        'status': 'online',
        'message': 'Sistema Empresarial rodando localmente! 🚀',
        'port': PORT,
        'host': HOST
    }

if __name__ == '__main__':
    print("🚀 Iniciando Sistema Empresarial Local...")
    print(f"📍 URL: http://{HOST}:{PORT}")
    print(f"🔐 Login: http://{HOST}:{PORT}/")
    print(f"📊 Dashboard: http://{HOST}:{PORT}/dashboard")
    print("=" * 50)
    print("💡 Dicas:")
    print("   - Use Ctrl+C para parar o servidor")
    print("   - Abra o navegador e acesse a URL acima")
    print("   - Teste o login: erick / visual3369")
    print("=" * 50)
    
    try:
        app.run(
            host=HOST,
            port=PORT,
            debug=DEBUG,
            use_reloader=True
        )
    except KeyboardInterrupt:
        print("\n🛑 Servidor parado pelo usuário")
    except Exception as e:
        print(f"❌ Erro ao iniciar servidor: {e}")
