@echo off
chcp 65001 >nul
title Sistema Empresarial - Abrindo...

echo.
echo ========================================
echo    🚀 SISTEMA EMPRESARIAL
echo ========================================
echo.
echo Iniciando servidor e abrindo sistema...
echo.

:: Verifica se Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERRO: Python não encontrado!
    echo.
    echo Por favor, instale o Python em: https://python.org
    echo.
    pause
    exit /b 1
)

echo ✅ Python encontrado!
echo.
echo 🌐 Iniciando servidor na porta 8000...
echo.

:: Inicia o servidor em background
cd /d "%~dp0"
start /min python -m http.server 8000

:: Aguarda 3 segundos para o servidor inicializar
echo ⏳ Aguardando servidor inicializar...
timeout /t 3 /nobreak >nul

:: Abre o sistema no navegador padrão
echo 📱 Abrindo sistema no navegador...
start http://localhost:8000/static/login.html

echo.
echo ✅ Sistema iniciado com sucesso!
echo 🌐 Servidor rodando em: http://localhost:8000
echo 📱 Sistema aberto no navegador
echo.
echo ⚠️  Para parar o servidor, feche todas as janelas do Python
echo.
echo ========================================
echo.
pause
