function login(){
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    fetch("http://localhost:8080/auth/login", {
        method : "POST",
        headers : { "Content-Type": "application/json"},
        body : JSON.stringify({email,senha})
    })
    .then(res => {
        if(!res.ok)throw new Error("Login Inválido");
        console.log("Status", res.status)
        return res.json();
    })

    
    .then(data => {
        localStorage.setItem("token",data.token);
        alert("Login realizado com sucesso!");

        // Redireciona por role
        const role = getRoleFromToken();
    if (role === "CLIENTE") {
        window.location.href = `homeCliente.html`;
    } else if (role === "PROPRIETARIO") {
        window.location.href = `homeProprietario.html`;
    }
    })

    .catch(err => {
        window.alert("Verificação mal-sucedida");
    })
}

function getToken() {
    return localStorage.getItem("token");
}


function parseJwt(token){
    if (!token) return null;

    //acessa o token e divide ele em espacos dentro de um array, onde cada ponto é um elemento. nesse token temos 3 pontos.
    const base64PayLoad = token.split(".")[1];
    //decodifica o base64
    const payloadDecoded = atob(base64PayLoad);

    //transforma em json
    return JSON.parse(payloadDecoded);
} 

function getRoleFromToken(){
    const token = getToken();
    if(!token) return null;

    const payload = parseJwt(token);
    return payload?.role || null;
}