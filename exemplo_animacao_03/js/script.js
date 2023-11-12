 // Seleciona o elemento com a classe .btnClique e atribui-o à variável 'animacao'
let animacao = document.querySelector('.divConteudoTexto .btnClique');

// Adiciona um ouvinte de evento de clique ao elemento 'animacao'
animacao.addEventListener('click', function(e) {  
    // Quando o elemento 'animacao' é clicado, o seguinte código é executado:

    // Seleciona o elemento com a classe .corVermelho e altera a classe para .corVermelho-expand,
    // que aplica uma transformação para expandir o elemento.
    //essa mesma ideia é propagada para as outras cores
    document.querySelector('.corVermelho').classList.toggle('corVermelho-expand');
    document.querySelector('.corVerde').classList.toggle('corVerde-expand');
    document.querySelector('.corAmarelo').classList.toggle('corAmarelo-expand');
    document.querySelector('.corAzul').classList.toggle('corAzul-expand');
});
