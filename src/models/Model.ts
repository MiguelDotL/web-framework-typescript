import { AxiosPromise, AxiosResponse } from 'axios';

// Reusable Exports
export type Callback = () => void;

export interface HasId {
    id?: number;
}

// Interfaces used in Model
interface ModelAttributes<T> {
    get<K extends keyof T>(key: K): T[K];
    set(value: T): void;
    getAll(): T;
}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Events {
    on(eventName: string, callback: Callback): void;
    trigger(eventName: string): void;
}

// Model Class Definition
export class Model<T extends HasId> {
    constructor(
        private attributes: ModelAttributes<T>,
        private events: Events,
        private sync: Sync<T>
    ) {}

    // get on() { return this.events.on; }
    // get trigger() { return this.events.trigger; }
    // get get() { return this.attributes.get; }

    on = this.events.on;
    trigger = this.events.trigger;
    get = this.attributes.get;

    set(update: T): void {
        this.attributes.set(update);
        this.events.trigger('change');
    }

    fetch(): void {
        const id = this.get('id');
        if (typeof id !== 'number') {
            throw new Error('Cannot User fetch without an id');
        }

        this.sync.fetch(id).then((response: AxiosResponse): void => {
            this.set(response.data);
        });
    }

    save(): void {
        this.sync
            .save(this.attributes.getAll())
            .then((response: AxiosResponse): void => {
                this.trigger('save');
            })
            .catch(() => {
                this.trigger('error');
            });
    }
}
