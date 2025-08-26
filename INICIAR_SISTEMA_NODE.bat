@echo off
chcp 65001 >nul
title Sistema Empresarial - Iniciando com Node.js...

echo.
echo ========================================
echo    🚀 SISTEMA EMPRESARIAL (NODE.JS)
echo ========================================
echo.
echo Iniciando servidor HTTP...
echo.

:: Verifica se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERRO: Node.js não encontrado!
    echo.
    echo Por favor, instale o Node.js em: https://nodejs.org
    echo Ou use o arquivo INICIAR_SISTEMA.bat se tiver Python
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js encontrado!
echo.

:: Verifica se http-server está instalado
npx http-server --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Instalando http-server...
    npm install -g http-server
    echo.
)

echo 🌐 Iniciando servidor na porta 8000...
echo 📱 Acesse: http://localhost:8000/static/index.html
echo.
echo ⚠️  MANTENHA ESTA JANELA ABERTA!
echo.
echo ========================================
echo.

:: Inicia o servidor HTTP
cd /d "%~dp0"
http-server -p 8000

echo.
echo Servidor parado.
pause
