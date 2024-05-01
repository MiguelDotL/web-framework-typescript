import { User } from './models/User';

const user = new User({ name: 'NEW', age: 0 });

user.save();
