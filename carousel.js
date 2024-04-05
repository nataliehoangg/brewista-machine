function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({repeat: config.repeat || -1, defaults: {ease: "none"}});
    let pixelsPerSecond = (config.speed || 1) * 100;

    gsap.set(items, {xPercent: (i, el) => {
        let w = el.offsetWidth;
        return (i === 0 ? 0 : w + (parseFloat(config.paddingRight) || 0)) + "%";
    }});

    items.forEach((item, i) => {
        let w = item.offsetWidth * gsap.getProperty(item, "scaleX");
        tl.to(item, {xPercent: "-" + (w + (parseFloat(config.paddingRight) || 0)), duration: w / pixelsPerSecond}, i * (w / pixelsPerSecond));
    });

    return tl;
}

let loop = horizontalLoop(".image", {speed: 15, repeat: Infinity, paddingRight: 25});


function setDirection(value) {
    if (loop.direction !== value) {
        gsap.to(loop, {timeScale: value, duration: 0.3, overwrite: true});
        loop.direction = value;
    }
}

// Listen for scroll events
window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        setDirection(1); // Scroll down
    } else {
        setDirection(-1); // Scroll up
    }
});