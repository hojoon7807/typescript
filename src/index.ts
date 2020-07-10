import * as CryptoJS from "crypto-js";
class Block {
    static calculateBlockHash =
        (index: number, previousHash: string, timestamp: number, data: string): string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    static validateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index == "number" &&
        typeof aBlock.hash == "string" &&
        typeof aBlock.previousHash == "string" &&
        typeof aBlock.timestamp == "number" &&
        typeof aBlock.data == "string"

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
const genesisBlock: Block = new Block(0, "2000220220", "", "hello", 123456);
let blockChain: Block[] = [genesisBlock];
const getBlockchain = (): Block[] => blockChain
const getLatestBlock = (): Block => blockChain[blockChain.length - 1];
const getNewTimestamp = (): number => Math.round(new Date().getDate() / 1000)

const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimestamp();
    const newHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
    const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    addBlock(newBlock)
    return newBlock;
}

const getHashForBlock = (aBlock: Block): string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
}

const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock)
    }
}
createNewBlock("2 block");
createNewBlock("3 block");
createNewBlock("4 block");
createNewBlock("5 block");
createNewBlock("6 block");
createNewBlock("7 block");
createNewBlock("8 block");
createNewBlock("9 block");
createNewBlock("10 block");

console.log(blockChain)


export { };