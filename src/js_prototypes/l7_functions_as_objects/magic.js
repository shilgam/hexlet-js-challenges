/*  >>>>>  EX  <<<<< magic.js
Реализуйте и экспортируйте по умолчанию функцию, которая работает следующим образом:

Принимает на вход любое число аргументов и возвращает функцию, которая, в свою
очередь, принимает на вход любое количество аргументов и так до бесконечности
(привет, рекурсия ;)).
Результат вызова этой функции при проверке на равенство должен быть равен сумме
всех аргументов всех подфункций.

> magic() == 0; // true
> magic(5, 2, -8) == -1; // true
> magic(1, 2)(3, 4, 5)(6)(7, 10) == 38; // true
> magic(4, 8, 1, -1, -8)(3)(-3)(7, 2) == 13; // true

    ПОДСКАЗКИ:
1. Объекты в js по умолчанию имеют метод valueOf, который вызывается автоматически
в тех местах, где требуется преобразование к числовому значению (контекст
арифметических операций и операций нестрогого сравнения). В ситуации выше, во
время сравнения, js вызовет valueOf для нашей функции. Этим можно
воспользоваться для того, чтобы возвращать сумму через valueOf.

> const obj = {}
> obj + 3; // '[object Object]3'
> obj.valueOf = () => 3;
> obj + 7; // 10
*/
// BEGIN (write your solution here)
const magic = (...numbers) => {
  const sum = numbers.reduce((acc, x) => acc + x, 0);
  const inner = (...rest) => magic(sum, ...rest);
  inner.valueOf = () => sum;
  return inner;
};

export default magic;
// END

// console.log(magic(3, 6, 7, 9) + 0); // 25
// console.log(magic() == 0); // true
// console.log(magic(2)(6, 2) == 10); // true
// console.log(magic(1, 2)(3, 4, 5)(6)(7, 10) == 38); // true
