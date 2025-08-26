// 🚀 SISTEMA EMPRESARIAL SIMPLIFICADO E FUNCIONAL
// Versão limpa e otimizada

class SistemaEmpresarial {
    constructor() {
        this.supabase = null;
        this.isConnected = false;
        this.data = { produtos: [], clientes: [], categorias: [], vendas: [], estoque: [] };
        this.init();
    }

                    async init() {
                    try {
                        console.log('🚀 Inicializando Sistema Empresarial...');
                        this.loadTheme();
                        await this.initSupabase();
                        await this.loadAllData();
                        this.setupInterface();
                        this.showNotification('Sistema carregado com sucesso!', 'success');
                    } catch (error) {
                        console.error('❌ Erro na inicialização:', error);
                        this.showNotification('Erro ao inicializar sistema', 'error');
                    }
                }

    async initSupabase() {
        try {
            if (typeof window.supabase === 'undefined') {
                await this.loadSupabaseScript();
            }
            
            this.supabase = window.supabase.createClient(
                'https://txylasunasazzcyvchfe.supabase.co',
                'sb_publishable_Ifbv2VrOgiraRBhE1ZHTfA_7mQa49_H'
            );
            
            await this.testConnection();
        } catch (error) {
            console.warn('⚠️ Supabase não disponível:', error);
            this.isConnected = false;
        }
    }

