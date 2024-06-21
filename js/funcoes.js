
    function validarProduto(idNomeProduto, idCodProduto, idQtidadeProduto) {
        let nome = document.getElementById(idNomeProduto).value;
        let codigo = document.getElementById(idCodProduto).value;
        let qtidade = document.getElementById(idQtidadeProduto).value;

        if (nome == "")
            alert("Nome do produto não pode estar em branco. Favor preenchê-lo!");
        else if (codigo == "")
            alert("Código do produto não pode estar em branco. Favor preenchê-lo!");
        else cadastrarProduto(nome, codigo, parseInt(qtidade));
    }
   
    function cadastrarProduto(produto, codig, qtidade) {
        let novoProduto = { nome: produto, codigo: codig, quantidade: qtidade };
    
        if (typeof(Storage) !== "undefined") {
            let produtos = localStorage.getItem("produtos");
            if (produtos == null) produtos = []; // Nenhum produto ainda foi cadastrado
            else produtos = JSON.parse(produtos);
            produtos.push(novoProduto); // Adiciona um novo produto
            localStorage.setItem("produtos", JSON.stringify(produtos));
            alert("Foram cadastradas com sucesso " + qtidade + " unidades do produto " + produto + "!");
            atualizarTotalEstoque();
            location.reload();
        } else {
            alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
        }
    }
    

    
    function atualizarTotalEstoque() {
        if (typeof(Storage) !== "undefined") {
            let produtos = localStorage.getItem("produtos");
            let total = 0;
            if (produtos != null) {
                produtos = JSON.parse(produtos);
                produtos.forEach(produto => {
                    total += produto.quantidade;
                });
            }
            document.getElementById("totalEstoque").innerHTML = total;
            localStorage.setItem("totalEstoque", total);
        } else {
            alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
        }
    }
    
    
    function carregarTotalEstoque(idCampo) {
        if (typeof(Storage) !== "undefined") {
            let totalEstoque = localStorage.getItem("totalEstoque");
            if (totalEstoque == null) totalEstoque = 0;
            document.getElementById(idCampo).innerHTML = totalEstoque;
        } else {
            alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
        }
    }
    



    window.addEventListener('load', function() {
        listarEstoque();
    });

    function listarEstoque() {
        
        const estoqueDiv = document.getElementById('estoque-div');
        estoqueDiv.innerHTML = '';

        if (typeof(Storage)!== "undefined") {
        let produtos = localStorage.getItem("produtos");
        estoqueDiv.innerHTML += "<h1>Estoque:</h1>";
        if (produtos == null)
            estoqueDiv.innerHTML += "<h3>Ainda não há nenhum item no estoque</h3>";
        else {
            produtos = JSON.parse(produtos);
            produtos.forEach(produto => {
                const card = `
                <div class="card">
                <h2>• ${produto.nome}</h2>
                <p>• Código do produto: ${produto.codigo}</p>
                <p>• Quantidade no estoque: ${produto.quantidade}</p>
                
                <button class="delete-btn" onclick="deleteCard(this.parentNode)">
                <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                </button>
                </div

            `;
            estoqueDiv.innerHTML += card;
            });
        }
        } else {
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");
        }
    }


    //   deletar o codigo
    function deleteCard(card) {
        // Obter informações do produto do card
        const produtoCodigo = card.querySelector('p:nth-child(2)').textContent.split(':')[1].trim();
        const produtoQuantidade = parseInt(card.querySelector('p:nth-child(3)').textContent.split(':')[1].trim(), 10);
    
        
        card.remove();
    
        // remover o iten do estoque 
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        
        // Encontra o índice do produto no array
        const index = produtos.findIndex(produto => produto.codigo === produtoCodigo);
        
        // Verifica se o produto foi encontrado e o deleta da lista
        if (index !== -1) {
            produtos.splice(index, 1);
            localStorage.setItem('produtos', JSON.stringify(produtos));
        }
    
        // Atualizar o total de itens no estoque
        let totalEstoque = parseInt(localStorage.getItem('totalEstoque'), 10) || 0;
        totalEstoque -= produtoQuantidade;
        if (totalEstoque < 0) totalEstoque = 0;
        localStorage.setItem('totalEstoque', totalEstoque);
    
        // Atualizar a exibição do total de itens no estoque pegando a 
        //variavel totalEstoque
        document.getElementById('totalEstoque').textContent = totalEstoque;
    }

    //funçao onde esta dando erro de carregar o estoque.
    // async function carregarDadosRemotos() {
    //     try {
    //         // Simulando uma requisição assíncrona para carregar dados de um servidor
    //         let response = await fetch('https://api.exemplo.com/dados'); // Aqui usamos await para esperar a resposta da requisição
    //         let data = await response.json(); // Aqui também usamos await para esperar o parsing da resposta para JSON
    //         return data; // Retorna os dados carregados
    //     } catch (error) {
    //         console.error('Erro ao carregar dados remotos:', error);
    //         throw error; // Lança o erro para ser tratado onde a função for chamada
    //     }
    // }
    
    // async function listarEstoque() {
    //     const estoqueDiv = document.getElementById('estoque-div');
    //     estoqueDiv.innerHTML = '';
    
    //     try {
    //         // Chamada assíncrona para carregar os dados antes de listar o estoque
    //         let produtos = await carregarDadosRemotos();
    
    //         estoqueDiv.innerHTML += "<h1>Estoque:</h1>";
    //         if (produtos.length === 0)
    //             estoqueDiv.innerHTML += "<h3>Ainda não há nenhum item no estoque</h3>";
    //         else {
    //             produtos.forEach(produto => {
    //                 const card = `
    //                     <div class="card">
    //                         <h2>• ${produto.nome}</h2>
    //                         <p>• Código do produto: ${produto.codigo}</p>
    //                         <p>• Quantidade no estoque: ${produto.quantidade}</p>
                            
    //                         <button class="delete-btn" onclick="deleteCard(this.parentNode)">
    //                             <svg viewBox="0 0 448 512" class="svgIcon">
    //                                 <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
    //                             </svg>
    //                         </button>
    //                     </div>
    //                 `;
    //                 estoqueDiv.innerHTML += card;
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Erro ao listar estoque:', error);
    //         estoqueDiv.innerHTML = '<h3>Ocorreu um erro ao carregar o estoque</h3>';
    //     }
    // }
    