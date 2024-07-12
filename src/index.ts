import { User } from './models/User';
import { UserForm } from './views/UserForm';

const user = User.buildUser({ name: 'John', age: 36, id: 369 });

const userForm = new UserForm(document.getElementById('root') as Element, user);

userForm.render();
