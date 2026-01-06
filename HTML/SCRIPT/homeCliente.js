window.onload = function dadosCliente(){
    fetch("http://localhost:8080/usuarios/meCliente" ,{
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(res => {
        if(!res.ok){
            throw new Error("Erro na requisição")
        }
        return res.json();
    })
    .then(usuario =>{
        mostrarUsuario(usuario);
    })
    .catch(err => console.log(err));
}



 function mostrarUsuario(usuario){

    const conteudo = document.getElementById("conteudo");
let html = "";

    html += `<div class="content">
            <h1>Bem vindo ${usuario.nome}</h1>
    </div>
    
    <div class="comprar">
            <h3>Compre já um imóvel,é rápido e fácil🏠</h3>
            <p>Apenas click no link abaixo </p>
            <a href="pesquisaImoveis.html">Comprar um imóvel</a>
        </div><br>

    <div class="cliente">
        <h3>Seus dados</h3>
        <img src="avataaars.jpg" alt="" class="perfil"> 
        <div class="div-inf">
        <p><strong>Nome:</strong> ${usuario.nome}</p>
        <p><strong>Id:</strong> ${usuario.id}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Tipo de conta:</strong> CLIENTE</p>
        </div>
        
    </div>
    
    <div class="imoveis">
    <h2>Seus Imóveis</h2>`
    

    usuario.imoveis.forEach(imovel => {

    html+= `
        <div class="card">
            <div class="div-img">
                
                <img src="http://localhost:8080/imoveis/${imovel.id}/imagem" alt="Imagem do imóvel" class="imagem">
            </div>
            
            <div class="div-info">  
            <p><img src="localizacao.png" class="icon"><strong>Endereço: </strong>${imovel.endereco}</p>
            <p><strong>Número:</strong> ${imovel.numero}</p>
            <p><strong>Cep:</strong> ${imovel.cep}</p>
            <p><strong>Vendido: </strong> ${imovel.vendido}</p>
            </div>
            <button onclick="verImovel(${imovel.id})">Ver Imóvel</button>
        </div>`;
})
conteudo.innerHTML = html;

}