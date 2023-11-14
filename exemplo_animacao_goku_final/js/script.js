/**
 * Desenha uma imagem deslocando-se para a esquerda em um padrão de curva.
 * @param {CanvasRenderingContext2D} contexto - O contexto 2D do canvas.
 * @param {HTMLImageElement} imagem - A imagem a ser desenhada.
 * @param {number} xImagem - A coordenada x da posição inicial da imagem.
 * @param {number} yImagem - A coordenada y da posição inicial da imagem.
 * @param {number} tempoAtual - O tempo atual em milissegundos.
 */
function desenharComCurva(contexto, imagem, xImagem, yImagem, tempoAtual) {
  // Frequência e amplitude da curva (ajuste conforme necessário)
  const frequencia = 0.001;
  const amplitude = 60;

  // Deslocamento ao longo do eixo x
  let deslocamentoX = (tempoAtual % 10000) * ((tela.width - imagem.width) / 5000); // 5000 ms para o deslocamento

  // Calcula a posição y com base no tempo usando uma função seno
  let yAtual = yImagem + amplitude * Math.sin(frequencia * tempoAtual);

  // Desenha a imagem deslocada para a esquerda e com curva
  contexto.drawImage(imagem, xImagem - deslocamentoX, yAtual);

  // Verifica se a imagem ultrapassou a borda esquerda da tela
  if (xImagem - deslocamentoX + imagem.width < 0) {
    // Para a animação
    return false;
  }

  // A animação continua
  return true;
}

// Seleciona o elemento canvas pelo ID
let tela = document.querySelector('#minha-tela');
// Obtém o contexto 2D do canvas
let contexto = tela.getContext('2d');

// Cria uma nova instância de Image
let imagem = new Image();

// Define a função a ser executada quando a imagem é carregada
imagem.onload = function () {
  // Função de animação
  function animar() {
    // Limpa o canvas
    contexto.clearRect(0, 0, tela.width, tela.height);

    // Fase de deslocamento: Calcula a posição atual com base no tempo
    var tempoAtual = Date.now();

    // Desenha a imagem deslocada para a esquerda e com curva
    const animacaoContinua = desenharComCurva(contexto, imagem, tela.width, 50, tempoAtual);

    // Se a animação continua, agenda a próxima animação
    if (animacaoContinua) {
      requestAnimationFrame(animar);
    }
  }

  // Inicia a animação
  animar();
};

// Define a fonte da imagem
imagem.src = 'img/goku.png';
