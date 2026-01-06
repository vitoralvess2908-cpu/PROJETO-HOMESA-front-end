function pesquisaImovel() {
    const cep = document.getElementById("cep")?.value;


    // Pega valores selecionados dos radio buttons
    const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
    const tamanho = document.querySelector('input[name="tamanho"]:checked')?.value;
    const preco = document.querySelector('input[name="preco"]:checked')?.value;

    // Monta query string dinamicamente
    let query = [];
    if (cep) query.push(`cep=${cep}`);
    
    // Traduz os valores de preço para min/max
    if (preco) {
        if (preco === "baixo") {
            query.push("precoMax=100000"); // até 100 mil
        } else if (preco === "medio") {
            query.push("precoMin=100000");
            query.push("precoMax=300000"); // entre 100 mil e 300 mil
        } else if (preco === "alto") {
            query.push("precoMin=300000"); // acima de 300 mil
        }
    }
    //Traduz os valores para pequeno/grande
        if(tamanho){
            if(tamanho === "pequeno"){
                query.push("tamanhoMin=15");
            }else if(tamanho === "medio"){
                query.push("tamanhoMin=15");
                query.push("tamanhoMax=1000");
            }else if(tamanho === "grande"){
                query.push("tamanhoMax=1000");
            }
        }

    const url = `http://localhost:8080/imoveis/pesquisa?${query.join("&")}`;
    
    fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na requisição");
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                Swal.fire({
                    title: "Imóvel não encontrado",
                    icon: "error"
                });
                return;
            }
            console.log("Imóveis encontrados:", data);
            mostrarImoveis(data);
        })
        .catch(err => {
            console.error(err);
            window.alert("ERRO AO BUSCAR IMÓVEIS");
        });
}


function mostrarImoveis(imoveis){
    cepResult.innerHTML = "";
    //Elementos HTML com dados da API
    
if (imoveis.length === 0) {
        cepResult.innerHTML = "<p>Nenhum imóvel encontrado com esse CEP.</p>";
        return;
    }
    let html = "";

    
    imoveis.forEach(imovel => {
        html += `<div class="card" onclick="abrirDetalhes(${imovel.id})">
            <h3>Imóvel encontrado:</h3>
            <div class="text-center">
            <img src="http://localhost:8080/imoveis/${imovel.id}/imagem" 
                 alt="Imagem do imóvel ${imovel.id}" class="imagem" width="200">
            </div>
            <strong>ID: ${imovel.id}</strong><br>
            <strong>Endereço: ${imovel.endereco}</strong><br>
            <strong>CEP: ${imovel.cep}</strong>
        </div>`;
    });

    cepResult.innerHTML = html;
}

//todo: userId, compra
function abrirDetalhes(id){
    //redireciona e tambem coloca um pathvariable, nesse exemplo é "id"
    window.location.href = `verImovel.html?id=${id}`;
}