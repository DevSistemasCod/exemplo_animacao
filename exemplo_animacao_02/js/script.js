// Constante para a conversão de graus para radianos
const RAIO = Math.PI / 75;

// Converte graus para radianos.
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
  contexto.translate(xImagem + xOrigem, yImagem + yOrigem);
  contexto.rotate(radianos);
  contexto.drawImage(imagem, -xOrigem, -yOrigem);
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
  let xOrigem = 0.5 * imagem.width;
  let yOrigem = 0.5 * imagem.height;
  desenharRotacionado(contexto, imagem, xImagem, yImagem, xOrigem, yOrigem, graus);
}

// Seleciona o elemento canvas pelo ID
let tela = document.querySelector('#minha-tela');
// Obtém o contexto 2D do canvas
let contexto = tela.getContext('2d');

// Cria uma nova instância de Image
let imagem = new Image();

// Define a função a ser executada quando a imagem é carregada
imagem.onload = function () {
  // Inicializa o ângulo de rotação
  var graus = 0;
  // Calcula o tempo final para a rotação (2.5 segundos a partir de agora)
  var fimTempoRotacao = Date.now() + 2500;
  // Calcula o tempo final para o deslocamento (mais 4 segundos após a rotação)
  var fimTempoDeslocamento = fimTempoRotacao + 4000;

  // Função de animação
  function animar() {
    // Limpa o canvas
    contexto.clearRect(0, 0, tela.width, tela.height);

    // Verifica se estamos na fase de rotação
    if (Date.now() < fimTempoRotacao) {
      // Desenha a imagem no ponto inicial e a rotaciona em torno de seu centro
      desenharRotacionadoComCentro(contexto, imagem, tela.width - imagem.width, 50, graus);
    } else if (Date.now() < fimTempoDeslocamento) {
      // Fase de deslocamento: Calcula a posição atual com base no tempo
      var tempoAtual = Date.now();
      var progresso = (tempoAtual - fimTempoRotacao) / 2500; // 2500 ms para o deslocamento
      var xInicial = tela.width - imagem.width;
      var xFinal = 0;
      var xAtual = xInicial + (xFinal - xInicial) * progresso;

      // Desenha a imagem deslocada (sem rotação)
      contexto.drawImage(imagem, xAtual, 50);
    }

    // Verifica se o tempo atual é menor que o tempo final
    if (Date.now() < fimTempoDeslocamento) {
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
