import { HasId, Model } from '../models/Model';
import { User } from '../models/User';

export interface RegionsMap {
    [key: string]: string;
}

export abstract class View<T extends Model<K>, K extends HasId> {
    regions: { [key: string]: Element } = {};

    constructor(public parent: Element, public model: User) {
        this.bindModel();
    }
    abstract template(): string;

    eventsMap(): { [key: string]: () => void } {
        return {};
    }
    regionsMap(): RegionsMap {
        return {};
    }

    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        });
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

    mapRegions(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap();

        for (let key in regionsMap) {
            const selector = regionsMap[key];
            const element = fragment.querySelector(selector);
            if (element) {
                this.regions[key] = element;
            }
        }
    }

    onRender(): void {}

    render(): void {
        // Clear existing children from parent element before rendering new ones.
        this.parent.innerHTML = '';

        // Create a DocumentFragment to hold the new elements.
        const templateElement = document.createElement('template');

        // Append the DocumentFragment to the parent element and bind events to the template element
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);

        this.mapRegions(templateElement.content);

        this.onRender();

        this.parent.append(templateElement.content);
    }
}
