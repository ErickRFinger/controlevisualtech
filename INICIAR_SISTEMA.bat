@echo off
chcp 65001 >nul
title Sistema Empresarial - Iniciando...

echo.
echo ========================================
echo    🚀 SISTEMA EMPRESARIAL
echo ========================================
echo.
echo Iniciando servidor HTTP...
echo.

:: Verifica se Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERRO: Python não encontrado!
    echo.
    echo Por favor, instale o Python em: https://python.org
    echo Ou use o arquivo INICIAR_SISTEMA_NODE.bat se tiver Node.js
    echo.
    pause
    exit /b 1
)

echo ✅ Python encontrado!
echo.
echo 🌐 Iniciando servidor na porta 8000...
echo 📱 Acesse: http://localhost:8000/static/index.html
echo.
echo ⚠️  MANTENHA ESTA JANELA ABERTA!
echo.
echo ========================================
echo.

:: Inicia o servidor HTTP
cd /d "%~dp0"
python -m http.server 8000

echo.
echo Servidor parado.
pause
