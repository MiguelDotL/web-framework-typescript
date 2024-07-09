import { UserProps } from './User';

export class Attributes<T extends object> {
    constructor(private data: T) {}
    get = <K extends keyof T>(key: K): T[K] => {
        return this.data[key];
    };
    set(update: T): void {
        // Object.assign(oldObj, newObj);
        Object.assign(this.data, update);
    }

    getAll(): T {
        return this.data;
    }
}

const attrs = new Attributes<UserProps>({
    name: 'John',
    age: 30,
    id: 1
});

const name = attrs.get('name');
const age = attrs.get('age');
const id = attrs.get('id');
