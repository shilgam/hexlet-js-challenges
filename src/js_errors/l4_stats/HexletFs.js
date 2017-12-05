import path from 'path';
import Tree from 'hexlet-trees'; // eslint-disable-line

import Dir from './Dir';
import File from './File';

const getPathParts = filepath =>
  filepath.split(path.sep).filter(part => part !== '');

export default class HexletFs {
  constructor() {
    this.tree = new Tree('/', new Dir('/'));
  }

  statSync(filepath) {
    const current = this.findNode(filepath);
    return current.getMeta().getStats();
  }

  touchSync(filepath) {
    const { dir, base } = path.parse(filepath);
    return this.findNode(dir).addChild(base, new File(base));
  }

  mkdirSync(filepath) {
    const { dir, base } = path.parse(filepath);
    return this.findNode(dir).addChild(base, new Dir(base));
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}

/* DEBUG */
// const files = new HexletFs();
//
// files.mkdirSync('/etc2');
// console.log(files.statSync('/etc2').isDirectory()); // true
