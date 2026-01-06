window.onload = function(){
    //PEGA OS PARAMETROS DA URL QUE JÁ FOI PASSADA NO SCRIPT DE PESQUISA DE IMOVEIS
    const urlParams = new URLSearchParams(window.location.search);
    //PEGA O PARAMETRO CHAMADO "id"
    const id = urlParams.get("id");

    fetch(`http://localhost:8080/imoveis/${id}`,{
    //resposta json para o servidor
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
    }})
    .then(res => res.json())
    .then(imovel =>{
         let html = "";
        document.getElementById("detalhes").innerHTML =  `<h1>Detalhes do Imóvel</h1>
        
                <div class="card">
                <div class="content">
                <img src="http://localhost:8080/imoveis/${imovel.id}/imagem" 
                 alt="Imagem do imóvel ${imovel.id}" class="imagem" width="200">
                </div>
                <div class="content">
                <h3><strong>ID:</strong> ${imovel.id}</h3>
                <p><strong>Endereço:</strong> ${imovel.endereco}</p>
                <p><strong>CEP:</strong> ${imovel.cep}</p>
                <button class="button">modificar</button>
                </div>
                
            `;
    })
    .catch(err => window.alert("erro ao acessar imóvel desejado", err))
}