import { User } from './models/User';

const user = new User({ name: 'name', age: 20 });

user.on('change', () => {
    console.log('Change 1');
});
user.on('change', () => {
    console.log('Change 1');
});
user.on('save', () => {
    console.log('Save triggered');
});
console.log(user);
user.trigger('change');
user.trigger('save');

// user.set({ name: 'newName', age: 99 });

// console.log('name:', user.get('name'));
// console.log('age:', user.get('age'));
