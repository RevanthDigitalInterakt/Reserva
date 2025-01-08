  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  // Esta função cria uma matriz de identidade 4x4.
  // Uma matriz de identidade é uma matriz quadrada
  // que tem 1s na diagonal principal e 0s em todos os outros elementos.
  var createIdentityMatrix = function createIdentityMatrix() {
    return [1, 0, 0, 0,
    // Primeira linha
    0, 1, 0, 0,
    // Segunda linha
    0, 0, 1, 0,
    // Terceira linha
    0, 0, 0, 1 // Quarta linha
    ];
  };

  // Função para multiplicar duas matrizes 4x4.
  // A multiplicação de matrizes não é comutativa, então a ordem de 'a' e 'b' importa.
  var multiplyInto = function multiplyInto(out, a, b) {
    var i;
    var ai0;
    var ai1;
    var ai2;
    var ai3;
    for (i = 0; i < 4; i++) {
      ai0 = a[i];
      ai1 = a[i + 4];
      ai2 = a[i + 8];
      ai3 = a[i + 12];
      out[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
      out[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
      out[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
      out[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
    }
    return out;
  };

  // Função para rotacionar uma matriz no eixo X.
  // O ângulo de rotação é dado em graus e é convertido para radianos.
  var rotateXMatrix = function rotateXMatrix(matrix, deg) {
    var rad = Math.PI / 180 * deg;
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);
    var rotate = [1, 0, 0, 0,
    // Mantém a linha X inalterada
    0, cos, -sin, 0,
    // Transforma a linha Y com base no cosseno e seno
    0, sin, cos, 0,
    // Transforma a linha Z com base no cosseno e seno
    0, 0, 0, 1 // Mantém a linha W inalterada
    ];
    return multiplyInto(matrix, matrix, rotate);
  };

  // Função para aplicar a transformação de perspectiva em uma matriz.
  // Isso tem o efeito de adicionar profundidade 3D à transformação.
  var perspectiveMatrix = function perspectiveMatrix(matrix, value) {
    var perspective = createIdentityMatrix();
    perspective[11] = -1 / value; // Adiciona perspectiva dividindo pela profundidade desejada
    return multiplyInto(matrix, matrix, perspective);
  };

  // Função para traduzir (mover) uma matriz em um espaço 3D.
  var translateMatrix = function translateMatrix(matrix, origin) {
    var x = origin.x,
      y = origin.y,
      z = origin.z;
    var translate = createIdentityMatrix();
    translate[12] = x; // Deslocamento no eixo X
    translate[13] = y; // Deslocamento no eixo Y
    translate[14] = z; // Deslocamento no eixo Z
    return multiplyInto(matrix, matrix, translate);
  };

  // Função para desfazer a tradução de uma matriz em um espaço 3D.
  var untranslateMatrix = function untranslateMatrix(matrix, origin) {
    var x = origin.x,
      y = origin.y,
      z = origin.z;
    return translateMatrix(matrix, {
      x: -x,
      y: -y,
      z: -z
    });
  };
  var _default = exports.default = {
    createIdentityMatrix: createIdentityMatrix,
    multiplyInto: multiplyInto,
    rotateXMatrix: rotateXMatrix,
    perspectiveMatrix: perspectiveMatrix,
    translateMatrix: translateMatrix,
    untranslateMatrix: untranslateMatrix
  };
