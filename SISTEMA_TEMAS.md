# 🎨 Sistema de Temas - Controle Interno Visual Tech

## Visão Geral

O sistema empresarial agora possui um sistema completo de temas claro e escuro, implementado tanto na tela principal quanto na tela de login. Os temas são persistentes e se aplicam automaticamente em todas as páginas do sistema.

## 🎯 Paletas de Cores

### Tema Claro (Padrão)
- **Cores Principais**: Branco, Azul e Verde
- **Azul Primário**: `#2563eb` - Para elementos principais e botões
- **Verde Secundário**: `#059669` - Para elementos secundários e sucessos
- **Verde Accent**: `#10b981` - Para destaques e elementos especiais
- **Fundos**: Branco azulado (`#f8fafc`) e branco puro (`#ffffff`)
- **Textos**: Azul escuro (`#1e293b`) e azul médio (`#475569`)

### Tema Escuro
- **Cores Principais**: Preto, Amarelo e Branco
- **Amarelo Primário**: `#fbbf24` - Para elementos principais e botões
- **Amarelo Secundário**: `#f59e0b` - Para elementos secundários
- **Amarelo Accent**: `#fcd34d` - Para destaques e elementos especiais
- **Fundos**: Preto azulado (`#0f172a`) e preto mais claro (`#1e293b`)
- **Textos**: Branco (`#f8fafc`) e branco acinzentado (`#cbd5e1`)

## 🚀 Como Usar

### Na Tela Principal (`index.html`)
1. Localize o botão de tema no header (ícone de lua/sol)
2. Clique para alternar entre os temas
3. O tema escolhido é salvo automaticamente

### Na Tela de Login (`login.html`)
1. Localize o botão de tema no canto superior direito
2. Clique para alternar entre os temas
3. O tema escolhido é salvo automaticamente

### Persistência
- O tema escolhido é salvo no `localStorage` do navegador
- Ao recarregar a página, o último tema escolhido é aplicado automaticamente
- O tema é consistente em todas as páginas do sistema

## 🔧 Implementação Técnica

### Arquivos Modificados
- `static/style.css` - Estilos principais e tema escuro
- `static/login-style.css` - Estilos da tela de login e tema escuro
- `static/app.js` - Funcionalidade de toggle de tema na tela principal
- `static/login.js` - Funcionalidade de toggle de tema na tela de login
- `static/index.html` - Botão de tema no header
- `static/login.html` - Botão de tema na tela de login

### Funcionalidades Implementadas
- **Toggle de Tema**: Alterna entre claro e escuro
- **Persistência**: Salva a escolha do usuário
- **Aplicação Automática**: Aplica o tema salvo ao carregar
- **Transições Suaves**: Mudanças animadas entre temas
- **Responsividade**: Funciona em todos os dispositivos

### Variáveis CSS
O sistema utiliza variáveis CSS para facilitar a manutenção:
```css
:root {
    --primary-color: #2563eb; /* Azul para tema claro */
    --secondary-color: #059669; /* Verde para tema claro */
    --bg-primary: #f8fafc; /* Fundo para tema claro */
    /* ... outras variáveis */
}

body.dark-theme {
    --primary-color: #fbbf24; /* Amarelo para tema escuro */
    --secondary-color: #f59e0b; /* Amarelo mais escuro */
    --bg-primary: #0f172a; /* Fundo para tema escuro */
    /* ... outras variáveis */
}
```

## 📱 Elementos Suportados

### Tema Claro
- Header com fundo branco e bordas azuis
- Cards com fundo branco e sombras azuis
- Botões com gradientes azuis e verdes
- Tabelas com fundo branco e bordas azuis
- Formulários com fundo branco e bordas azuis

### Tema Escuro
- Header com fundo preto e bordas amarelas
- Cards com fundo preto e bordas amarelas
- Botões com gradientes amarelos
- Tabelas com fundo preto e bordas amarelas
- Formulários com fundo preto e bordas amarelas

## 🎨 Personalização

### Adicionando Novos Elementos
Para adicionar suporte a temas em novos elementos:

1. **Definir variáveis CSS**:
```css
:root {
    --novo-elemento-bg: #ffffff;
    --novo-elemento-border: #2563eb;
}

body.dark-theme {
    --novo-elemento-bg: #1e293b;
    --novo-elemento-border: #fbbf24;
}
```

2. **Aplicar as variáveis**:
```css
.novo-elemento {
    background: var(--novo-elemento-bg);
    border: 1px solid var(--novo-elemento-border);
}
```

### Modificando Cores Existentes
Para alterar as cores dos temas:

1. **Tema Claro**: Modifique as variáveis no `:root`
2. **Tema Escuro**: Modifique as variáveis no `body.dark-theme`

## 🧪 Testando

### Página de Demonstração
Acesse `theme-demo.html` para ver uma demonstração completa dos temas:
- Visualização das paletas de cores
- Explicação das funcionalidades
- Teste interativo dos temas

### Navegação
- **Login**: `login.html`
- **Sistema Principal**: `index.html`
- **Demonstração**: `theme-demo.html`

## 🔍 Solução de Problemas

### Tema Não Está Aplicando
1. Verifique se o JavaScript está carregando
2. Verifique o console do navegador para erros
3. Verifique se o `localStorage` está funcionando

### Cores Não Estão Corretas
1. Verifique se as variáveis CSS estão definidas
2. Verifique se os seletores estão corretos
3. Verifique se não há conflitos de CSS

### Botão de Tema Não Funciona
1. Verifique se a função `toggleTheme()` está definida
2. Verifique se o evento `onclick` está correto
3. Verifique se o elemento existe no DOM

## 📚 Recursos Adicionais

### Ícones
- **Tema Claro**: `fas fa-moon` (lua)
- **Tema Escuro**: `fas fa-sun` (sol)

### Animações
- Transições suaves entre temas
- Efeitos de hover e focus
- Animações de carregamento

### Responsividade
- Funciona em desktop, tablet e mobile
- Adapta-se a diferentes tamanhos de tela
- Mantém a usabilidade em todos os dispositivos

## 🤝 Contribuição

Para contribuir com melhorias no sistema de temas:

1. Teste as mudanças em ambos os temas
2. Mantenha a consistência visual
3. Documente novas funcionalidades
4. Teste em diferentes dispositivos

---

**Desenvolvido para o Sistema Empresarial Controle Interno Visual Tech** 🚀
