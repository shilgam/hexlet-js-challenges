// BEGIN (write your solution here)
import Node from './Node';

export default class SingleTag extends Node {
  constructor(name, attributes = {}) {
    super(name, attributes);
  }

  toString() {
    return `<${this.name}${this.getAttributesAsLine()}>`;
  }
}
// END
