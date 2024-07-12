import { AxiosResponse } from 'axios';

import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';
import { Model } from './Model';
import { Collection } from './Collection';

export interface UserProps {
    name?: string;
    age?: number;
    id?: number;
}

const baseUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
    static buildUser(attrs: UserProps): User {
        return new User(
            new Attributes<UserProps>(attrs),
            new Eventing(),
            new ApiSync<UserProps>(baseUrl)
        );
    }
    static buildUserCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(baseUrl, (json: UserProps) =>
            User.buildUser(json)
        );
    }

    isAdminUser(): boolean {
        return this.get('id') === 1;
    }
}
