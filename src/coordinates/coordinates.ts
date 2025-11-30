export class Coordinates {
    public static getNormalizedDeviceCoordinates(event: PointerEvent, element: HTMLElement): [number, number] {
        const rect = element.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        return [x, y];
    }
}