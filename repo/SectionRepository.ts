import type Section from "~/types/Section";

export default class SectionRepository {
    private data(): Ref<Section[]> {
        return useCookie<Section[]>('sections', {default: () => []});
    }

    private nextId(): number {
        return useCookie<number>('section_next_id', {default: () => 1}).value++;
    }

    public list() {
        return this.data().value;
    }

    public refList(): Promise<{ data: Ref<Section[]>, refresh: () => void }> {
        return new Promise((resolve) => {
            const data    = ref<Section[]>([...this.data().value]);
            const refresh = (): Promise<void> => new Promise((resolve) => {
                data.value = [...this.data().value];
                resolve();
            });
            resolve({data, refresh});
        });
    }

    public store(section: Section): Promise<Section> {
        return new Promise((resolve) => {
            const data: Section = {
                ...section,
                id: this.nextId()
            };

            this.data().value.push(data);

            resolve(data);
        });
    }

    public update(section: Section): Promise<Section> {
        return new Promise<Section>((resolve) => {
            const index = this.data().value.findIndex(_section => section.id === _section.id);

            if (index === -1)
                throw new Error(`Section model #${section.id} not found`);

            this.data().value[index] = section;

            resolve(section);
        });
    }

    public destroy(section: Section): Promise<void> {
        return new Promise<void>((resolve) => {
            const index = this.data().value.findIndex(_section => section.id === _section.id);

            if (index === -1)
                throw new Error(`Section model #${section.id} not found`);

            this.data().value = this.data().value.filter(_section => section.id !== _section.id);

            resolve();
        });
    }
}