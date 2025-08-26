@echo off
chcp 65001 >nul
title Sistema Empresarial - Iniciando...

echo.
echo ========================================
echo    SISTEMA EMPRESARIAL - INICIANDO
echo ========================================
echo.

:: Obter o diretório onde está o arquivo .bat
set "SCRIPT_DIR=%~dp0"
echo Diretorio do script: %SCRIPT_DIR%

:: Verificar se estamos na pasta correta
if not exist "%SCRIPT_DIR%static\index.html" (
    echo ERRO: Arquivo index.html nao encontrado!
    echo.
    echo Caminho procurado: %SCRIPT_DIR%static\index.html
    echo.
    echo Certifique-se de que este arquivo .bat esta na pasta raiz do projeto.
    echo.
    echo Estrutura esperada:
    echo controle-gestaovisual-master\
    echo ├── INICIAR.BAT
    echo ├── static\
    echo │   ├── index.html
    echo │   ├── app.js
    echo │   └── style.css
    echo └── ...
    echo.
    echo Arquivos encontrados em %SCRIPT_DIR%:
    dir /b "%SCRIPT_DIR%"
    echo.
    echo Arquivos encontrados em %SCRIPT_DIR%static:
    if exist "%SCRIPT_DIR%static" (
        dir /b "%SCRIPT_DIR%static"
    ) else (
        echo Pasta static nao encontrada!
    )
    echo.
    pause
    exit /b 1
)

echo [1/4] Verificando estrutura do projeto...
if exist "%SCRIPT_DIR%static\app.js" (
    echo    ✓ app.js encontrado
) else (
    echo    ✗ app.js nao encontrado
    goto :erro
)

if exist "%SCRIPT_DIR%static\style.css" (
    echo    ✓ style.css encontrado
) else (
    echo    ✗ style.css nao encontrado
    goto :erro
)

echo [2/4] Verificando arquivos de teste...
if exist "%SCRIPT_DIR%static\teste-botoes.html" (
    echo    ✓ Sistema de testes disponivel
) else (
    echo    ⚠ Sistema de testes nao encontrado
)

echo [3/4] Iniciando servidor local...
echo    Tentando iniciar servidor na porta 8000...

:: Tentar usar Python primeiro
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✓ Python encontrado - iniciando servidor...
    start "Servidor Sistema Empresarial" cmd /k "cd /d %SCRIPT_DIR% && python -m http.server 8000"
    timeout /t 2 /nobreak >nul
    goto :abrir_navegador
)

:: Tentar usar Node.js
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✓ Node.js encontrado - iniciando servidor...
    start "Servidor Sistema Empresarial" cmd /k "cd /d %SCRIPT_DIR% && npx http-server -p 8000"
    timeout /t 3 /nobreak >nul
    goto :abrir_navegador
)

:: Tentar usar PHP
php --version >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✓ PHP encontrado - iniciando servidor...
    start "Servidor Sistema Empresarial" cmd /k "cd /d %SCRIPT_DIR% && php -S localhost:8000"
    timeout /t 2 /nobreak >nul
    goto :abrir_navegador
)

:: Se nenhum servidor estiver disponivel, abrir direto
echo    ⚠ Nenhum servidor local encontrado
echo    Abrindo arquivo diretamente no navegador...

:abrir_navegador
echo [4/4] Abrindo sistema no navegador...

:: Tentar abrir no Chrome
start chrome "http://localhost:8000/static/index.html" 2>nul
if %errorlevel% equ 0 (
    echo    ✓ Sistema aberto no Chrome
    goto :sucesso
)

:: Tentar abrir no Firefox
start firefox "http://localhost:8000/static/index.html" 2>nul
if %errorlevel% equ 0 (
    echo    ✓ Sistema aberto no Firefox
    goto :sucesso
)

:: Tentar abrir no Edge
start msedge "http://localhost:8000/static/index.html" 2>nul
if %errorlevel% equ 0 (
    echo    ✓ Sistema aberto no Edge
    goto :sucesso
)

:: Se nenhum navegador especifico funcionar, usar o padrao
start "http://localhost:8000/static/index.html"
echo    ✓ Sistema aberto no navegador padrao

:sucesso
echo.
echo ========================================
echo    SISTEMA INICIADO COM SUCESSO!
echo ========================================
echo.
echo URL: http://localhost:8000/static/index.html
echo.
echo Para acessar o sistema de testes:
echo http://localhost:8000/static/teste-botoes.html
echo.
echo Pressione qualquer tecla para fechar...
pause >nul
exit /b 0

:erro
echo.
echo ========================================
echo    ERRO AO INICIAR O SISTEMA
echo ========================================
echo.
echo Verifique se todos os arquivos estao presentes:
echo - %SCRIPT_DIR%static\index.html
echo - %SCRIPT_DIR%static\app.js
echo - %SCRIPT_DIR%static\style.css
echo.
echo Pressione qualquer tecla para fechar...
pause >nul
exit /b 1
