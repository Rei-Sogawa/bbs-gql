export class Counter {
  static _id = 0;

  id: string;
  name: string;
  count = 0;
  constructor(name: string) {
    this.id = (Counter._id++).toString();
    this.name = name;
  }
  inc() {
    this.count++;
  }
}

export class ConverterCounter {
  collection: string;
  read: Counter;
  write: Counter;
  log: boolean;

  constructor({
    collection,
    read = new Counter("read"),
    write = new Counter("write"),
    log = false,
  }: {
    collection: string;
    read?: Counter;
    write?: Counter;
    log?: boolean;
  }) {
    this.collection = collection;
    this.read = read;
    this.write = write;
    this.log = log;
  }

  onRead() {
    this.read.inc();
    if (this.log) console.log(`read ${this.collection} : ${this.read.count}`);
  }

  onWrite() {
    this.write.inc();
    if (this.log) console.log(`write ${this.collection} : ${this.write.count}`);
  }
}
