import _ from 'lodash'; // eslint-disable-line

import buildNode from './buildNode';

/*  >>>>>  EX  <<<<< PairedTag.js, SingleTag.js
1. Реализуйте типы тегов как подтипы типа Node.
2. Добавьте необходимые функции в прототипы типов.
*/

const propertyActions = [
  {
    name: 'body',
    check: arg => typeof arg === 'string',
    process: _.identity,
  },
  {
    name: 'children',
    check: arg => arg instanceof Array,
    process: (children, f) => children.map(f),
  },
  {
    name: 'attributes',
    check: arg => arg instanceof Object,
    process: _.identity,
  },
];

const getPropertyAction = arg => _.find(propertyActions, ({ check }) => check(arg));

const parse = (data) => {
  const args = data.slice(1)
    .reduce((acc, arg) => {
      const { name, process } = getPropertyAction(arg);
      return { ...acc, [name]: process(arg, parse) };
    }, { name: data[0], attributes: {}, body: '', children: [] });
  return buildNode(args.name, args.attributes, args.body, args.children);
};

export default parse;
