
//VERIFICA SE O USUARIO NÃO ESTÁ LOGADO
    window.onload = function() {
    const usuario = localStorage.getItem("token");
    if (!usuario) {
        window.location.href = "login.html";
    }
};
//Metodo enviar imovel
function enviarImovel(){
  //Arquivo que vai ser enviado ao backend
  const formData = new FormData();
  //pega os dados alocados
  const usuario = localStorage.getItem("token");

  const imovel = {
    preco : document.getElementById("preco").value,
    endereco : document.getElementById("endereco").value,
    numeroEnde : document.getElementById("numeroEnde").value,
    tamanho: document.getElementById("tamanhoImovel").value,
    cep : document.getElementById("cep").value,
  }
  
  //Adiciona no arquivo Json, o objeto javascript(já formatado em json)
  formData.append("imovel", new Blob([JSON.stringify(imovel)], { 
    type: "application/json"
  }));

  //Adiciona uma imagem no objeto json
  const fileInput = document.getElementById("imagem");
  if(fileInput.files.length > 0){
    formData.append("imagem", fileInput.files[0]);
  }

  //Acessa a API
  fetch("http://localhost:8080/imoveis/cadastroImovel", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + usuario
    },
    body: formData
  })
  .then(res => {
    // ✅ Verifica o status da resposta ANTES de processar
    if (res.status === 403) {
      // Tratamento específico para erro 403
      Swal.fire({
        title: "Acesso Negado!",
        text: "Apenas proprietários podem cadastrar imóveis. Clientes não têm permissão para esta ação.",
        icon: "error",
        confirmButtonText: "Entendi"
      });
      throw new Error("Acesso negado - Role insuficiente");
    }
    
    if (!res.ok) {
      // Tratamento para outros erros HTTP
      throw new Error(`Erro HTTP: ${res.status}`);
    }
    
    return res.text();
  })
  .then(msg => {
    console.log("Resposta do servidor:", msg);
    Swal.fire({
      title: "Resposta enviada com sucesso!",
      text: "Você enviou o seu imóvel!",
      icon: "success"
    });

    // ✅ Redireciona para outra página
    window.location.href = "homeProprietario.html";
  })
  .catch(error => {
    console.error("Erro ao enviar Imóvel:", error);
    
    // Evita mostrar alerta duplicado se já foi tratado no 403
    if (!error.message.includes("Acesso negado")) {
      Swal.fire({
        title: "Erro de conexão",
        text: "Não foi possível enviar o imóvel. Tente novamente.",
        icon: "error"
      });
    }
  });
}
        