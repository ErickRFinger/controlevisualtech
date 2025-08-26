@echo off
chcp 65001 >nul
title Teste de Caminhos

echo.
echo ========================================
echo    TESTE DE CAMINHOS - SISTEMA
echo ========================================
echo.

:: Obter o diretório onde está o arquivo .bat
set "SCRIPT_DIR=%~dp0"
echo Diretorio do script: %SCRIPT_DIR%

:: Verificar se a pasta static existe
if exist "%SCRIPT_DIR%static" (
    echo ✓ Pasta static encontrada
) else (
    echo ✗ Pasta static NAO encontrada
    goto :erro
)

:: Verificar arquivos principais
if exist "%SCRIPT_DIR%static\index.html" (
    echo ✓ index.html encontrado
) else (
    echo ✗ index.html NAO encontrado
    goto :erro
)

if exist "%SCRIPT_DIR%static\app.js" (
    echo ✓ app.js encontrado
) else (
    echo ✗ app.js NAO encontrado
    goto :erro
)

if exist "%SCRIPT_DIR%static\style.css" (
    echo ✓ style.css encontrado
) else (
    echo ✗ style.css NAO encontrado
    goto :erro
)

echo.
echo ========================================
echo    TODOS OS ARQUIVOS ENCONTRADOS!
echo ========================================
echo.
echo Agora execute o INICIAR.BAT
echo.
pause
exit /b 0

:erro
echo.
echo ========================================
echo    PROBLEMA ENCONTRADO!
echo ========================================
echo.
echo Listando arquivos na pasta atual:
dir /b
echo.
echo Listando arquivos na pasta static (se existir):
if exist "%SCRIPT_DIR%static" (
    dir /b "%SCRIPT_DIR%static"
) else (
    echo Pasta static nao existe!
)
echo.
pause
exit /b 1
