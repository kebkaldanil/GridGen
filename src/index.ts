import { forSaveOrLoad, Grid, Random } from './helpers';
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
settingsE.slideUp(0);
$("#settings_show").on("click", settingsE.slideDown.bind(settingsE));
$("#settings_hide").on("click", () => {
    settingsE.slideUp();
    forSaveOrLoad<JQuery, string | number>(settingsS, settings, (el, obj, key) => {
        let val = el[key].val() as string | number;
        if (Number.isInteger(val))
            val = + val;
        obj[key] = val;
    });
    localStorage.setItem("settings", JSON.stringify(settings));
    init();
    generate();
});
const ctx = output_image[0].getContext("2d");
let random: Random;
let grid: Grid;

const settings = Object.assign({
    seed: "",
    grid: {
        width: 5,
        height: 5
    },
    image: {
        width: 300,
        height: 300
    },
    size1: 1,
    size2: 1,
    size4: 1
}, JSON.parse(localStorage.getItem("settings") || "{}") as {});

$("#images_zone")
    .on("dragenter dragover dragleave drop", e => {
        e.preventDefault();
        e.stopPropagation();
    }).on("drop", (ev) => {
        const nimages = Array.from(ev.originalEvent.dataTransfer.files)
            .filter(b => b.type.startsWith("image"))
            .map(img => $<HTMLImageElement>(`<img class="w-100" src="${URL.createObjectURL(img)}" />`)[0]);
        images_container.append(nimages);
        images.push(...nimages);
        Promise.all(nimages.map(v => new Promise(resolve => $(v).on("load", resolve)))).then(generate);
    });
init();

function placeImage(cis: CanvasImageSource, x: number, y: number, w: number, h: number) {
    const pw = settings.image.width / grid.width;
    const ph = settings.image.height / grid.height
    ctx.drawImage(cis, x * pw, y * ph, pw * w, ph * h);
}

function generate() {
    ctx.clearRect(0, 0, settings.image.width, settings.image.height);
    grid.clearSquere(0, 0, grid.width, grid.height);
    const sizes = [{
        size: 1,
        chance: settings.size1
    }, {
        size: 2,
        chance: settings.size2
    }, {
        size: 4,
        chance: settings.size4
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
            const {x, y} = grid.getXY(i);
            placeImage(random.from(images), x, y, 1, 1);
        }
}

function init() {
    output_image.attr({
        width: settings.image.width,
        height: settings.image.height
    });

    forSaveOrLoad<JQuery, string | number>(settingsS, settings, (el, obj, key) => el[key].val(obj[key]));

    grid = new Grid(settings.grid.width, settings.grid.height);
    random = new Random(settings.seed === "" ? null : settings.seed);
}
