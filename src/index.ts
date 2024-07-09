import { User } from './models/User';

// const user = new User({ name: 'NEW', age: 0 });
const user = User.buildUser({ id: 1 });

console.log(user);
user.fetch();
