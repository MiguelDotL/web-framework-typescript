// import { User } from './models/User';
// import { UserEdit } from './views/UserEdit';
// import { UserShow } from './views/UserShow';

import { Collection } from './models/Collection';
import { User, UserProps } from './models/User';
import { UserList } from './views/UserList';

// const user = User.buildUser({ name: 'NAME', age: 0 });
// const root = document.getElementById('root');

// if (root) {
//     const userEdit = new UserEdit(root, user);

//     userEdit.render();
// } else throw new Error('Root element not found');

const usersURL = 'http://localhost:3000/users/';
const users = new Collection('http://localhost:3000/users/', (json: UserProps) => {
    return User.buildUser(json);
});
users.on('change', () => {
    const root = document.getElementById('root');

    root && new UserList(root, users).render();
});

users.fetch();
