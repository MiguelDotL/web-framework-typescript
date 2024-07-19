import { Collection } from '../models/Collection';
import { User, UserProps } from '../models/User';

export abstract class CollectionView<T, K> {
    constructor(public parent: Element, public collection: Collection<T, K>) {}

    abstract renderItem(model: T, itemParent: Element): void;
    render(): void {
        this.parent.innerHTML = '';

        this.collection.models.forEach((model) => {
            const itemParent = document.createElement('div');
            this.renderItem(model, itemParent);
            this.parent.appendChild(itemParent);
        });
    }
}
