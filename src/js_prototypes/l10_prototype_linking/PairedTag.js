import Node from './Node';

export default function PairedTag(name, attributes = {}, body = '', children = []) {
  Node.apply(this, [name, attributes]);
  this.body = body;
  this.children = children;
}

// BEGIN (write your solution here)

// END

PairedTag.prototype.toString = function toString() {
  const value = this.children.length > 0 ?
    this.children.map(child => child.toString()).join('') : this.body;
  return `<${this.name}${this.getAttributesAsLine()}>${value}</${this.name}>`;
};

/* DEBUG */
// const tag = new PairedTag('meta', { id: 'uniq-key' }, [
//   ['title', 'hello, hexlet!'],
// ]);
// console.log(`> > > > > tag: ${tag}`);
