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
            console.log('🚀 Iniciando sistema...');
            
            // Carrega tema
            this.loadTheme();
            
            // Inicializa Supabase
            await this.initSupabase();
            
            // Carrega todos os dados
            await this.loadAllData();
            
            // Configura a interface
            this.setupInterface();
            
            // Verifica sincronização
            this.verificarSincronizacao();
            
            // Força atualização de todas as tabelas
            this.atualizarTodasTabelas();
            
            console.log('✅ Sistema inicializado com sucesso!');
            
        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
            // Em caso de erro, tenta usar dados locais
            this.loadDadosLocais();
            this.setupInterface();
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
            if (this.isConnected && this.supabase) {
                console.log('🔍 Buscando dados de produtos no Supabase...');
                
                // Busca diretamente da tabela produtos
                const { data, error } = await this.supabase
                    .from('produtos')
                    .select('*');
                
                if (error) {
                    console.error('❌ Erro ao buscar produtos:', error);
                    throw error;
                }
                
                if (data && data.length > 0) {
                    console.log('✅ Dados de produtos carregados do Supabase:', data);
                    
                    // Mapeia os dados do Supabase para o formato do sistema
                    this.data.produtos = data.map(produto => ({
                        id: produto.id,
                        nome: produto.nome || produto.descricao || 'Produto sem nome',
                        descricao: produto.descricao || produto.nome || 'Sem descrição',
                        preco: produto.preco || 0,
                        estoque: produto.estoque || produto.quantidade || 0,
                        estoque_minimo: produto.estoque_minimo || produto.minimo || 0,
                        categoria: produto.categoria || 'Sem categoria',
                        ativo: produto.ativo !== false // true por padrão se não especificado
                    }));
                    
                    console.log('📦 Produtos mapeados:', this.data.produtos);
                    
                    // Salva no localStorage como backup
                    localStorage.setItem('produtos', JSON.stringify(this.data.produtos));
                    
                } else {
                    console.warn('⚠️ Nenhum produto encontrado na tabela produtos');
                    this.loadDadosLocais();
                }
                
            } else {
                console.warn('⚠️ Supabase não disponível, carregando dados locais...');
                this.loadDadosLocais();
            }
            
        } catch (error) {
            console.error('❌ Erro ao carregar produtos:', error);
            // Em caso de erro, tenta carregar dados locais
            this.loadDadosLocais();
        }
    }

    async loadClientes() {
        try {
            if (this.isConnected && this.supabase) {
                const { data, error } = await this.supabase
                    .from('clientes')
                    .select('*')
                    .eq('ativo', true);
                
                if (error) throw error;
                
                // Processa os dados para garantir compatibilidade
                this.data.clientes = (data || []).map(cliente => ({
                    ...cliente,
                    nome: cliente.nome || cliente.nome_completo || 'Cliente sem nome',
                    email: cliente.email || cliente.email_contato || 'Sem email',
                    telefone: cliente.telefone || cliente.telefone_contato || 'Sem telefone',
                    cidade: cliente.cidade || cliente.cidade_estado || 'Sem cidade',
                    status: cliente.status || 'ativo'
                }));
                
                console.log(`👥 ${this.data.clientes.length} clientes carregados do Supabase`);
            } else {
                console.warn('⚠️ Supabase não disponível, usando dados locais');
                this.loadDadosLocais();
            }
        } catch (error) {
            console.error('❌ Erro ao carregar clientes:', error);
            this.data.clientes = [];
        }
    }

    async loadCategorias() {
        try {
            if (this.isConnected && this.supabase) {
                const { data, error } = await this.supabase
                    .from('categorias')
                    .select('*')
                    .eq('ativo', true);
                
                if (error) throw error;
                
                // Processa os dados para garantir compatibilidade
                this.data.categorias = (data || []).map(categoria => ({
                    ...categoria,
                    nome: categoria.nome || categoria.nome_categoria || 'Categoria sem nome',
                    descricao: categoria.descricao || categoria.descricao_categoria || 'Sem descrição',
                    status: categoria.status || 'ativo',
                    observacoes: categoria.observacoes || categoria.obs || 'Sem observações'
                }));
                
                console.log(`🏷️ ${this.data.categorias.length} categorias carregadas do Supabase`);
            } else {
                console.warn('⚠️ Supabase não disponível, usando dados locais');
                this.loadDadosLocais();
            }
        } catch (error) {
            console.error('❌ Erro ao carregar categorias:', error);
            this.data.categorias = [];
        }
    }

    async loadVendas() {
        try {
            if (this.isConnected && this.supabase) {
                const { data, error } = await this.supabase
                    .from('vendas')
                    .select('*')
                    .eq('ativo', true);
                
                if (error) throw error;
                
                // Processa os dados para garantir compatibilidade
                this.data.vendas = (data || []).map(venda => ({
                    ...venda,
                    cliente: venda.cliente || venda.cliente_nome || 'Cliente não encontrado',
                    produto: venda.produto || venda.produto_nome || 'Produto não encontrado',
                    quantidade: venda.quantidade || 1,
                    valor: venda.valor || venda.valor_total || 0,
                    data: venda.data || venda.data_venda || new Date().toLocaleDateString()
                }));
                
                console.log(`🛒 ${this.data.vendas.length} vendas carregadas do Supabase`);
            } else {
                console.warn('⚠️ Supabase não disponível, usando dados locais');
                this.loadDadosLocais();
            }
        } catch (error) {
            console.error('❌ Erro ao carregar vendas:', error);
            this.data.vendas = [];
        }
    }

    async loadEstoque() {
        try {
            if (this.isConnected && this.supabase) {
                console.log('🔍 Buscando dados de estoque no Supabase...');
                
                // Busca diretamente da tabela estoque
                const { data, error } = await this.supabase
                    .from('estoque')
                    .select(`
                        *,
                        produtos(nome, preco)
                    `);
                
                if (error) {
                    console.error('❌ Erro ao buscar estoque:', error);
                    throw error;
                }
                
                if (data && data.length > 0) {
                    console.log('✅ Dados de estoque carregados do Supabase:', data);
                    
                    // Mapeia os dados do Supabase para o formato do sistema
                    this.data.estoque = data.map(item => ({
                        id: item.id,
                        produto: item.produtos?.nome || 'Produto não encontrado',
                        quantidade: item.quantidade || 0,
                        minimo: item.minimo || item.quantidade_minima || 0,
                        ativo: item.ativo !== false, // true por padrão se não especificado
                        preco: item.produtos?.preco || 0
                    }));
                    
                    console.log('📦 Estoque mapeado:', this.data.estoque);
                    
                    // Salva no localStorage como backup
                    localStorage.setItem('estoque', JSON.stringify(this.data.estoque));
                    
                } else {
                    console.warn('⚠️ Nenhum dado encontrado na tabela estoque');
                    // Se não há dados na tabela estoque, tenta buscar dos produtos
                    await this.carregarEstoqueDosProdutos();
                }
                
            } else {
                console.warn('⚠️ Supabase não disponível, carregando dados locais...');
                this.loadDadosLocais();
            }
            
        } catch (error) {
            console.error('❌ Erro ao carregar estoque:', error);
            // Em caso de erro, tenta carregar dados locais
            this.loadDadosLocais();
        }
    }

    // Função para carregar estoque baseado nos produtos quando não há tabela estoque
    async carregarEstoqueDosProdutos() {
        try {
            console.log('🔄 Carregando estoque baseado nos produtos...');
            
            const { data: produtosData, error } = await this.supabase
                .from('produtos')
                .select('*');
            
            if (error) {
                console.error('❌ Erro ao buscar produtos:', error);
                throw error;
            }
            
            if (produtosData && produtosData.length > 0) {
                // Cria estoque baseado nos produtos
                this.data.estoque = produtosData.map(p => ({
                    id: p.id,
                    produto: p.nome,
                    quantidade: p.estoque || p.quantidade || 0,
                    minimo: p.estoque_minimo || p.minimo || 0,
                    ativo: true,
                    preco: p.preco || 0
                }));
                
                console.log('📦 Estoque criado a partir dos produtos:', this.data.estoque);
                localStorage.setItem('estoque', JSON.stringify(this.data.estoque));
            }
            
        } catch (error) {
            console.error('❌ Erro ao carregar estoque dos produtos:', error);
            this.loadDadosLocais();
        }
    }

    loadDadosLocais() {
        // Carrega dados salvos no localStorage ou usa padrão
        const produtosSalvos = localStorage.getItem('produtos');
        const clientesSalvos = localStorage.getItem('clientes');
        const categoriasSalvos = localStorage.getItem('categorias');
        const vendasSalvos = localStorage.getItem('vendas');
        const estoqueSalvos = localStorage.getItem('estoque');

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

        // Carrega estoque salvo ou atualiza baseado nos produtos
        if (estoqueSalvos) {
            this.data.estoque = JSON.parse(estoqueSalvos);
        } else {
            this.atualizarEstoque();
        }
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
            // Remove botões existentes para evitar duplicação
            const existingButtons = row.querySelector('.action-buttons');
            if (existingButtons) {
                existingButtons.remove();
            }
            
            let actionCell = row.querySelector('.action-cell');
            if (!actionCell) {
                actionCell = row.querySelector('td:last-child');
            }
            
            if (!actionCell) {
                actionCell = document.createElement('td');
                actionCell.className = 'action-cell';
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
                    e.stopPropagation();
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
        
        try {
            switch(action) {
                case 'editarCliente': 
                    this.editarCliente(id); 
                    break;
                case 'excluirCliente': 
                    this.excluirCliente(id); 
                    break;
                case 'editarProduto': 
                    this.editarProduto(id); 
                    break;
                case 'ajustarEstoque': 
                    this.ajustarEstoque(id); 
                    break;
                case 'vendaRapida': 
                    this.vendaRapida(id); 
                    break;
                case 'excluirProduto': 
                    this.excluirProduto(id); 
                    break;
                case 'editarCategoria': 
                    this.editarCategoria(id); 
                    break;
                case 'excluirCategoria': 
                    this.excluirCategoria(id); 
                    break;
                case 'verDetalhesVenda': 
                    this.verDetalhesVenda(id); 
                    break;
                case 'cancelarVenda': 
                    this.cancelarVenda(id); 
                    break;
                default: 
                    console.warn(`⚠️ Ação não implementada: ${action}`);
                    this.showNotification(`Ação ${action} não implementada`, 'warning');
            }
        } catch (error) {
            console.error(`❌ Erro ao executar ação ${action}:`, error);
            this.showNotification(`Erro ao executar ação: ${error.message}`, 'error');
        }
    }

    getRowId(row) {
        // Primeiro tenta encontrar o atributo data-id na própria linha
        const rowId = row.getAttribute('data-id');
        if (rowId) return rowId;
        
        // Se não encontrar, tenta encontrar o ID na primeira célula
        const firstCell = row.querySelector('td:first-child');
        if (firstCell && firstCell.textContent.trim()) {
            // Tenta extrair um ID numérico do texto
            const text = firstCell.textContent.trim();
            const match = text.match(/\d+/);
            if (match) return match[0];
        }
        
        // Como último recurso, tenta encontrar qualquer célula com data-id
        const idCell = row.querySelector('[data-id]');
        if (idCell) {
            const id = idCell.getAttribute('data-id');
            if (id) return id;
        }
        
        console.warn('⚠️ Não foi possível encontrar ID para a linha:', row);
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
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            this.data.clientes = this.data.clientes.filter(c => c.id != id);
            this.salvarClientes();
            this.showNotification('Cliente excluído com sucesso', 'success');
            this.updateTabelaClientes();
            this.updateDashboard();
        }
    }

    editarProduto(id) {
        const produto = this.data.produtos.find(p => p.id == id);
        if (produto) {
            this.preencherModalProduto(produto);
            this.showModal('add-product-modal');
            this.showNotification('Editando produto...', 'info');
        }
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
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            this.data.produtos = this.data.produtos.filter(p => p.id != id);
            this.atualizarEstoque();
            this.salvarProdutos();
            this.showNotification('Produto excluído com sucesso', 'success');
            this.updateTabelaProdutos();
            this.updateDashboard();
        }
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
        if (confirm('Tem certeza que deseja excluir esta categoria?')) {
            this.data.categorias = this.data.categorias.filter(c => c.id != id);
            this.salvarCategorias();
            this.showNotification('Categoria excluída com sucesso', 'success');
            this.updateTabelaCategorias();
            this.updateDashboard();
        }
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
                <td class="action-cell"></td>
            `;
            tbody.appendChild(row);
        });
        
        // Adiciona os botões de ação após criar todas as linhas
        this.addActionButtonsToRows(tbody, [
            { type: 'edit', icon: 'fas fa-edit', class: 'btn-warning', action: 'editarCliente' },
            { type: 'delete', icon: 'fas fa-trash', class: 'btn-danger', action: 'excluirCliente' }
        ]);
        
        console.log('👥 Tabela de clientes atualizada:', this.data.clientes);
    }

    updateTabelaProdutos() {
        const tbody = document.querySelector('#produtos-table tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        console.log('📦 Atualizando tabela de produtos...');
        console.log('📦 Dados de produtos disponíveis:', this.data.produtos);
        
        // Se não há dados de produtos, tenta recarregar do Supabase primeiro
        if (this.data.produtos.length === 0) {
            console.log('📦 Nenhum produto encontrado, tentando recarregar...');
            // Tenta recarregar do Supabase se estiver conectado
            if (this.isConnected && this.supabase) {
                this.loadProdutos().then(() => {
                    // Recursivamente chama a função após carregar os dados
                    this.updateTabelaProdutos();
                }).catch(() => {
                    // Se falhar, mostra mensagem de erro
                    this.showNotification('Erro ao carregar dados dos produtos!', 'error');
                });
            }
            return;
        }
        
        // Renderiza cada produto
        this.data.produtos.forEach((produto, index) => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', produto.id);
            
            // Garante que os valores sejam números
            const preco = parseFloat(produto.preco) || 0;
            const estoque = parseInt(produto.estoque) || 0;
            const estoqueMinimo = parseInt(produto.estoque_minimo) || 0;
            
            console.log(`📦 Renderizando produto ${index + 1}:`, {
                nome: produto.nome,
                categoria: produto.categoria,
                preco: preco,
                estoque: estoque,
                estoque_minimo: estoqueMinimo
            });
            
            // Calcula o status do estoque
            const status = estoque > estoqueMinimo ? 'success' : 'warning';
            const statusText = estoque > estoqueMinimo ? 'Disponível' : 'Baixo';
            
            row.innerHTML = `
                <td>${produto.nome || 'N/A'}</td>
                <td>${produto.categoria || 'Sem categoria'}</td>
                <td class="preco-cell">R$ ${preco.toFixed(2)}</td>
                <td class="estoque-cell">${estoque}</td>
                <td class="estoque-minimo-cell">${estoqueMinimo}</td>
                <td>
                    <span class="status-badge ${status}">
                        ${statusText}
                    </span>
                </td>
                <td class="action-cell"></td>
            `;
            
            tbody.appendChild(row);
        });
        
        // Adiciona botões de ação
        this.addActionButtonsToRows('#produtos-table', 'produtos');
        
        console.log('📦 Tabela de produtos atualizada com sucesso!');
    }

    updateTabelaEstoque() {
        const tbody = document.querySelector('#estoque-table tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        console.log('📦 Atualizando tabela de estoque...');
        console.log('📦 Dados de estoque disponíveis:', this.data.estoque);
        
        // Se não há dados de estoque, tenta recarregar do Supabase primeiro
        if (this.data.estoque.length === 0) {
            console.log('📦 Nenhum dado de estoque encontrado, tentando recarregar...');
            // Tenta recarregar do Supabase se estiver conectado
            if (this.isConnected && this.supabase) {
                this.loadEstoque().then(() => {
                    // Recursivamente chama a função após carregar os dados
                    this.updateTabelaEstoque();
                }).catch(() => {
                    // Se falhar, mostra mensagem de erro
                    this.showNotification('Erro ao carregar dados do estoque!', 'error');
                });
            }
            return;
        }
        
        // Renderiza cada item do estoque
        this.data.estoque.forEach((item, index) => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', item.id);
            
            // Garante que as quantidades sejam números
            const quantidade = parseInt(item.quantidade) || 0;
            const minimo = parseInt(item.minimo) || 0;
            
            console.log(`📦 Renderizando item ${index + 1}:`, {
                produto: item.produto,
                quantidade: quantidade,
                minimo: minimo,
                tipo: typeof item.quantidade
            });
            
            // Calcula o status do estoque
            const status = quantidade > minimo ? 'success' : 'warning';
            const statusText = quantidade > minimo ? 'OK' : 'Baixo';
            
            row.innerHTML = `
                <td>${item.produto || 'N/A'}</td>
                <td class="quantidade-cell">${quantidade}</td>
                <td class="minimo-cell">${minimo}</td>
                <td>
                    <span class="status-badge ${status}">
                        ${statusText}
                    </span>
                </td>
                <td>${new Date().toLocaleDateString()}</td>
                <td class="action-cell"></td>
            `;
            
            tbody.appendChild(row);
        });
        
        // Adiciona botões de ação
        this.addActionButtonsToRows('#estoque-table', 'estoque');
        
        console.log('📦 Tabela de estoque atualizada com sucesso!');
    }

    showEmptyEstoqueMessage(tbody) {
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
                <td class="action-cell"></td>
            `;
            tbody.appendChild(row);
        });
        
        // Adiciona os botões de ação após criar todas as linhas
        this.addActionButtonsToRows(tbody, [
            { type: 'view', icon: 'fas fa-eye', class: 'btn-info', action: 'verDetalhesVenda' },
            { type: 'cancel', icon: 'fas fa-times', class: 'btn-danger', action: 'cancelarVenda' }
        ]);
        
        console.log('🛒 Tabela de vendas atualizada:', this.data.vendas);
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
                <td class="action-cell"></td>
            `;
            tbody.appendChild(row);
        });
        
        // Adiciona os botões de ação após criar todas as linhas
        this.addActionButtonsToRows(tbody, [
            { type: 'edit', icon: 'fas fa-edit', class: 'btn-warning', action: 'editarCategoria' },
            { type: 'delete', icon: 'fas fa-trash', class: 'btn-danger', action: 'excluirCategoria' }
        ]);
        
        console.log('🏷️ Tabela de categorias atualizada:', this.data.categorias);
    }

    updateRelatorios() {
        console.log('📊 Atualizando relatórios...');
        
        // Atualiza os cards de resumo
        this.atualizarResumoExecutivo();
        
        // Atualiza os gráficos
        this.atualizarGraficoVendas();
        this.atualizarGraficoCategorias();
        this.atualizarGraficoClientesRegiao();
        
        // Atualiza as listas
        this.atualizarTopProdutos();
        this.atualizarEstoqueCritico();
        this.atualizarMetricasPerformance();
        
        // Preenche os filtros
        this.preencherFiltros();
        
        console.log('📊 Relatórios atualizados com sucesso!');
    }

    // FUNÇÕES AUXILIARES PARA RELATÓRIOS
    atualizarResumoExecutivo() {
        const hoje = new Date();
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        
        // Calcula vendas do mês
        const vendasMes = this.data.vendas.filter(venda => {
            const dataVenda = new Date(venda.data);
            return dataVenda >= inicioMes && dataVenda <= hoje;
        });
        
        // Total de vendas
        const totalVendas = vendasMes.length;
        const totalVendasElement = document.getElementById('total-vendas');
        if (totalVendasElement) totalVendasElement.textContent = totalVendas;
        
        // Receita total
        const receitaTotal = vendasMes.reduce((total, venda) => total + (venda.valor || 0), 0);
        const receitaTotalElement = document.getElementById('receita-total');
        if (receitaTotalElement) receitaTotalElement.textContent = `R$ ${receitaTotal.toFixed(2)}`;
        
        // Clientes ativos
        const clientesAtivos = this.data.clientes.filter(cliente => cliente.status === 'ativo').length;
        const clientesAtivosElement = document.getElementById('clientes-ativos');
        if (clientesAtivosElement) clientesAtivosElement.textContent = clientesAtivos;
        
        // Produtos em estoque
        const produtosEstoque = this.data.produtos.reduce((total, produto) => total + (produto.estoque || 0), 0);
        const produtosEstoqueElement = document.getElementById('produtos-estoque');
        if (produtosEstoqueElement) produtosEstoqueElement.textContent = produtosEstoque;
    }

    atualizarGraficoVendas() {
        const periodo = parseInt(document.getElementById('vendas-periodo')?.value || 30);
        const hoje = new Date();
        const inicio = new Date(hoje.getTime() - (periodo * 24 * 60 * 60 * 1000));
        
        // Agrupa vendas por dia
        const vendasPorDia = {};
        for (let d = new Date(inicio); d <= hoje; d.setDate(d.getDate() + 1)) {
            const dataStr = d.toISOString().split('T')[0];
            vendasPorDia[dataStr] = 0;
        }
        
        this.data.vendas.forEach(venda => {
            const dataVenda = new Date(venda.data);
            if (dataVenda >= inicio && dataVenda <= hoje) {
                const dataStr = dataVenda.toISOString().split('T')[0];
                vendasPorDia[dataStr] = (vendasPorDia[dataStr] || 0) + 1;
            }
        });
        
        // Cria o gráfico
        this.criarGraficoLinha('vendas-chart', {
            labels: Object.keys(vendasPorDia),
            datasets: [{
                label: 'Vendas',
                data: Object.values(vendasPorDia),
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4
            }]
        });
    }

    atualizarGraficoCategorias() {
        // Agrupa produtos por categoria
        const produtosPorCategoria = {};
        this.data.produtos.forEach(produto => {
            const categoria = produto.categoria || 'Sem categoria';
            produtosPorCategoria[categoria] = (produtosPorCategoria[categoria] || 0) + 1;
        });
        
        // Cria o gráfico de pizza
        this.criarGraficoPizza('categorias-chart', {
            labels: Object.keys(produtosPorCategoria),
            datasets: [{
                data: Object.values(produtosPorCategoria),
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#f093fb',
                    '#f5576c',
                    '#4facfe',
                    '#00f2fe'
                ]
            }]
        });
    }

    atualizarGraficoClientesRegiao() {
        // Agrupa clientes por cidade
        const clientesPorCidade = {};
        this.data.clientes.forEach(cliente => {
            const cidade = cliente.cidade || 'Não informado';
            clientesPorCidade[cidade] = (clientesPorCidade[cidade] || 0) + 1;
        });
        
        // Cria o gráfico de barras
        this.criarGraficoBarras('clientes-regiao-chart', {
            labels: Object.keys(clientesPorCidade),
            datasets: [{
                label: 'Clientes',
                data: Object.values(clientesPorCidade),
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: '#667eea',
                borderWidth: 2
            }]
        });
    }

    atualizarTopProdutos() {
        const container = document.getElementById('top-produtos');
        if (!container) return;
        
        // Calcula vendas por produto
        const vendasPorProduto = {};
        this.data.vendas.forEach(venda => {
            const produto = venda.produto;
            if (!vendasPorProduto[produto]) {
                vendasPorProduto[produto] = { quantidade: 0, receita: 0 };
            }
            vendasPorProduto[produto].quantidade += venda.quantidade || 1;
            vendasPorProduto[produto].receita += venda.valor || 0;
        });
        
        // Ordena por quantidade vendida
        const topProdutos = Object.entries(vendasPorProduto)
            .sort(([,a], [,b]) => b.quantidade - a.quantidade)
            .slice(0, 5);
        
        container.innerHTML = topProdutos.map(([produto, stats]) => `
            <div class="product-item">
                <div class="product-info">
                    <div class="product-name">${produto}</div>
                    <div class="product-category">${this.getCategoriaProduto(produto)}</div>
                </div>
                <div class="product-stats">
                    <div class="product-sales">${stats.quantidade}</div>
                    <div class="product-revenue">R$ ${stats.receita.toFixed(2)}</div>
                </div>
            </div>
        `).join('');
    }

    atualizarEstoqueCritico() {
        const container = document.getElementById('estoque-critico');
        if (!container) return;
        
        // Filtra produtos com estoque baixo
        const estoqueCritico = this.data.produtos.filter(produto => {
            const estoque = produto.estoque || 0;
            const minimo = produto.estoque_minimo || 0;
            return estoque <= minimo;
        }).slice(0, 5);
        
        container.innerHTML = estoqueCritico.map(produto => `
            <div class="stock-item">
                <div class="stock-info">
                    <div class="stock-product">${produto.nome}</div>
                    <div class="stock-details">${produto.categoria || 'Sem categoria'}</div>
                </div>
                <div class="stock-status">
                    <div class="stock-quantity">${produto.estoque || 0}</div>
                    <div class="stock-minimum">Mín: ${produto.estoque_minimo || 0}</div>
                </div>
            </div>
        `).join('');
    }

    atualizarMetricasPerformance() {
        // Taxa de conversão (clientes que fizeram compra)
        const totalClientes = this.data.clientes.length;
        const clientesComCompra = new Set(this.data.vendas.map(v => v.cliente)).size;
        const taxaConversao = totalClientes > 0 ? (clientesComCompra / totalClientes * 100) : 0;
        const taxaConversaoElement = document.getElementById('taxa-conversao');
        if (taxaConversaoElement) taxaConversaoElement.textContent = `${taxaConversao.toFixed(1)}%`;
        
        // Ticket médio
        const totalVendas = this.data.vendas.length;
        const receitaTotal = this.data.vendas.reduce((total, v) => total + (v.valor || 0), 0);
        const ticketMedio = totalVendas > 0 ? receitaTotal / totalVendas : 0;
        const ticketMedioElement = document.getElementById('ticket-medio');
        if (ticketMedioElement) ticketMedioElement.textContent = `R$ ${ticketMedio.toFixed(2)}`;
        
        // Produtividade (vendas por dia útil)
        const diasUteis = this.calcularDiasUteis();
        const produtividade = diasUteis > 0 ? (totalVendas / diasUteis) : 0;
        const produtividadeElement = document.getElementById('produtividade');
        if (produtividadeElement) produtividadeElement.textContent = `${produtividade.toFixed(1)} vendas/dia`;
    }

    preencherFiltros() {
        // Preenche filtro de categorias
        const filtroCategoria = document.getElementById('filtro-categoria');
        if (filtroCategoria) {
            const categorias = [...new Set(this.data.produtos.map(p => p.categoria).filter(Boolean))];
            filtroCategoria.innerHTML = '<option value="">Todas as categorias</option>' +
                categorias.map(cat => `<option value="${cat}">${cat}</option>`).join('');
        }
        
        // Preenche filtro de clientes
        const filtroCliente = document.getElementById('filtro-cliente');
        if (filtroCliente) {
            filtroCliente.innerHTML = '<option value="">Todos os clientes</option>' +
                this.data.clientes.map(cli => `<option value="${cli.nome}">${cli.nome}</option>`).join('');
        }
        
        // Define datas padrão (últimos 30 dias)
        const hoje = new Date();
        const inicio = new Date(hoje.getTime() - (30 * 24 * 60 * 60 * 1000));
        
        const dataInicio = document.getElementById('data-inicio');
        const dataFim = document.getElementById('data-fim');
        
        if (dataInicio) dataInicio.value = inicio.toISOString().split('T')[0];
        if (dataFim) dataFim.value = hoje.toISOString().split('T')[0];
    }

    aplicarFiltros() {
        const dataInicio = document.getElementById('data-inicio').value;
        const dataFim = document.getElementById('data-fim').value;
        const categoria = document.getElementById('filtro-categoria').value;
        const cliente = document.getElementById('filtro-cliente').value;
        
        // Aplica filtros aos dados
        let vendasFiltradas = this.data.vendas;
        
        if (dataInicio && dataFim) {
            const inicio = new Date(dataInicio);
            const fim = new Date(dataFim);
            vendasFiltradas = vendasFiltradas.filter(venda => {
                const dataVenda = new Date(venda.data);
                return dataVenda >= inicio && dataVenda <= fim;
            });
        }
        
        if (categoria) {
            vendasFiltradas = vendasFiltradas.filter(venda => {
                const produto = this.data.produtos.find(p => p.nome === venda.produto);
                return produto && produto.categoria === categoria;
            });
        }
        
        if (cliente) {
            vendasFiltradas = vendasFiltradas.filter(venda => venda.cliente === cliente);
        }
        
        // Atualiza relatórios com dados filtrados
        this.atualizarRelatoriosComFiltros(vendasFiltradas);
        
        this.showNotification('Filtros aplicados com sucesso!', 'success');
    }

    limparFiltros() {
        const dataInicio = document.getElementById('data-inicio');
        const dataFim = document.getElementById('data-fim');
        const filtroCategoria = document.getElementById('filtro-categoria');
        const filtroCliente = document.getElementById('filtro-cliente');
        
        if (dataInicio) dataInicio.value = '';
        if (dataFim) dataFim.value = '';
        if (filtroCategoria) filtroCategoria.value = '';
        if (filtroCliente) filtroCliente.value = '';
        
        // Atualiza relatórios com dados completos
        this.updateRelatorios();
        
        this.showNotification('Filtros limpos!', 'info');
    }

    // Função para atualizar relatórios com filtros aplicados
    atualizarRelatoriosComFiltros(vendasFiltradas) {
        console.log('📊 Atualizando relatórios com filtros aplicados...');
        
        // Atualiza resumo executivo com dados filtrados
        this.atualizarResumoExecutivoComFiltros(vendasFiltradas);
        
        // Atualiza gráficos com dados filtrados
        this.atualizarGraficoVendasComFiltros(vendasFiltradas);
        
        // Atualiza listas com dados filtrados
        this.atualizarTopProdutosComFiltros(vendasFiltradas);
        
        console.log('📊 Relatórios com filtros atualizados com sucesso!');
    }

    // Função para atualizar resumo executivo com filtros
    atualizarResumoExecutivoComFiltros(vendasFiltradas) {
        const totalVendas = vendasFiltradas.length;
        const totalVendasElement = document.getElementById('total-vendas');
        if (totalVendasElement) totalVendasElement.textContent = totalVendas;
        
        const receitaTotal = vendasFiltradas.reduce((total, venda) => total + (venda.valor || 0), 0);
        const receitaTotalElement = document.getElementById('receita-total');
        if (receitaTotalElement) receitaTotalElement.textContent = `R$ ${receitaTotal.toFixed(2)}`;
        
        // Mantém os outros valores como estão (clientes ativos e produtos em estoque)
    }

    // Função para atualizar gráfico de vendas com filtros
    atualizarGraficoVendasComFiltros(vendasFiltradas) {
        // Agrupa vendas filtradas por dia
        const vendasPorDia = {};
        vendasFiltradas.forEach(venda => {
            const dataVenda = new Date(venda.data);
            const dataStr = dataVenda.toISOString().split('T')[0];
            vendasPorDia[dataStr] = (vendasPorDia[dataStr] || 0) + 1;
        });
        
        // Cria o gráfico com dados filtrados
        this.criarGraficoLinha('vendas-chart', {
            labels: Object.keys(vendasPorDia),
            datasets: [{
                label: 'Vendas (Filtradas)',
                data: Object.values(vendasPorDia),
                borderColor: '#f5576c',
                backgroundColor: 'rgba(245, 87, 108, 0.1)',
                tension: 0.4
            }]
        });
    }

    // Função para atualizar top produtos com filtros
    atualizarTopProdutosComFiltros(vendasFiltradas) {
        const container = document.getElementById('top-produtos');
        if (!container) return;
        
        // Calcula vendas por produto com dados filtrados
        const vendasPorProduto = {};
        vendasFiltradas.forEach(venda => {
            const produto = venda.produto;
            if (!vendasPorProduto[produto]) {
                vendasPorProduto[produto] = { quantidade: 0, receita: 0 };
            }
            vendasPorProduto[produto].quantidade += venda.quantidade || 1;
            vendasPorProduto[produto].receita += venda.valor || 0;
        });
        
        // Ordena por quantidade vendida
        const topProdutos = Object.entries(vendasPorProduto)
            .sort(([,a], [,b]) => b.quantidade - a.quantidade)
            .slice(0, 5);
        
        container.innerHTML = topProdutos.map(([produto, stats]) => `
            <div class="product-item">
                <div class="product-info">
                    <div class="product-name">${produto}</div>
                    <div class="product-category">${this.getCategoriaProduto(produto)}</div>
                </div>
                <div class="product-stats">
                    <div class="product-sales">${stats.quantidade}</div>
                    <div class="product-revenue">R$ ${stats.receita.toFixed(2)}</div>
                </div>
            </div>
        `).join('');
    }

    // Funções auxiliares
    getCategoriaProduto(nomeProduto) {
        const produto = this.data.produtos.find(p => p.nome === nomeProduto);
        return produto ? produto.categoria : 'Não encontrado';
    }

    calcularDiasUteis() {
        const hoje = new Date();
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        let diasUteis = 0;
        
        for (let d = new Date(inicioMes); d <= hoje; d.setDate(d.getDate() + 1)) {
            if (d.getDay() !== 0 && d.getDay() !== 6) { // 0 = domingo, 6 = sábado
                diasUteis++;
            }
        }
        
        return diasUteis;
    }

    // Funções para criar gráficos (simples, sem biblioteca externa)
    criarGraficoLinha(canvasId, data) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        // Define tamanho do canvas
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Limpa o canvas
        ctx.clearRect(0, 0, width, height);
        
        // Desenha o gráfico
        this.desenharGraficoLinha(ctx, data, width, height);
    }

    criarGraficoPizza(canvasId, data) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        // Define tamanho do canvas
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Limpa o canvas
        ctx.clearRect(0, 0, width, height);
        
        // Desenha o gráfico
        this.desenharGraficoPizza(ctx, data, width, height);
    }

    criarGraficoBarras(canvasId, data) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        // Define tamanho do canvas
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Limpa o canvas
        ctx.clearRect(0, 0, width, height);
        
        // Desenha o gráfico
        this.desenharGraficoBarras(ctx, data, width, height);
    }

    // Funções de desenho dos gráficos
    desenharGraficoLinha(ctx, data, width, height) {
        const { labels, datasets } = data;
        const dataset = datasets[0];
        
        if (labels.length === 0) return;
        
        const padding = 40;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;
        
        // Encontra valores máximo e mínimo
        const maxValue = Math.max(...dataset.data);
        const minValue = Math.min(...dataset.data);
        const range = maxValue - minValue || 1;
        
        // Desenha linhas de grade
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        
        // Linhas horizontais
        for (let i = 0; i <= 5; i++) {
            const y = padding + (i * chartHeight / 5);
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
        
        // Desenha a linha do gráfico
        ctx.strokeStyle = dataset.borderColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        labels.forEach((label, index) => {
            const x = padding + (index * chartWidth / (labels.length - 1));
            const y = padding + chartHeight - ((dataset.data[index] - minValue) / range * chartHeight);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Desenha pontos
        ctx.fillStyle = dataset.backgroundColor;
        labels.forEach((label, index) => {
            const x = padding + (index * chartWidth / (labels.length - 1));
            const y = padding + chartHeight - ((dataset.data[index] - minValue) / range * chartHeight);
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    desenharGraficoPizza(ctx, data, width, height) {
        const { labels, datasets } = data;
        const dataset = datasets[0];
        
        if (labels.length === 0) return;
        
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 3;
        
        const total = dataset.data.reduce((sum, value) => sum + value, 0);
        let currentAngle = -Math.PI / 2; // Começa do topo
        
        labels.forEach((label, index) => {
            const value = dataset.data[index];
            const sliceAngle = (value / total) * 2 * Math.PI;
            
            // Desenha a fatia
            ctx.fillStyle = dataset.backgroundColor[index % dataset.backgroundColor.length];
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();
            
            currentAngle += sliceAngle;
        });
    }

    desenharGraficoBarras(ctx, data, width, height) {
        const { labels, datasets } = data;
        const dataset = datasets[0];
        
        if (labels.length === 0) return;
        
        const padding = 60;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;
        const barWidth = chartWidth / labels.length * 0.8;
        const barSpacing = chartWidth / labels.length * 0.2;
        
        // Encontra valor máximo
        const maxValue = Math.max(...dataset.data);
        
        // Desenha barras
        labels.forEach((label, index) => {
            const value = dataset.data[index];
            const barHeight = (value / maxValue) * chartHeight;
            const x = padding + index * (chartWidth / labels.length) + barSpacing / 2;
            const y = padding + chartHeight - barHeight;
            
            // Desenha a barra
            ctx.fillStyle = dataset.backgroundColor;
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Borda da barra
            ctx.strokeStyle = dataset.borderColor;
            ctx.lineWidth = dataset.borderWidth;
            ctx.strokeRect(x, y, barWidth, barHeight);
        });
    }

    exportarRelatorios() {
        // Simula exportação de PDF
        this.showNotification('Exportando relatórios para PDF...', 'info');
        
        setTimeout(() => {
            this.showNotification('Relatórios exportados com sucesso!', 'success');
        }, 2000);
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
        // Só atualiza o estoque se não estiver conectado ao Supabase
        if (this.isConnected && this.supabase) {
            console.log('📦 Conectado ao Supabase, não é necessário atualizar estoque localmente');
            return;
        }
        
        console.log('📦 Atualizando estoque local...');
        // Atualiza o estoque baseado nos produtos existentes
        this.data.estoque = this.data.produtos.map(p => ({
            id: p.id,
            produto: p.nome,
            quantidade: p.estoque || 0,
            minimo: p.estoque_minimo || 0,
            ativo: true
        }));
        
        // Salva o estoque atualizado
        localStorage.setItem('estoque', JSON.stringify(this.data.estoque));
        
        // Atualiza a tabela de estoque se estiver visível
        if (document.getElementById('estoque-table')) {
            this.updateTabelaEstoque();
        }
        
        console.log('📦 Estoque local atualizado:', this.data.estoque);
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

    // Função para carregar tema
    loadTheme() {
        if (localStorage.getItem('darkTheme') === 'true') {
            document.body.classList.add('dark-theme');
            this.updateThemeButton();
        }
    }

    // Função para alternar tema
    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('darkTheme', isDark);
        this.updateThemeButton();
    }

    // Função para atualizar botão de tema
    updateThemeButton() {
        const icon = document.querySelector('.btn-info i');
        if (icon) {
            icon.className = document.body.classList.contains('dark-theme')
                ? 'fas fa-sun'
                : 'fas fa-moon';
        }
    }

    // Função para atualizar todas as tabelas
    atualizarTodasTabelas() {
        console.log('🔄 Atualizando todas as tabelas...');
        
        // Atualiza dashboard
        this.updateDashboard();
        
        // Atualiza todas as tabelas principais
        this.updateTabelaProdutos();
        this.updateTabelaEstoque();
        this.updateTabelaClientes();
        this.updateTabelaVendas();
        this.updateTabelaCategorias();
        this.updateRelatorios();
        
        console.log('✅ Todas as tabelas foram atualizadas!');
    }

    // Função para forçar recarga dos dados do Supabase
    async recarregarDadosSupabase() {
        if (!this.isConnected || !this.supabase) {
            console.warn('⚠️ Supabase não disponível');
            return false;
        }
        
        try {
            console.log('🔄 Recarregando dados do Supabase...');
            await this.loadAllData();
            console.log('✅ Dados do Supabase recarregados com sucesso!');
            return true;
        } catch (error) {
            console.error('❌ Erro ao recarregar dados do Supabase:', error);
            return false;
        }
    }

    // Função para forçar recarga específica do estoque
    async recarregarEstoque() {
        try {
            console.log('🔄 Forçando recarga do estoque...');
            this.showNotification('Recarregando dados do Supabase...', 'info');
            
            // Limpa dados atuais
            this.data.estoque = [];
            
            // Recarrega do Supabase
            await this.loadEstoque();
            
            // Atualiza a tabela
            this.updateTabelaEstoque();
            
            this.showNotification('Estoque recarregado com sucesso!', 'success');
            
        } catch (error) {
            console.error('❌ Erro ao recarregar estoque:', error);
            this.showNotification('Erro ao recarregar estoque!', 'error');
        }
    }

    // Função para forçar recarga específica dos produtos
    async recarregarProdutos() {
        try {
            console.log('🔄 Forçando recarga dos produtos...');
            this.showNotification('Recarregando dados do Supabase...', 'info');
            
            // Limpa dados atuais
            this.data.produtos = [];
            
            // Recarrega do Supabase
            await this.loadProdutos();
            
            // Atualiza a tabela
            this.updateTabelaProdutos();
            
            this.showNotification('Produtos recarregados com sucesso!', 'success');
            
        } catch (error) {
            console.error('❌ Erro ao recarregar produtos:', error);
            this.showNotification('Erro ao recarregar produtos!', 'error');
        }
    }

    // Função para verificar se os dados estão sincronizados
    verificarSincronizacao() {
        const estoqueLocal = localStorage.getItem('estoque');
        const produtosLocal = localStorage.getItem('produtos');
        
        console.log('🔍 === VERIFICAÇÃO DE SINCRONIZAÇÃO ===');
        
        if (this.isConnected && this.supabase) {
            console.log('🔗 Status da conexão Supabase:', this.isConnected);
            console.log('📦 Dados de estoque carregados:', this.data.estoque.length);
            console.log('📦 Dados de produtos carregados:', this.data.produtos.length);
            
            // Mostra detalhes dos primeiros itens para debug
            if (this.data.estoque.length > 0) {
                console.log('📦 Primeiro item de estoque:', this.data.estoque[0]);
            }
            if (this.data.produtos.length > 0) {
                console.log('📦 Primeiro produto:', this.data.produtos[0]);
            }
            
            if (estoqueLocal) {
                const estoqueLocalParsed = JSON.parse(estoqueLocal);
                console.log('💾 Estoque no localStorage:', estoqueLocalParsed.length);
                if (estoqueLocalParsed.length > 0) {
                    console.log('💾 Primeiro item local:', estoqueLocalParsed[0]);
                }
            }
            
            if (produtosLocal) {
                const produtosLocalParsed = JSON.parse(produtosLocal);
                console.log('💾 Produtos no localStorage:', produtosLocalParsed.length);
                if (produtosLocalParsed.length > 0) {
                    console.log('💾 Primeiro produto local:', produtosLocalParsed[0]);
                }
            }
        } else {
            console.log('📱 Modo local ativo');
        }
        
        console.log('🔍 === FIM DA VERIFICAÇÃO ===');
    }

    // Função para mostrar formulário de estoque
    showFormEstoque() {
        // Por enquanto, mostra uma notificação
        this.showNotification('Funcionalidade de adicionar item em desenvolvimento!', 'info');
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
