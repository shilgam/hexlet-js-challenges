/*  >>>>>  EX  <<<<<
Реализуйте функции select, orderBy используя подход без мутации состояния.
*/

class Enumerable {
  constructor(collection) {
    this.collection = collection;
  }

  select(fn) {
    // BEGIN (write your solution here)
    const selected = this.collection.map(fn);
    return new Enumerable(selected);
    // END
  }

  orderBy(fn, direction = 'asc') {
    // BEGIN (write your solution here)
    const comparator = (a, b) => {
      const elA = fn(a);
      const elB = fn(b);
      const compareResult = direction === 'asc' ? 1 : -1;

      if (elA > elB) {
        return compareResult;
      } else if (elA < elB) {
        return -compareResult;
      }

      return 0;
    };
    const sorted = this.collection.slice().sort(comparator);
    return new Enumerable(sorted);
    // END
  }

  where(fn) {
    const filtered = this.collection.filter(fn);
    return new Enumerable(filtered);
  }

  toArray() {
    return this.collection;
  }
}

export default Enumerable;

// // TESTING
// const putsArray = arr => arr.forEach(el => console.log(el));
//
// const cars = [
//   { brand: 'bmw', model: 'm5', year: 2014 },
//   { brand: 'bmw', model: 'm4', year: 2013 },
//   { brand: 'kia', model: 'sorento', year: 2014 },
//   { brand: 'kia', model: 'rio', year: 2010 },
//   { brand: 'kia', model: 'sportage', year: 2012 },
// ];
// // putsArray(cars);
//
// const coll = new Enumerable(cars);
//
// // // Test EX1: select
// // const selected = coll.select(car => car.model);
// // console.log('>>> Applying select() to collection:');
// // putsArray(selected.toArray()); // ['m5', 'm4', 'sorento', 'rio', 'sportage']);
// // console.log('>>> Original collection:');
// // putsArray(coll.select(car => car.brand).toArray());  // all brands
// // Test EX2: OrderBy
// const sorted = coll.orderBy(car => car.model).select(car => car.model);
// console.log('>>> Applying orderBy() to collection:');
// putsArray(sorted.toArray()); // ["m4", "m5", "rio", "sorento", "sportage"]
// console.log('>>> Original collection:');
// putsArray(coll.select(car => car.model).toArray()); // ['m5', 'm4', 'sorento', 'rio', 'sportage']);
