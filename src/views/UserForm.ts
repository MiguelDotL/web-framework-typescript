import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
    eventsMap(): { [key: string]: () => void } {
        return {
            'click:button#setAge': this.onSetAge,
            'click:button#setName': this.onSetName,
            'click:button#save': this.onSave
        };
    }

    onSetAge = (): void => {
        this.model.setRandomAge();
        console.log('onButtonClick fired 🔥', this.model.get('age'));
    };
    onSetName = (): void => {
        const input = this.parent.querySelector('input');

        if (input) {
            const name = input?.value;
            this.model.set({ name });
        }
    };

    onSave = (): void => {
        // this.onSetName();
        // this.onSetAge();
        this.model.save();
        // console.log('onButtonClick fired 🔥', this.model.attributes.data);
    };

    template(): string {
        return `
            <div>
                <input id="name" placeholder="${this.model.get('name')}" />
                <button id="setName">Change Name</button>
                <button id="setAge">Set Random Age</button>
                <button id="save">Save User</button>
            </div>
        `;
    }
}
