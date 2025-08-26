# 🚀 Como Rodar o Sistema Localmente

## 📋 Pré-requisitos

- Python 3.7+ instalado
- Navegador web moderno (Chrome, Firefox, Edge)

## 🎯 Opção 1: Servidor Flask (Recomendado)

### 1. Instalar dependências
```bash
pip install flask
```

### 2. Rodar o servidor
```bash
python server_local.py
```

### 3. Acessar no navegador
- **Login:** http://127.0.0.1:8000/
- **Dashboard:** http://127.0.0.1:8000/dashboard
- **API Health:** http://127.0.0.1:8000/api/health

## 🌐 Opção 2: Servidor HTTP Simples

### 1. Navegar para a pasta
```bash
cd "C:\Users\Erick Finger\Desktop\controle-gestaovisual-master"
```

### 2. Iniciar servidor
```bash
python -m http.server 8000
```

### 3. Acessar no navegador
- **URL:** http://localhost:8000/

## 🔐 Credenciais de Teste

- **Usuário:** `erick`
- **Senha:** `visual3369`

## 📱 Funcionalidades para Testar

### ✅ Tela de Login
- [ ] Formulário de login
- [ ] Validação de credenciais
- [ ] Efeitos visuais e animações
- [ ] Redirecionamento para dashboard

### ✅ Dashboard
- [ ] Cards de estatísticas
- [ ] Gráficos interativos
- [ ] Navegação entre seções
- [ ] Responsividade mobile

### ✅ Gestão de Produtos
- [ ] Adicionar novo produto
- [ ] Listar produtos
- [ ] Editar produtos
- [ ] Excluir produtos

### ✅ Controle de Estoque
- [ ] Visualizar estoque
- [ ] Alertas de baixo estoque
- [ ] Atualizar quantidades

### ✅ Sistema de Vendas
- [ ] Registrar nova venda
- [ ] Listar vendas
- [ ] Calcular totais

### ✅ Relatórios
- [ ] Gráficos de vendas
- [ ] Estatísticas de produtos
- [ ] Análise de estoque

## 🐛 Solução de Problemas

### Erro: "Porta já em uso"
```bash
# Parar processo na porta 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Erro: "Módulo não encontrado"
```bash
# Instalar Flask
pip install flask

# Verificar instalação
python -c "import flask; print(flask.__version__)"
```

### Erro: "Permissão negada"
```bash
# Executar como administrador
# Ou usar porta diferente (8080, 3000, etc.)
```

## 🔄 Atualizações em Tempo Real

O servidor Flask com `debug=True` recarrega automaticamente quando você modifica os arquivos. Apenas salve o arquivo e recarregue a página no navegador.

## 📊 Verificar Funcionamento

1. **Servidor rodando:** http://127.0.0.1:8000/api/health
2. **Login funcionando:** Acesse a página inicial
3. **Dashboard carregando:** Após login bem-sucedido
4. **Gráficos funcionando:** Verifique se Chart.js carrega
5. **Supabase conectando:** Verifique console do navegador

## 🚀 Próximos Passos

Após testar localmente e confirmar que tudo funciona:

1. ✅ Corrigir problemas encontrados
2. ✅ Fazer commit das correções no GitHub
3. ✅ Fazer deploy no Render
4. ✅ Testar online

## 💡 Dicas de Desenvolvimento

- Use o **Console do Navegador** (F12) para ver erros
- Verifique a aba **Network** para problemas de carregamento
- Teste em diferentes navegadores
- Teste responsividade em diferentes tamanhos de tela

---

**🎯 Agora é só rodar e testar! Seu sistema vai funcionar perfeitamente localmente!**