    async loadSupabaseScript() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/@supabase/supabase-js@2';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async testConnection() {
        try {
            const { data, error } = await this.supabase.from('produtos').select('*').limit(1);
            if (error) throw error;
            this.isConnected = true;
            console.log('✅ Conectado ao Supabase!');
            return true;
        } catch (error) {
            console.warn('⚠️ Supabase não disponível, usando modo local');
            this.isConnected = false;
            return false;
        }
    }

    async loadAllData() {
        try {
            if (this.isConnected) {
                await Promise.all([
                    this.loadProdutos(),
                    this.loadClientes(),
                    this.loadCategorias(),
                    this.loadVendas(),
                    this.loadEstoque()
                ]);
            } else {
                this.loadDadosLocais();
            }
        } catch (error) {
            console.error('❌ Erro ao carregar dados:', error);
        }
    }

    async loadProdutos() {
        try {
            const { data, error } = await this.supabase.from('produtos').select('*');
            if (error) throw error;
            this.data.produtos = data || [];
            console.log(`📦 ${this.data.produtos.length} produtos carregados`);
        } catch (error) {
            console.error('❌ Erro ao carregar produtos:', error);
            this.data.produtos = [];
        }
    }

    async loadClientes() {
        try {
            const { data, error } = await this.supabase.from('clientes').select('*');
            if (error) throw error;
            this.data.clientes = data || [];
            console.log(`👥 ${this.data.clientes.length} clientes carregados`);
        } catch (error) {
            console.error('❌ Erro ao carregar clientes:', error);
            this.data.clientes = [];
        }
    }

    async loadCategorias() {
        try {
            const { data, error } = await this.supabase.from('categorias').select('*');
            if (error) throw error;
            this.data.categorias = data || [];
            console.log(`🏷️ ${this.data.categorias.length} categorias carregadas`);
        } catch (error) {
            console.error('❌ Erro ao carregar categorias:', error);
            this.data.categorias = [];
        }
    }

    async loadVendas() {
        try {
            const { data, error } = await this.supabase.from('vendas').select('*');
            if (error) throw error;
            this.data.vendas = data || [];
            console.log(`🛒 ${this.data.vendas.length} vendas carregadas`);
        } catch (error) {
            console.error('❌ Erro ao carregar vendas:', error);
            this.data.vendas = [];
        }
    }

    async loadEstoque() {
        try {
            const { data, error } = await this.supabase.from('estoque').select('*');
            if (error) throw error;
            this.data.estoque = data || [];
            console.log(`📦 ${this.data.estoque.length} itens de estoque carregados`);
        } catch (error) {
            console.error('❌ Erro ao carregar estoque:', error);
            this.data.estoque = [];
        }
    }

                    loadDadosLocais() {
                    // Carrega dados salvos no localStorage ou usa padrão
                    const produtosSalvos = localStorage.getItem('produtos');
                    const clientesSalvos = localStorage.getItem('clientes');
                    const categoriasSalvos = localStorage.getItem('categorias');
                    const vendasSalvos = localStorage.getItem('vendas');

                    if (produtosSalvos) {
                        this.data.produtos = JSON.parse(produtosSalvos);
                    } else {
                        this.data.produtos = [
                            { id: 1, nome: 'Notebook Dell Inspiron', preco: 2999.99, estoque: 15, estoque_minimo: 5, categoria: 'Eletrônicos' },
                            { id: 2, nome: 'Mouse Gamer RGB', preco: 89.99, estoque: 45, estoque_minimo: 10, categoria: 'Periféricos' },
                            { id: 3, nome: 'Teclado Mecânico', preco: 199.99, estoque: 25, estoque_minimo: 8, categoria: 'Periféricos' },
                            { id: 4, nome: 'Monitor 24" Full HD', preco: 599.99, estoque: 12, estoque_minimo: 3, categoria: 'Eletrônicos' }
                        ];
                        this.salvarProdutos();
                    }

                    if (clientesSalvos) {
                        this.data.clientes = JSON.parse(clientesSalvos);
                    } else {
                        this.data.clientes = [
                            { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '11999999999', cidade: 'São Paulo', status: 'ativo' },
                            { id: 2, nome: 'Maria Santos', email: 'maria@email.com', telefone: '11888888888', cidade: 'Rio de Janeiro', status: 'ativo' },
                            { id: 3, nome: 'Pedro Costa', email: 'pedro@email.com', telefone: '11777777777', cidade: 'Belo Horizonte', status: 'ativo' }
                        ];
                        this.salvarClientes();
                    }

                    if (categoriasSalvos) {
                        this.data.categorias = JSON.parse(categoriasSalvos);
                    } else {
                        this.data.categorias = [
                            { id: 1, nome: 'Eletrônicos', descricao: 'Produtos eletrônicos', status: 'ativo', observacoes: 'Categoria principal' },
                            { id: 2, nome: 'Periféricos', descricao: 'Acessórios para computador', status: 'ativo', observacoes: 'Acessórios' },
                            { id: 3, nome: 'Software', descricao: 'Programas e licenças', status: 'ativo', observacoes: 'Licenças' }
                        ];
                        this.salvarCategorias();
                    }

                    if (vendasSalvos) {
                        this.data.vendas = JSON.parse(vendasSalvos);
                    } else {
                        this.data.vendas = [
                            { id: 1, cliente: 'João Silva', produto: 'Notebook Dell Inspiron', quantidade: 1, valor: 2999.99, data: new Date().toLocaleDateString() },
                            { id: 2, cliente: 'Maria Santos', produto: 'Mouse Gamer RGB', quantidade: 2, valor: 179.98, data: new Date().toLocaleDateString() }
                        ];
                        this.salvarVendas();
                    }

                    // Atualiza estoque baseado nos produtos
                    this.atualizarEstoque();
                    console.log('📱 Dados locais carregados');
                }

                    setupInterface() {
                    this.setupNavigation();
                    this.setupActionButtons();
                    this.setupModals();
                    this.setupModalEvents();
                    this.updateDashboard();
                }

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.getAttribute('data-section');
                if (section) this.showSection(section);
            });
        });
    }

    showSection(sectionName) {
        console.log('🔄 Mostrando seção:', sectionName);
        
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => section.classList.remove('active'));
        
        const targetSection = document.getElementById(sectionName);
        if (targetSection) targetSection.classList.add('active');
        
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-section') === sectionName) btn.classList.add('active');
        });
        
        this.loadSectionData(sectionName);
    }

    loadSectionData(sectionName) {
        switch(sectionName) {
            case 'dashboard': this.updateDashboard(); break;
            case 'clientes': this.updateTabelaClientes(); break;
            case 'produtos': this.updateTabelaProdutos(); break;
            case 'estoque': this.updateTabelaEstoque(); break;
            case 'vendas': this.updateTabelaVendas(); break;
            case 'categorias': this.updateTabelaCategorias(); break;
            case 'relatorios': this.updateRelatorios(); break;
        }
    }

    setupActionButtons() {
        this.setupActionButtonsForTable('clientes', [
            { type: 'edit', icon: 'fas fa-edit', class: 'btn-warning', action: 'editarCliente' },
            { type: 'delete', icon: 'fas fa-trash', class: 'btn-danger', action: 'excluirCliente' }
        ]);
        
        this.setupActionButtonsForTable('produtos', [
            { type: 'edit', icon: 'fas fa-edit', class: 'btn-warning', action: 'editarProduto' },
            { type: 'stock', icon: 'fas fa-boxes', class: 'btn-success', action: 'ajustarEstoque' },
            { type: 'sale', icon: 'fas fa-shopping-cart', class: 'btn-primary', action: 'vendaRapida' },
            { type: 'delete', icon: 'fas fa-trash', class: 'btn-danger', action: 'excluirProduto' }
        ]);
        
        this.setupActionButtonsForTable('categorias', [
            { type: 'edit', icon: 'fas fa-edit', class: 'btn-warning', action: 'editarCategoria' },
            { type: 'delete', icon: 'fas fa-trash', class: 'btn-danger', action: 'excluirCategoria' }
        ]);
        
        this.setupActionButtonsForTable('vendas', [
            { type: 'view', icon: 'fas fa-eye', class: 'btn-info', action: 'verDetalhesVenda' },
            { type: 'cancel', icon: 'fas fa-times', class: 'btn-danger', action: 'cancelarVenda' }
        ]);
    }

    setupActionButtonsForTable(tableName, buttonConfigs) {
        const table = document.getElementById(`${tableName}-table`);
        if (!table) return;
        
        const tbody = table.querySelector('tbody');
        if (!tbody) return;
        
        this.addActionButtonsToRows(tbody, buttonConfigs);
        
        const observer = new MutationObserver(() => {
            this.addActionButtonsToRows(tbody, buttonConfigs);
        });
        
        observer.observe(tbody, { childList: true });
    }

    addActionButtonsToRows(tbody, buttonConfigs) {
        const rows = tbody.querySelectorAll('tr:not(.empty-row)');
        
        rows.forEach(row => {
            if (row.querySelector('.action-buttons')) return;
            
            let actionCell = row.querySelector('td:last-child');
            if (!actionCell) {
                actionCell = document.createElement('td');
                row.appendChild(actionCell);
            }
            
            const actionButtons = document.createElement('div');
            actionButtons.className = 'action-buttons';
            
            buttonConfigs.forEach(config => {
                const button = document.createElement('button');
                button.className = `btn ${config.class} btn-sm btn-action`;
                button.setAttribute('data-action', config.action);
                button.setAttribute('data-type', config.type);
                button.innerHTML = `<i class="${config.icon}"></i>`;
                button.title = this.getButtonTitle(config.type);
                
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleActionClick(config.action, row);
                });
                
                actionButtons.appendChild(button);
            });
            
            actionCell.innerHTML = '';
            actionCell.appendChild(actionButtons);
        });
    }

    getButtonTitle(type) {
        const titles = {
            edit: 'Editar',
            delete: 'Excluir',
            stock: 'Gerenciar Estoque',
            sale: 'Venda Rápida',
            view: 'Visualizar',
            cancel: 'Cancelar'
        };
        return titles[type] || 'Ação';
    }

    handleActionClick(action, row) {
        const id = this.getRowId(row);
        if (!id) {
            this.showNotification('ID não encontrado', 'error');
            return;
        }
        
        console.log(`🔄 Executando ação: ${action} para ID: ${id}`);
        
        switch(action) {
            case 'editarCliente': this.editarCliente(id); break;
            case 'excluirCliente': this.excluirCliente(id); break;
            case 'editarProduto': this.editarProduto(id); break;
            case 'ajustarEstoque': this.ajustarEstoque(id); break;
            case 'vendaRapida': this.vendaRapida(id); break;
            case 'excluirProduto': this.excluirProduto(id); break;
            case 'editarCategoria': this.editarCategoria(id); break;
            case 'excluirCategoria': this.excluirCategoria(id); break;
            case 'verDetalhesVenda': this.verDetalhesVenda(id); break;
            case 'cancelarVenda': this.cancelarVenda(id); break;
            default: console.warn(`⚠️ Ação não implementada: ${action}`);
        }
    }

    getRowId(row) {
        const idCell = row.querySelector('[data-id]');
        if (idCell) return idCell.getAttribute('data-id');
        
        const firstCell = row.querySelector('td:first-child');
        if (firstCell && firstCell.textContent.trim()) {
            return firstCell.textContent.trim();
        }
        
        return null;
    }

                    setupModals() {
                    const modals = document.querySelectorAll('.modal');
                    modals.forEach(modal => {
                        const closeBtn = modal.querySelector('.close');
                        if (closeBtn) {
                            closeBtn.addEventListener('click', () => this.closeModal(modal.id));
                        }

                        modal.addEventListener('click', (e) => {
                            if (e.target === modal) this.closeModal(modal.id);
                        });
                    });
                }

                setupModalEvents() {
                    // Modal de Produto
                    const modalProduto = document.getElementById('add-product-modal');
                    if (modalProduto) {
                        const btnSalvar = modalProduto.querySelector('.btn-primary');
                        if (btnSalvar) {
                            btnSalvar.addEventListener('click', () => this.salvarProduto());
                        }
                    }

                    // Modal de Cliente
                    const modalCliente = document.getElementById('add-client-modal');
                    if (modalCliente) {
                        const btnSalvar = modalCliente.querySelector('.btn-primary');
                        if (btnSalvar) {
                            btnSalvar.addEventListener('click', () => this.salvarCliente());
                        }
                    }

                    // Modal de Categoria
                    const modalCategoria = document.getElementById('add-category-modal');
                    if (modalCategoria) {
                        const btnSalvar = modalCategoria.querySelector('.btn-primary');
                        if (btnSalvar) {
                            btnSalvar.addEventListener('click', () => this.salvarCategoria());
                        }
                    }

                    // Modal de Estoque
                    const modalEstoque = document.getElementById('adjust-stock-modal');
                    if (modalEstoque) {
                        const btnAjustar = modalEstoque.querySelector('.btn-primary');
                        if (btnAjustar) {
                            btnAjustar.addEventListener('click', () => this.salvarAjusteEstoque());
                        }
                    }

                    // Modal de Venda
                    const modalVenda = document.getElementById('add-sale-modal');
                    if (modalVenda) {
                        const btnFinalizar = modalVenda.querySelector('.btn-primary');
                        if (btnFinalizar) {
                            btnFinalizar.addEventListener('click', () => this.salvarVenda());
                        }
                    }
                }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

                    closeModal(modalId) {
                    const modal = document.getElementById(modalId);
                    if (modal) {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        this.limparModal(modalId);
                    }
                }

                limparModal(modalId) {
                    const modal = document.getElementById(modalId);
                    if (!modal) return;

                    // Remove atributo de edição
                    modal.removeAttribute('data-edit-id');

                    // Limpa campos de input
                    const inputs = modal.querySelectorAll('input, textarea, select');
                    inputs.forEach(input => {
                        if (input.type !== 'submit' && input.type !== 'button') {
                            input.value = '';
                            input.disabled = false;
                        }
                    });
                }

                // FUNÇÕES DE SALVAMENTO DOS MODAIS
                salvarProduto() {
                    const nome = document.getElementById('product-name').value;
                    const categoria = document.getElementById('product-category').value;
                    const preco = parseFloat(document.getElementById('product-price').value);
                    const estoque = parseInt(document.getElementById('product-stock').value);
                    const estoqueMinimo = parseInt(document.getElementById('product-min-stock').value);

                    if (!nome || !categoria || !preco || !estoque || !estoqueMinimo) {
                        this.showNotification('Preencha todos os campos!', 'error');
                        return;
                    }

                    const modal = document.getElementById('add-product-modal');
                    const editId = modal.getAttribute('data-edit-id');

                    if (editId) {
                        // Editando produto existente
                        this.atualizarProduto(editId, { nome, categoria, preco, estoque, estoque_minimo: estoqueMinimo });
                    } else {
                        // Adicionando novo produto
                        this.adicionarProduto({ nome, categoria, preco, estoque, estoque_minimo: estoqueMinimo });
                    }

                    this.closeModal('add-product-modal');
                }

                salvarCliente() {
                    const nome = document.getElementById('client-name').value;
                    const email = document.getElementById('client-email').value;
                    const telefone = document.getElementById('client-phone').value;
                    const cidade = document.getElementById('client-city').value;

                    if (!nome || !email || !telefone || !cidade) {
                        this.showNotification('Preencha todos os campos!', 'error');
                        return;
                    }

                    const modal = document.getElementById('add-client-modal');
                    const editId = modal.getAttribute('data-edit-id');

                    if (editId) {
                        this.atualizarCliente(editId, { nome, email, telefone, cidade });
                    } else {
                        this.adicionarCliente({ nome, email, telefone, cidade, status: 'ativo' });
                    }

                    this.closeModal('add-client-modal');
                }

                salvarCategoria() {
                    const nome = document.getElementById('category-name').value;
                    const descricao = document.getElementById('category-description').value;
                    const observacoes = document.getElementById('category-observations').value;

                    if (!nome) {
                        this.showNotification('Nome da categoria é obrigatório!', 'error');
                        return;
                    }

                    const modal = document.getElementById('add-category-modal');
                    const editId = modal.getAttribute('data-edit-id');

                    if (editId) {
                        this.atualizarCategoria(editId, { nome, descricao, observacoes });
                    } else {
                        this.adicionarCategoria({ nome, descricao, observacoes, status: 'ativo' });
                    }

                    this.closeModal('add-category-modal');
                }

                salvarAjusteEstoque() {
                    const quantidade = parseInt(document.getElementById('stock-quantity').value);
                    const tipo = document.getElementById('stock-type').value;
                    const observacao = document.getElementById('stock-observation').value;

                    if (!quantidade || quantidade <= 0) {
                        this.showNotification('Quantidade deve ser maior que zero!', 'error');
                        return;
                    }

                    const modal = document.getElementById('adjust-stock-modal');
                    const editId = modal.getAttribute('data-edit-id');

                    if (editId) {
                        this.aplicarAjusteEstoque(editId, quantidade, tipo, observacao);
                        this.closeModal('adjust-stock-modal');
                    }
                }

                salvarVenda() {
                    const cliente = document.getElementById('sale-client').value;
                    const produto = document.getElementById('sale-product').value;
                    const quantidade = parseInt(document.getElementById('sale-quantity').value);
                    const preco = parseFloat(document.getElementById('sale-price').value);

                    if (!cliente || !produto || !quantidade || !preco) {
                        this.showNotification('Preencha todos os campos!', 'error');
                        return;
                    }

                    if (quantidade <= 0) {
                        this.showNotification('Quantidade deve ser maior que zero!', 'error');
                        return;
                    }

                    // Verifica se há estoque suficiente
                    const produtoEstoque = this.data.produtos.find(p => p.nome === produto);
                    if (produtoEstoque && produtoEstoque.estoque < quantidade) {
                        this.showNotification('Estoque insuficiente!', 'error');
                        return;
                    }

                    const valor = quantidade * preco;
                    this.adicionarVenda({ cliente, produto, quantidade, valor });
                    this.closeModal('add-sale-modal');
                }

                    // FUNÇÕES DE CRUD (MANTIDAS PARA COMPATIBILIDADE)
                editarCliente(id) {
                    const cliente = this.data.clientes.find(c => c.id == id);
                    if (cliente) {
                        this.preencherModalCliente(cliente);
                        this.showModal('add-client-modal');
                        this.showNotification('Editando cliente...', 'info');
                    }
                }

                excluirCliente(id) {
                    this.excluirCliente(id);
                }

                editarProduto(id) {
                    this.editarProduto(id);
                }

                ajustarEstoque(id) {
                    this.ajustarEstoque(id);
                }

                vendaRapida(id) {
                    const produto = this.data.produtos.find(p => p.id == id);
                    if (produto) {
                        this.preencherModalVenda(produto);
                        this.showModal('add-sale-modal');
                        this.showNotification('Venda rápida...', 'info');
                    }
                }

                excluirProduto(id) {
                    this.excluirProduto(id);
                }

                editarCategoria(id) {
                    const categoria = this.data.categorias.find(c => c.id == id);
                    if (categoria) {
                        this.preencherModalCategoria(categoria);
                        this.showModal('add-category-modal');
                        this.showNotification('Editando categoria...', 'info');
                    }
                }

                excluirCategoria(id) {
                    this.excluirCategoria(id);
                }

                verDetalhesVenda(id) {
                    const venda = this.data.vendas.find(v => v.id == id);
                    if (venda) {
                        this.showNotification(`Venda: ${venda.produto} - Qtd: ${venda.quantidade} - R$ ${venda.valor}`, 'info');
                    }
                }

                cancelarVenda(id) {
                    if (confirm('Tem certeza que deseja cancelar esta venda?')) {
                        const venda = this.data.vendas.find(v => v.id == id);
                        if (venda) {
                            // Restaura estoque
                            const produto = this.data.produtos.find(p => p.nome === venda.produto);
                            if (produto) {
                                produto.estoque += venda.quantidade;
                                this.atualizarEstoque();
                                this.salvarProdutos();
                            }
                            
                            // Remove venda
                            this.data.vendas = this.data.vendas.filter(v => v.id != id);
                            this.salvarVendas();
                            
                            this.showNotification('Venda cancelada com sucesso', 'success');
                            this.updateTabelaVendas();
                            this.updateDashboard();
                        }
                    }
                }

    // ATUALIZAÇÃO DAS TABELAS
    updateDashboard() {
        try {
            this.updateCard('total-produtos', this.data.produtos.length);
            this.updateCard('total-clientes', this.data.clientes.length);
            this.updateCard('total-vendas', this.data.vendas.length);
            
            const valorTotal = this.data.vendas.reduce((total, venda) => total + (venda.valor || 0), 0);
            this.updateCard('valor-vendas', valorTotal);
            
            this.updateAlertas();
        } catch (error) {
            console.error('❌ Erro ao atualizar dashboard:', error);
        }
    }

    updateCard(cardId, value) {
        const card = document.getElementById(cardId);
        if (card) {
            const numberElement = card.querySelector('.number');
            if (numberElement) {
                numberElement.textContent = value.toLocaleString('pt-BR');
            }
        }
    }

    updateAlertas() {
        const produtosBaixoEstoque = this.data.produtos.filter(p => 
            (p.estoque || 0) <= (p.estoque_minimo || 0)
        );
        
        if (produtosBaixoEstoque.length > 0) {
            this.showNotification(`${produtosBaixoEstoque.length} produtos com estoque baixo!`, 'warning');
        }
    }

    updateTabelaClientes() {
        const tbody = document.querySelector('#clientes-table tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        if (this.data.clientes.length === 0) {
            tbody.innerHTML = `
                <tr class="empty-row">
                    <td colspan="6">
                        <div class="empty-message">
                            <div class="empty-state">
                                <i class="fas fa-users"></i>
                                <h4>Nenhum cliente encontrado</h4>
                                <p>Adicione seu primeiro cliente para começar</p>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }
        
        this.data.clientes.forEach(cliente => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', cliente.id);
            row.innerHTML = `
                <td>${cliente.nome || 'N/A'}</td>
                <td>${cliente.email || 'N/A'}</td>
                <td>${cliente.telefone || 'N/A'}</td>
                <td>${cliente.cidade || 'N/A'}</td>
                <td>
                    <span class="status-badge ${cliente.status || 'ativo'}">
                        ${cliente.status || 'ativo'}
                    </span>
                </td>
                <td></td>
            `;
            tbody.appendChild(row);
        });
        
        this.addActionButtonsToRows(tbody, [
            { type: 'edit', icon: 'fas fa-edit', class: 'btn-warning', action: 'editarCliente' },
            { type: 'delete', icon: 'fas fa-trash', class: 'btn-danger', action: 'excluirCliente' }
        ]);
    }

    updateTabelaProdutos() {
        const tbody = document.querySelector('#produtos-table tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        if (this.data.produtos.length === 0) {
            tbody.innerHTML = `
                <tr class="empty-row">
                    <td colspan="7">
                        <div class="empty-message">
                            <div class="empty-state">
                                <i class="fas fa-box"></i>
                                <h4>Nenhum produto encontrado</h4>
                                <p>Adicione seu primeiro produto para começar</p>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }
        
        this.data.produtos.forEach(produto => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', produto.id);
            row.innerHTML = `
                <td>${produto.nome || 'N/A'}</td>
                <td>${produto.categoria || 'Sem categoria'}</td>
                <td>R$ ${(produto.preco || 0).toFixed(2)}</td>
                <td>${produto.estoque || 0}</td>
                <td>${produto.estoque_minimo || 0}</td>
                <td>
                    <span class="status-badge ${(produto.estoque || 0) > (produto.estoque_minimo || 0) ? 'success' : 'warning'}">
                        ${(produto.estoque || 0) > (produto.estoque_minimo || 0) ? 'Disponível' : 'Baixo'}
                    </span>
                </td>
                <td></td>
            `;
            tbody.appendChild(row);
        });
        
        this.addActionButtonsToRows(tbody, [
            { type: 'edit', icon: 'fas fa-edit', class: 'btn-warning', action: 'editarProduto' },
            { type: 'stock', icon: 'fas fa-boxes', class: 'btn-success', action: 'ajustarEstoque' },
            { type: 'sale', icon: 'fas fa-shopping-cart', class: 'btn-primary', action: 'vendaRapida' },
            { type: 'delete', icon: 'fas fa-trash', class: 'btn-danger', action: 'excluirProduto' }
        ]);
    }

    updateTabelaEstoque() {
        const tbody = document.querySelector('#estoque-table tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        if (this.data.estoque.length === 0) {
            tbody.innerHTML = `
                <tr class="empty-row">
                    <td colspan="6">
                        <div class="empty-message">
                            <div class="empty-state">
                                <i class="fas fa-boxes"></i>
                                <h4>Nenhum item de estoque encontrado</h4>
                                <p>Adicione produtos para gerenciar o estoque</p>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }
        
        this.data.estoque.forEach(item => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', item.id);
            row.innerHTML = `
                <td>${item.produto || 'N/A'}</td>
                <td>${item.quantidade || 0}</td>
                <td>${item.minimo || 0}</td>
                <td>
                    <span class="status-badge ${(item.quantidade || 0) > (item.minimo || 0) ? 'success' : 'warning'}">
                        ${(item.quantidade || 0) > (item.minimo || 0) ? 'OK' : 'Baixo'}
                    </span>
                </td>
                <td>${new Date().toLocaleDateString()}</td>
                <td></td>
            `;
            tbody.appendChild(row);
        });
        
        this.addActionButtonsToRows(tbody, [
            { type: 'stock', icon: 'fas fa-boxes', class: 'btn-success', action: 'ajustarEstoque' }
        ]);
    }

    updateTabelaVendas() {
        const tbody = document.querySelector('#vendas-table tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        if (this.data.vendas.length === 0) {
            tbody.innerHTML = `
                <tr class="empty-row">
                    <td colspan="6">
                        <div class="empty-message">
                            <div class="empty-state">
                                <i class="fas fa-shopping-cart"></i>
                                <h4>Nenhuma venda encontrada</h4>
                                <p>Registre sua primeira venda para começar</p>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }
        
        this.data.vendas.forEach(venda => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', venda.id);
            row.innerHTML = `
                <td>${venda.cliente || 'N/A'}</td>
                <td>${venda.produto || 'N/A'}</td>
                <td>${venda.quantidade || 0}</td>
                <td>R$ ${(venda.valor || 0).toFixed(2)}</td>
                <td>${venda.data || 'N/A'}</td>
                <td></td>
            `;
            tbody.appendChild(row);
        });
        
        this.addActionButtonsToRows(tbody, [
            { type: 'view', icon: 'fas fa-eye', class: 'btn-info', action: 'verDetalhesVenda' },
            { type: 'cancel', icon: 'fas fa-times', class: 'btn-danger', action: 'cancelarVenda' }
        ]);
    }

    updateTabelaCategorias() {
        const tbody = document.querySelector('#categorias-table tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        if (this.data.categorias.length === 0) {
            tbody.innerHTML = `
                <tr class="empty-row">
                    <td colspan="5">
                        <div class="empty-message">
                            <div class="empty-state">
                                <i class="fas fa-tags"></i>
                                <h4>Nenhuma categoria encontrada</h4>
                                <p>Adicione sua primeira categoria para começar</p>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }
        
        this.data.categorias.forEach(categoria => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', categoria.id);
            row.innerHTML = `
                <td>${categoria.nome || 'N/A'}</td>
                <td>${categoria.descricao || 'N/A'}</td>
                <td>
                    <span class="status-badge ${categoria.status || 'ativo'}">
                        ${categoria.status || 'ativo'}
                    </span>
                </td>
                <td>${categoria.observacoes || 'N/A'}</td>
                <td></td>
            `;
            tbody.appendChild(row);
        });
        
        this.addActionButtonsToRows(tbody, [
            { type: 'edit', icon: 'fas fa-edit', class: 'btn-warning', action: 'editarCategoria' },
            { type: 'delete', icon: 'fas fa-trash', class: 'btn-danger', action: 'excluirCategoria' }
        ]);
    }

                    updateRelatorios() {
                    console.log('📊 Atualizando relatórios...');
                }

                // FUNÇÕES DE PERSISTÊNCIA DE DADOS
                salvarProdutos() {
                    localStorage.setItem('produtos', JSON.stringify(this.data.produtos));
                }

                salvarClientes() {
                    localStorage.setItem('clientes', JSON.stringify(this.data.clientes));
                }

                salvarCategorias() {
                    localStorage.setItem('categorias', JSON.stringify(this.data.categorias));
                }

                salvarVendas() {
                    localStorage.setItem('vendas', JSON.stringify(this.data.vendas));
                }

                atualizarEstoque() {
                    this.data.estoque = this.data.produtos.map(p => ({
                        id: p.id,
                        produto: p.nome,
                        quantidade: p.estoque,
                        minimo: p.estoque_minimo
                    }));
                }

                // FUNÇÕES DE CRUD COMPLETAS
                adicionarProduto(produto) {
                    produto.id = this.gerarId();
                    this.data.produtos.push(produto);
                    this.atualizarEstoque();
                    this.salvarProdutos();
                    this.showNotification('Produto adicionado com sucesso!', 'success');
                    this.updateTabelaProdutos();
                    this.updateDashboard();
                }

                editarProduto(id) {
                    const produto = this.data.produtos.find(p => p.id == id);
                    if (produto) {
                        this.preencherModalProduto(produto);
                        this.showModal('add-product-modal');
                        this.showNotification('Editando produto...', 'info');
                    }
                }

                atualizarProduto(id, dados) {
                    const index = this.data.produtos.findIndex(p => p.id == id);
                    if (index !== -1) {
                        this.data.produtos[index] = { ...this.data.produtos[index], ...dados };
                        this.atualizarEstoque();
                        this.salvarProdutos();
                        this.showNotification('Produto atualizado com sucesso!', 'success');
                        this.updateTabelaProdutos();
                        this.updateDashboard();
                    }
                }

                excluirProduto(id) {
                    if (confirm('Tem certeza que deseja excluir este produto?')) {
                        this.data.produtos = this.data.produtos.filter(p => p.id != id);
                        this.atualizarEstoque();
                        this.salvarProdutos();
                        this.showNotification('Produto excluído com sucesso', 'success');
                        this.updateTabelaProdutos();
                        this.updateDashboard();
                    }
                }

                adicionarCliente(cliente) {
                    cliente.id = this.gerarId();
                    this.data.clientes.push(cliente);
                    this.salvarClientes();
                    this.showNotification('Cliente adicionado com sucesso!', 'success');
                    this.updateTabelaClientes();
                    this.updateDashboard();
                }

                atualizarCliente(id, dados) {
                    const index = this.data.clientes.findIndex(c => c.id == id);
                    if (index !== -1) {
                        this.data.clientes[index] = { ...this.data.clientes[index], ...dados };
                        this.salvarClientes();
                        this.showNotification('Cliente atualizado com sucesso!', 'success');
                        this.updateTabelaClientes();
                        this.updateDashboard();
                    }
                }

                excluirCliente(id) {
                    if (confirm('Tem certeza que deseja excluir este cliente?')) {
                        this.data.clientes = this.data.clientes.filter(c => c.id != id);
                        this.salvarClientes();
                        this.showNotification('Cliente excluído com sucesso', 'success');
                        this.updateTabelaClientes();
                        this.updateDashboard();
                    }
                }

                adicionarCategoria(categoria) {
                    categoria.id = this.gerarId();
                    this.data.categorias.push(categoria);
                    this.salvarCategorias();
                    this.showNotification('Categoria adicionada com sucesso!', 'success');
                    this.updateTabelaCategorias();
                    this.updateDashboard();
                }

                atualizarCategoria(id, dados) {
                    const index = this.data.categorias.findIndex(c => c.id == id);
                    if (index !== -1) {
                        this.data.categorias[index] = { ...this.data.categorias[index], ...dados };
                        this.salvarCategorias();
                        this.showNotification('Categoria atualizada com sucesso!', 'success');
                        this.updateTabelaCategorias();
                        this.updateDashboard();
                    }
                }

                excluirCategoria(id) {
                    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
                        this.data.categorias = this.data.categorias.filter(c => c.id != id);
                        this.salvarCategorias();
                        this.showNotification('Categoria excluída com sucesso', 'success');
                        this.updateTabelaCategorias();
                        this.updateDashboard();
                    }
                }

                adicionarVenda(venda) {
                    venda.id = this.gerarId();
                    venda.data = new Date().toLocaleDateString();
                    this.data.vendas.push(venda);
                    this.salvarVendas();
                    
                    // Atualiza estoque do produto
                    const produto = this.data.produtos.find(p => p.nome === venda.produto);
                    if (produto) {
                        produto.estoque -= venda.quantidade;
                        this.atualizarEstoque();
                        this.salvarProdutos();
                    }
                    
                    this.showNotification('Venda registrada com sucesso!', 'success');
                    this.updateTabelaVendas();
                    this.updateDashboard();
                }

                ajustarEstoque(id) {
                    const produto = this.data.produtos.find(p => p.id == id);
                    if (produto) {
                        this.preencherModalEstoque(produto);
                        this.showModal('adjust-stock-modal');
                        this.showNotification('Ajustando estoque...', 'info');
                    }
                }

                aplicarAjusteEstoque(id, quantidade, tipo, observacao) {
                    const produto = this.data.produtos.find(p => p.id == id);
                    if (produto) {
                        if (tipo === 'entrada') {
                            produto.estoque += parseInt(quantidade);
                        } else {
                            produto.estoque -= parseInt(quantidade);
                        }
                        
                        this.atualizarEstoque();
                        this.salvarProdutos();
                        this.showNotification('Estoque ajustado com sucesso!', 'success');
                        this.updateTabelaProdutos();
                        this.updateTabelaEstoque();
                        this.updateDashboard();
                    }
                }

                // UTILIDADES
                gerarId() {
                    return Date.now() + Math.random().toString(36).substr(2, 9);
                }

                preencherModalProduto(produto) {
                    document.getElementById('product-name').value = produto.nome || '';
                    document.getElementById('product-category').value = produto.categoria || '';
                    document.getElementById('product-price').value = produto.preco || '';
                    document.getElementById('product-stock').value = produto.estoque || '';
                    document.getElementById('product-min-stock').value = produto.estoque_minimo || '';
                    
                    // Salva o ID do produto sendo editado
                    document.getElementById('add-product-modal').setAttribute('data-edit-id', produto.id);
                }

                preencherModalEstoque(produto) {
                    document.getElementById('stock-product').value = produto.nome;
                    document.getElementById('stock-product').disabled = true;
                    document.getElementById('stock-quantity').value = '';
                    document.getElementById('stock-type').value = 'entrada';
                    document.getElementById('stock-observation').value = '';
                    
                    // Salva o ID do produto
                    document.getElementById('adjust-stock-modal').setAttribute('data-edit-id', produto.id);
                }

                preencherModalCliente(cliente) {
                    document.getElementById('client-name').value = cliente.nome || '';
                    document.getElementById('client-email').value = cliente.email || '';
                    document.getElementById('client-phone').value = cliente.telefone || '';
                    document.getElementById('client-city').value = cliente.cidade || '';
                    
                    document.getElementById('add-client-modal').setAttribute('data-edit-id', cliente.id);
                }

                preencherModalCategoria(categoria) {
                    document.getElementById('category-name').value = categoria.nome || '';
                    document.getElementById('category-description').value = categoria.descricao || '';
                    document.getElementById('category-observations').value = categoria.observacoes || '';
                    
                    document.getElementById('add-category-modal').setAttribute('data-edit-id', categoria.id);
                }

                preencherModalVenda(produto) {
                    document.getElementById('sale-product').value = produto.nome;
                    document.getElementById('sale-product').disabled = true;
                    document.getElementById('sale-price').value = produto.preco;
                    document.getElementById('sale-quantity').value = '1';
                    
                    // Preenche select de clientes
                    const selectCliente = document.getElementById('sale-client');
                    selectCliente.innerHTML = '<option value="">Selecione um cliente</option>';
                    this.data.clientes.forEach(cliente => {
                        const option = document.createElement('option');
                        option.value = cliente.nome;
                        option.textContent = cliente.nome;
                        selectCliente.appendChild(option);
                    });
                }

    // NOTIFICAÇÕES
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        const container = document.querySelector('.container') || document.body;
        container.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentElement) notification.remove();
        }, 5000);
        
        console.log(`🔔 Notificação ${type}: ${message}`);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'times-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // UTILIDADES
    logout() {
        if (confirm('Tem certeza que deseja sair?')) {
            localStorage.removeItem('isAuthenticated');
            window.location.href = 'login.html';
        }
    }

                    loadTheme() {
                    if (localStorage.getItem('darkTheme') === 'true') {
                        document.body.classList.add('dark-theme');
                        this.updateThemeButton();
                    }
                }

                toggleTheme() {
                    document.body.classList.toggle('dark-theme');
                    const isDark = document.body.classList.contains('dark-theme');
                    localStorage.setItem('darkTheme', isDark);
                    this.updateThemeButton();
                }

                updateThemeButton() {
                    const icon = document.querySelector('.btn-info i');
                    if (icon) {
                        icon.className = document.body.classList.contains('dark-theme')
                            ? 'fas fa-sun'
                            : 'fas fa-moon';
                    }
                }
}

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM carregado, inicializando sistema...');
    
    window.sistema = new SistemaEmpresarial();
    
    // Expor funções globais
    window.showModal = (modalId) => window.sistema.showModal(modalId);
    window.closeModal = (modalId) => window.sistema.closeModal(modalId);
    window.showSection = (sectionName) => window.sistema.showSection(sectionName);
    window.showNotification = (message, type) => window.sistema.showNotification(message, type);
    window.logout = () => window.sistema.logout();
    window.toggleTheme = () => window.sistema.toggleTheme();
    
    // Funções de CRUD
    window.editarCliente = (id) => window.sistema.editarCliente(id);
    window.excluirCliente = (id) => window.sistema.excluirCliente(id);
    window.editarProduto = (id) => window.sistema.editarProduto(id);
    window.ajustarEstoque = (id) => window.sistema.ajustarEstoque(id);
    window.vendaRapida = (id) => window.sistema.vendaRapida(id);
    window.excluirProduto = (id) => window.sistema.excluirProduto(id);
    window.editarCategoria = (id) => window.sistema.editarCategoria(id);
    window.excluirCategoria = (id) => window.sistema.excluirCategoria(id);
    window.verDetalhesVenda = (id) => window.sistema.verDetalhesVenda(id);
    window.cancelarVenda = (id) => window.sistema.cancelarVenda(id);
    
    console.log('✅ Sistema exposto globalmente');
});

console.log('🚀 Sistema Empresarial carregado!');
