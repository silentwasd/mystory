import type Action from "~/types/Action";

export default interface Section {
    id: number,
    title: string,
    description: string,
    actions: Action[]
}