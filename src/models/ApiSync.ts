import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { HasId } from './Model';

export class ApiSync<T extends HasId> {
    constructor(public baseUrl: string) {}
    fetch(id: number): AxiosPromise {
        return axios.get(`${this.baseUrl}/${id}`);
    }
    // .then((response: AxiosResponse): void => {
    //         this.set(response.data);
    //     });
    save(data: T): AxiosPromise {
        const { id } = data;
        if (id) {
            return axios.put(`${this.baseUrl}/${id}`, data);
        } else {
            return axios.post(this.baseUrl, data);
        }
    }
}
