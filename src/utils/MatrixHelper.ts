// Esta função cria uma matriz de identidade 4x4.
// Uma matriz de identidade é uma matriz quadrada
// que tem 1s na diagonal principal e 0s em todos os outros elementos.
const createIdentityMatrix = (): number[] => [
  1,
  0,
  0,
  0, // Primeira linha
  0,
  1,
  0,
  0, // Segunda linha
  0,
  0,
  1,
  0, // Terceira linha
  0,
  0,
  0,
  1, // Quarta linha
];

// Função para multiplicar duas matrizes 4x4.
// A multiplicação de matrizes não é comutativa, então a ordem de 'a' e 'b' importa.
const multiplyInto = (out: number[], a: number[], b: number[]): number[] => {
  let i;
  let ai0;
  let ai1;
  let ai2;
  let ai3;
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
const rotateXMatrix = (matrix: number[], deg: number): number[] => {
  const rad = (Math.PI / 180) * deg;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const rotate = [
    1,
    0,
    0,
    0, // Mantém a linha X inalterada
    0,
    cos,
    -sin,
    0, // Transforma a linha Y com base no cosseno e seno
    0,
    sin,
    cos,
    0, // Transforma a linha Z com base no cosseno e seno
    0,
    0,
    0,
    1, // Mantém a linha W inalterada
  ];
  return multiplyInto(matrix, matrix, rotate);
};

// Função para aplicar a transformação de perspectiva em uma matriz.
// Isso tem o efeito de adicionar profundidade 3D à transformação.
const perspectiveMatrix = (matrix: number[], value: number): number[] => {
  const perspective = createIdentityMatrix();
  perspective[11] = -1 / value; // Adiciona perspectiva dividindo pela profundidade desejada
  return multiplyInto(matrix, matrix, perspective);
};

// Função para traduzir (mover) uma matriz em um espaço 3D.
const translateMatrix = (
  matrix: number[],
  origin: { x: number; y: number; z: number },
): number[] => {
  const { x, y, z } = origin;
  const translate = createIdentityMatrix();
  translate[12] = x; // Deslocamento no eixo X
  translate[13] = y; // Deslocamento no eixo Y
  translate[14] = z; // Deslocamento no eixo Z
  return multiplyInto(matrix, matrix, translate);
};

// Função para desfazer a tradução de uma matriz em um espaço 3D.
const untranslateMatrix = (
  matrix: number[],
  origin: { x: number; y: number; z: number },
): number[] => {
  const { x, y, z } = origin;
  return translateMatrix(matrix, { x: -x, y: -y, z: -z });
};

export default {
  createIdentityMatrix,
  multiplyInto,
  rotateXMatrix,
  perspectiveMatrix,
  translateMatrix,
  untranslateMatrix,
};
