import { forSaveOrLoad, Grid, Random } from './helpers';
const imgElementRegexp = /<img.+src="(.+?)".*>/;
const images = [] as HTMLImageElement[];
const output_image = $<HTMLCanvasElement>("#output_image");
const images_container = $("#images_container");
const settingsE = $("#settings");
const settingsS = (() => {
    const grid = settingsE.find(".grid");
    const image = settingsE.find(".image");
    return {
        seed: $("#seed"),
        grid: {
            width: grid.find(".width"),
            height: grid.find(".height")
        },
        image: {
            width: image.find(".width"),
            height: image.find(".height")
        },
        size1: $("#size1"),
        size2: $("#size2"),
        size4: $("#size4")
    };
})();
const ctx = output_image[0].getContext("2d");
const settings = Object.assign({
    seed: "",
    grid: {
        width: 16,
        height: 9
    },
    image: {
        width: 1920,
        height: 1080
    },
    size1: 1,
    size2: 1,
    size4: 1
}, JSON.parse(localStorage.getItem("settings") || "{}") as {});

$("#images_zone")
    .on("dragenter dragover dragleave drop", e => {
        e.preventDefault();
        e.stopPropagation();
    }).on("drop", async (ev) => {
        const uris = (await Promise.all(Array.from(ev.originalEvent.dataTransfer.items)
            .filter(i => i.type === "text/uri-list" || i.type === "text/html")
            .map(i => {
                const type = i.type;
                return new Promise<string>(r => i.getAsString(str => {
                if (type === "text/html") {
                    const rr = imgElementRegexp.exec(str);
                    r(typeof rr === "object" ? rr[1] : null);
                } else
                    r(str);
            }))
        }))).filter(v => v);
        const nimages = uris.map(uri => $<HTMLImageElement>(`<img class="w-100 src_img" src="${uri}" />`)[0]);
        Promise.all(nimages.map(v => new Promise<void>(resolve => $(v).on("load", () => {
            const ni = nimages.filter(v => {
                const isLoaded = v.complete && v.naturalHeight !== 0;
                if (!isLoaded)
                    v.remove();
                return isLoaded;
            });
            $(ni).appendTo(images_container);
            images.push(...ni);
            resolve();
        })))).then(generate);
    });

output_image.attr({
    width: settings.image.width,
    height: settings.image.height
});

forSaveOrLoad<JQuery, string | number>(settingsS, settings, (el, obj, key) => el[key].val(obj[key]));

forSaveOrLoad(settingsS, settings, (el, obj, key) => el[key].on("input", () => {
    forSaveOrLoad(settingsS, settings, (el, obj, key) => obj[key] = el[key].val() as string);
    localStorage.setItem("settings", JSON.stringify(settings));
    output_image.attr({
        width: settings.image.width,
        height: settings.image.height
    });
    generate();
}));

function placeImage(cis: CanvasImageSource, x: number, y: number, w: number, h: number) {
    const pw = settings.image.width / settings.grid.width;
    const ph = settings.image.height / settings.grid.height
    ctx.drawImage(cis, x * pw, y * ph, pw * w, ph * h);
}

function generate() {
    let random = new Random(settings.seed === "" ? null : settings.seed);
    ctx.clearRect(0, 0, settings.image.width, settings.image.height);
    const grid = new Grid(settings.grid.width, settings.grid.height);
    const sizes = [{
        size: 1,
        chance: +settings.size1
    }, {
        size: 2,
        chance: +settings.size2
    }, {
        size: 4,
        chance: +settings.size4
    }];
    //const chanceSum = sizes.reduce((p, c) => p + c.chance, 0);
    //sizes.forEach(v => v.chance /= chanceSum);
    let attempts = grid.length;

    while (attempts--) {
        const size = random.elWithChance(sizes).size;
        let attempts = grid.length;
        while (attempts--) {
            const { x, y } = grid.getXY(random.nextInt(grid.length));
            if (grid.checkSquere(x, y, size)) {
                grid.placeSquare(x, y, size)
                placeImage(random.from(images), x, y, size, size);
                break;
            }
        }
    }
    for (let i = 0; i < grid.length; ++i)
        if (!grid.get(i)) {
            grid.set(true, i);
            const { x, y } = grid.getXY(i);
            placeImage(random.from(images), x, y, 1, 1);
        }
}
