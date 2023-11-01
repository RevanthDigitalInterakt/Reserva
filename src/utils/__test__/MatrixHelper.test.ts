import matrixFunctions from '../MatrixHelper';

describe('Matrix Functions', () => {
  test('createIdentityMatrix should return a 4x4 identity matrix', () => {
    const identity = matrixFunctions.createIdentityMatrix();
    expect(identity).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  });

  test('multiplyInto should multiply two matrices correctly', () => {
    const a = matrixFunctions.createIdentityMatrix();
    const b = [2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2];
    const result = matrixFunctions.multiplyInto([], a, b);
    expect(result).toEqual(b);
  });

  test('rotateXMatrix should rotate matrix on X axis', () => {
    // Para esse teste, você pode ou usar uma matriz conhecida
    // e seu resultado após rotação ou usar casos mais simples.
    // Neste exemplo, a matriz de identidade é rotacionada em 0 graus no eixo X (sem alterações).
    const identity = matrixFunctions.createIdentityMatrix();
    const rotated = matrixFunctions.rotateXMatrix(identity, 0);
    expect(rotated).toEqual(identity);
  });

  test('perspectiveMatrix should apply 3D depth transformation', () => {
    // Semelhante ao teste de rotação, este teste pode ser mais
    // elaborado dependendo das necessidades.
    const identity = matrixFunctions.createIdentityMatrix();
    const perspective = matrixFunctions.perspectiveMatrix(identity, 1000);
    expect(perspective[11]).toEqual(-0.001);
  });

  test('translateMatrix should translate matrix in 3D space', () => {
    const identity = matrixFunctions.createIdentityMatrix();
    const translated = matrixFunctions.translateMatrix(identity, {
      x: 10,
      y: 5,
      z: 2,
    });
    expect(translated[12]).toEqual(10);
    expect(translated[13]).toEqual(5);
    expect(translated[14]).toEqual(2);
  });

  test('untranslateMatrix should undo the translation of a matrix in 3D space', () => {
    const identity = matrixFunctions.createIdentityMatrix();
    const translated = matrixFunctions.translateMatrix(identity, {
      x: 10,
      y: 5,
      z: 2,
    });
    const untranslated = matrixFunctions.untranslateMatrix(translated, {
      x: 10,
      y: 5,
      z: 2,
    });
    expect(untranslated).toEqual(identity);
  });
});
