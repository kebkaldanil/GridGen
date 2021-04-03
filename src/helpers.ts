type O1<T> = {
    [s: string]: O1<T> | T;
};

export function forSaveOrLoad<T1, T2>(el: O1<T1>, obj: O1<T2>, cb: (c1: { [s: string]: T1}, c2: {[s: string]: T2}, key: string) => void) {
    for (const name in el) {
        rec(el, obj, name);
    }
    function rec(c1: O1<T1>, c2: O1<T2>, key: string) {
        if (equals(Object.keys(c1[key as any]), Object.keys(c2[key as any])))
            for (const name in c1[key] as O1<T1>)
                rec(c1[key] as O1<T1>, c2[key] as O1<T2>, name);
        else
            (cb as any)(c1, c2, key);
    }
}

export function equals(a: unknown[], b: unknown[]) {
    return a.length === b.length && a.every((v, i) => v === b[i]);
}

export class Grid {
    width: number;
    height: number;
    private array: any[];
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.array = Array.from({ length: width * height });
    }

    get(x: number, y: number): any;
    get(index: number): any;

    get(x: number, y?: number) {
        return this.array[y || y === 0 ? x + y * this.width : x];
    }

    set(item: any, x: number, y: number): void;
    set(item: any, index: number): void;

    set(item: any, x: number, y?: number) {
        this.array[y || y === 0 ? x + y * this.width : x] = item;
    }
}
