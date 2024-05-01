import axios, { AxiosResponse } from 'axios';

interface UserProps {
    name?: string;
    age?: number;
    id?: number;
}

export class User {
    baseUrl: 'http://localhost:3000/';
    constructor(private data: UserProps) {}
    get(propName: string): number | string {
        return this.data[propName];
    }
    set(update: UserProps): void {
        // Object.assign(oldObj, newObj);
        Object.assign(this.data, update);
    }

    fetch(): void {
        axios
            .get(`http://localhost:3000/users/${this.get('id')}`)
            .then((response: AxiosResponse): void => {
                this.set(response.data);
            });
    }
    save(): void {
        if (this.get('id')) {
            axios.put(`http://localhost:3000/users/${this.get('id')}`, this.data);
        } else {
            axios.post('http://localhost:3000/users', this.data);
        }
    }
}
