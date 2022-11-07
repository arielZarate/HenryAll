//esta fuincion verifica si dos numeros aleatorios del array
// es la suma igual al numero pasadop por parametro

const sumArray = (array, num) => {
  for (const num1 of array) {
    for (const num2 of array) {
      if (num1 === num2) continue;
      if (num1 + num2 === num) return true;
    }
  }
  return false;
};

module.exports = sumArray;
