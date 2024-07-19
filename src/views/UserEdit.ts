import { User, UserProps } from '../models/User';
import { UserShow } from './UserShow';
import { UserForm } from './UserForm';
import { RegionsMap, View } from './View';

export class UserEdit extends View<User, UserProps> {
    // constructor(parent: Element, model: User) {
    //     super(parent, model);
    // }
    regionsMap(): RegionsMap {
        return {
            userShow: '.user-show',
            userForm: '.user-form'
        };
    }

    onRender(): void {
        const userShowElement = this.regions.userShow;
        const userFormElement = this.regions.userForm;
        new UserShow(userShowElement, this.model).render();
        new UserForm(userFormElement, this.model).render();
    }

    template(): string {
        return `
            <div>
                <div class="user-show"></div>
                <div class="user-form"></div>
            </div>`;
    }
}
