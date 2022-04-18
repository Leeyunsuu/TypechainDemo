'use strict';
import * as CrpytoJS from 'crypto-js';

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }

  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CrpytoJS.SHA256(index + previousHash + timestamp + data).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === 'number' &&
    typeof aBlock.hash === 'string' &&
    typeof aBlock.previousHash === 'string' &&
    typeof aBlock.timestamp === 'number' &&
    typeof aBlock.data === 'string';
}

const genesisBlock: Block = new Block(0, '20202020202', '', 'Hello', 123456);

const blockchain: Block[] = [genesisBlock];

// console.log(blockchain);

const getBlockchain = (): Block[] => blockchain;

const getlatestBlock = (): Block => blockchain[blockchain.length - 1]; //array = length - 1

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const prevoisBlock: Block = getlatestBlock();
  const newIndex: number = prevoisBlock.index + 1;
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    prevoisBlock.hash,
    newTimestamp,
    data
  );

  const newBlock: Block = new Block(
    newIndex,
    newHash,
    prevoisBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock);
  return newBlock;
};

const getHashforBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data
  );

const isBlockVaild = (candidateBlock: Block, previousBlock: Block): Boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  // console.log(isBlockVaild(candidateBlock, getlatestBlock()));
  if (isBlockVaild(candidateBlock, getlatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock('1st Block');
createNewBlock('2nd Block');
createNewBlock('3rd Block');

console.log(blockchain);

export {};
