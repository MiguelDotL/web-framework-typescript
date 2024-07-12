import { User } from '../models/User';

export class UserForm {
    constructor(public parent: Element, public model: User) {
        this.bindModel();
    }
    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        });
    }
    eventsMap(): { [key: string]: () => void } {
        return {
            'click:button#setAge': this.onSetAgeButtonClick
        };
    }

    onSetAgeButtonClick = (): void => {
        this.model.setRandomAge();
        console.log('onButtonClick fired 🔥', this.model.get('age'));
    };

    template(): string {
        return `
            <div>
                <h1> User Form</h1>
                <div> User Name: ${this.model.get('name')}</div>
                <div> User Age: ${this.model.get('age')}</div>
                <input />
                <button>Submit</button>
                <button id="setAge">Set Random Age</button>

            </div>
        `;
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');

            fragment.querySelectorAll(selector).forEach((element) => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            });
        }
    }
    render(): void {
        // Clear existing children from parent element before rendering new ones.
        this.parent.innerHTML = '';

        // Create a DocumentFragment to hold the new elements.
        const templateElement = document.createElement('template');

        // Append the DocumentFragment to the parent element and bind events to the template element
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);
        this.parent.append(templateElement.content);
    }
}
