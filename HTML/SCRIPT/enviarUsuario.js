function enviarUsuario() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const role = document.getElementById("role").value;

  // Validação
  if (!nome || !email || !senha || !role) {
    alert("Preencha todos os campos!");
    return;
  }

  fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome: nome,
      senha: senha,
      email: email,
      role: role
    })
  })
  .then(res => {
    console.log("Status:", res.status);
    if(!res.ok){
      throw new Error("Erro ao tentar criar usuário");
    }
    return res.text();  // ✅ Corrigido
  })
  .then(data => {  // ✅ Corrigido
    console.log("Resposta:", data);
    alert("Usuário criado com sucesso!");
    window.location.href = "login.html";
  })
  .catch(error => {
    console.error("Erro:", error);
    alert("Erro ao enviar usuário.");
  });
}