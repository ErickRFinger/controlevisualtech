# 🚀 Sistema Empresarial - Gestão Completa

Sistema de gestão empresarial completo e funcional, desenvolvido com **JavaScript puro** e **CSS moderno**.

## ✨ **Características Principais**

- 🎯 **Sistema Unificado**: Toda a lógica em um único arquivo JavaScript
- 🔗 **Integração Supabase**: Conexão automática com banco de dados
- 📱 **Interface Responsiva**: Funciona perfeitamente em todos os dispositivos
- 🎨 **Design Moderno**: Interface limpa e profissional
- ⚡ **Performance Otimizada**: Código limpo e eficiente

## 🏗️ **Estrutura do Sistema**

```
static/
├── index.html          # Interface principal
├── style.css           # Estilos CSS modernos
├── app.js             # Lógica JavaScript completa
├── sw.js              # Service Worker (PWA)
├── manifest.json      # Configuração PWA
└── icon-*.png         # Ícones do sistema
```

## 🚀 **Como Usar**

1. **Abra o arquivo** `static/index.html` no seu navegador
2. **Navegue pelas seções** usando os botões do menu
3. **Gerencie seus dados** através das tabelas interativas
4. **Use os botões de ação** para editar, excluir e gerenciar itens

## 📊 **Funcionalidades Disponíveis**

### **Dashboard**
- Visão geral dos números do negócio
- Cards informativos com estatísticas
- Alertas automáticos de estoque baixo

### **Produtos**
- Cadastro e gestão de produtos
- Controle de preços e categorias
- Acompanhamento de estoque

### **Estoque**
- Controle de quantidade em tempo real
- Alertas de estoque mínimo
- Ajustes de entrada e saída

### **Clientes**
- Cadastro completo de clientes
- Informações de contato
- Histórico de relacionamento

### **Vendas**
- Registro de vendas
- Histórico completo
- Controle de valores

### **Categorias**
- Organização de produtos
- Sistema de tags
- Filtros inteligentes

## 🔧 **Configuração do Supabase**

O sistema está configurado para conectar automaticamente com o Supabase. Se precisar alterar as credenciais:

1. Abra o arquivo `static/app.js`
2. Localize a função `initSupabase()`
3. Atualize as credenciais:

```javascript
this.supabase = window.supabase.createClient(
    'SUA_URL_SUPABASE',
    'SUA_CHAVE_PUBLICA'
);
```

## 📱 **Recursos Técnicos**

- **JavaScript ES6+**: Código moderno e limpo
- **CSS Grid & Flexbox**: Layout responsivo avançado
- **Font Awesome**: Ícones profissionais
- **Google Fonts**: Tipografia otimizada
- **PWA Ready**: Funciona offline

## 🎯 **Sistema de Botões de Ação**

Todos os botões de ação nas tabelas são **dinamicamente gerados** e **totalmente funcionais**:

- ✏️ **Editar**: Abre modal de edição
- 🗑️ **Excluir**: Remove item com confirmação
- 📦 **Estoque**: Gerencia quantidade
- 🛒 **Venda**: Registra venda rápida
- 👁️ **Visualizar**: Mostra detalhes

## 🚀 **Inicialização Automática**

O sistema se inicializa automaticamente quando a página carrega:

1. **Conecta ao Supabase**
2. **Carrega todos os dados**
3. **Configura a interface**
4. **Prepara os botões de ação**
5. **Exibe notificações de status**

## 📝 **Notas Importantes**

- ✅ **Sistema 100% funcional**
- ✅ **Todos os botões respondem**
- ✅ **Conexão Supabase ativa**
- ✅ **Interface responsiva**
- ✅ **Código limpo e organizado**

## 🎉 **Pronto para Uso!**

O sistema está **completamente funcional** e pronto para uso imediato. Todos os botões de ação funcionam perfeitamente e a integração com o Supabase está ativa.

---

**Desenvolvido com ❤️ para máxima funcionalidade e simplicidade**
