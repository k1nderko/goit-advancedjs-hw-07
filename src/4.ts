class Key {
  private signature: number = Math.random();
  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}
  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  door: boolean = false;
  key: Key;
  tenants: Person[] = [];
  constructor(key: Key) {
    this.key = key;
  }
  comeIn(person: Person): void {
    if (this.door === true && this.checkKey(person.getKey())) {
      this.tenants.push(person);
      console.log("Person entered the house");
    } else {
      console.log("Door is closed or the key is incorrect");
    }
  }
  abstract openDoor(key: Key): void;
  protected checkKey(personKey: Key): boolean {
    return personKey.getSignature() === this.key.getSignature();
  }
}

class MyHouse extends House {
  openDoor(key: Key): void {
    if (this.checkKey(key)) {
      this.door = true;
      console.log("Door is open now");
    } else {
      console.log("Wrong key");
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};