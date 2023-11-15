
document.getElementById('btnExibirAlerta').addEventListener('click', function () {
    Swal.fire({
        title: "Isso é um título",
        text: "Aqui seria um possível texto, Acima temos um icone de sucesso",
        icon: "success"
        //icon: "question"
        //icon: "error"
      });
});
