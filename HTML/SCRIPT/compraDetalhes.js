window.onload = function(){
     
     let idUser = 0;
     
     fetch("http://localhost:8080/usuarios/meCliente",{
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
     })
     .then(res =>{
        if(!res.ok){
            throw new Error("Erro na requisição"); 
        }
        return res.json();
     })
     .then(usuario => {
        const urlParams = new URLSearchParams(window.location.search);
        const idImovel = urlParams.get("id");
        idUser = usuario.id;
        comprar(idImovel,idUser);
    })
    .catch(err => console.error(err));
}

function comprar(idImovel,idUser){

            fetch(`http://localhost:8080/imoveis/compra/${idUser}/${idImovel}`,{
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            if(!res.ok){
             throw new Error("Erro na requisição de compra");
            }
            return res.json();
        })
        .catch(err => console.error(err));
}