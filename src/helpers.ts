import Rand, { PRNG } from 'rand-seed';

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
    private array: boolean[];
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.array = new Array(width * height );
    }

    getXY(index: number) {
        return {
            x: index % this.width,
            y: Math.floor(index / this.width)
        };
    }

    getIndex(x: number, y: number) {
        return x + y * this.width;
    }

    get(x: number, y: number): boolean;
    get(index: number): boolean;

    get(x: number, y?: number) {
        return this.array[y || y === 0 ? x + y * this.width : x];
    }

    set(item: boolean, x: number, y: number): void;
    set(item: boolean, index: number): void;

    set(item: boolean, x: number, y?: number) {
        this.array[y || y === 0 ? x + y * this.width : x] = item;
    }

    clearSquere(x: number, y: number, w = 1, h = w) {
        const xw = x + w;
        const yh = y + h;
        if (xw > this.width || yh > this.height)
            throw new Error("Out of bound");
        while(x < xw) {
            let yi = y;
            while (yi < yh) {
                this.set(false, x, yi++);
            }
            ++x;
        }
    }

    placeSquare(x: number, y: number, w = 1, h = w) {
        const xw = x + w;
        const yh = y + h;
        if (xw > this.width || yh > this.height)
            throw new Error("Out of bound");
        while(x < xw) {
            let yi = y;
            while (yi < yh) {
                this.set(true, x, yi++);
            }
            ++x;
        }
    }

    checkSquere(x: number, y: number, w = 1, h = w) {
        const xw = x + w;
        const yh = y + h;
        if (xw > this.width || yh > this.height)
            return false;
        while(x < xw) {
            let yi = y;
            while (yi < yh) {
                if (this.get(x, yi))
                    return false;
                ++yi;
            }
            ++x;
        }
        return true;
    }

    get length() {
        return this.array.length;
    }
}

export class Random {
    private random: Rand;
    constructor(seed: string) {
        this.random = new Rand(seed);
    }

    next(to?: number): number;
    next(from: number, to: number): number;

    next(from?: number, to?: number) {
        if (!(to || to === 0)) {
            if (from || from === 0)
                to = from;
            else
                to = 1;
            from = 0;
        }
        if (from === to)
            return from;
        if (from > to) {
            const tmp = from;
            from = to;
            to = tmp;
        }
        return this.random.next() * (to - from) + from;
    }

    nextInt(to?: number): number;
    nextInt(from: number, to: number): number;

    nextInt(from?: number, to?: number) {
        return Math.floor(this.next(from, to));
    }

    from<T>(arr: T[]) {
        return arr[this.nextInt(arr.length)];
    }

    elWithChance<T extends {chance: number}>(arr: T[]) {
        const chances = arr.map(v => v.chance);
        for (let i = 1; i < chances.length; ++i) {
            chances[i] += chances[i - 1];
        }
        const rand = this.next(chances[chances.length - 1]);
        return arr[chances.findIndex(v => v > rand)];
    }
}
