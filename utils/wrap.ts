export default function wrap(text: string, length: number = 50, wrap: string = '...') {
    return text.length > length ? text.slice(0, 50) + wrap : text;
}