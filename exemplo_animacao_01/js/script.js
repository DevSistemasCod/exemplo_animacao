// Constante para a conversão de graus para radianos
const RAIO = Math.PI / 180;

//Converte graus para radianos.
function paraRadianos(graus) {
  return graus * RAIO;
}

/**
 * Desenha uma imagem rotacionada em torno de um ponto de origem especificado.
 * @param {CanvasRenderingContext2D} contexto - O contexto 2D do canvas.
 * @param {HTMLImageElement} imagem - A imagem a ser desenhada.
 * @param {number} xImagem - A coordenada x da posição da imagem.
 * @param {number} yImagem - A coordenada y da posição da imagem.
 * @param {number} xOrigem - A coordenada x do ponto de origem da rotação.
 * @param {number} yOrigem - A coordenada y do ponto de origem da rotação.
 * @param {number} graus - O ângulo de rotação em graus.
 */
function desenharRotacionado(contexto, imagem, xImagem, yImagem, xOrigem, yOrigem, graus) {
  let radianos = paraRadianos(graus);
  contexto.save();
  contexto.translate(+xOrigem, +yOrigem);
  contexto.rotate(radianos);
  contexto.translate(-xOrigem, -yOrigem);
  contexto.drawImage(imagem, xImagem, yImagem);
  contexto.restore();
}

/**
 * Desenha uma imagem rotacionada em torno de seu centro.
 * @param {CanvasRenderingContext2D} contexto - O contexto 2D do canvas.
 * @param {HTMLImageElement} imagem - A imagem a ser desenhada.
 * @param {number} xImagem - A coordenada x da posição da imagem.
 * @param {number} yImagem - A coordenada y da posição da imagem.
 * @param {number} graus - O ângulo de rotação em graus.
 */
function desenharRotacionadoComCentro(contexto, imagem, xImagem, yImagem, graus) {
  let xOrigem = (0.5 * imagem.width);
  let yOrigem = (0.5 * imagem.height);
  //obs:. Ao multiplicar esses valores por 0.5 estamos efetivamente 
  //calculando a metade da largura e da altura da imagem. 
  // Isso resulta nas coordenadas do ponto central da imagem.
  desenharRotacionado(contexto, imagem, xImagem, yImagem, xOrigem, yOrigem, graus);
}

// Seleciona o elemento canvas pelo ID
let tela = document.querySelector('#minha-tela');
// Obtém o contexto 2D do canvas
let contexto = tela.getContext('2d');

// Cria uma nova instância de Image
let imagem = new Image();

// Define a função a ser executada quando a imagem é carregada
imagem.onload = function() {
  // Inicializa o ângulo de rotação
  var graus = 0;
  // Calcula o tempo final para a animação (3 segundos a partir de agora)
  var fimTempo = Date.now() + 3000;

  // Função de animação
  function animar() {
    // Limpa o canvas
    contexto.clearRect(0, 0, tela.width, tela.height);

    // Desenha a imagem no ponto (50, 50) e a rotaciona em torno de seu centro
    desenharRotacionadoComCentro(contexto, imagem, 50, 50, graus);

    // Verifica se o tempo atual é menor que o tempo final
    if (Date.now() < fimTempo) {
      // Incrementa o ângulo de rotação
      graus += 1;
      // Agenda a próxima animação
      requestAnimationFrame(animar);
    }
  }

  // Inicia a animação
  animar();
};

// Define a fonte da imagem
imagem.src = 'https://i.pinimg.com/736x/3b/e9/b1/3be9b13213fa3b12420380b91de92ed1.jpg';
