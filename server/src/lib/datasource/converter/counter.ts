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

  constructor({ collection, log = false }: { collection: string; log?: boolean }) {
    this.collection = collection;
    this.read = new Counter("read");
    this.write = new Counter("write");
    this.log = log;
  }

  onRead() {
    this.read.inc();
    if (this.log) console.log(`read ${this.collection} through converter : ${this.read.count}`);
  }

  onWrite() {
    this.write.inc();
    if (this.log) console.log(`write ${this.collection} through converter : ${this.write.count}`);
  }
}
