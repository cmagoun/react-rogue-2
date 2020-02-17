import anime from 'animejs';

export const slide = (mover, from, to, duration) => {
    const draw = {...from};
    
    anime({
        targets: draw,
        x: to.x,
        y: to.y,
        easing: 'easeInOutQuad',
        duration: duration || 250,
        update: () => mover.edit("sprite", {draw}),
        complete: () => mover.edit("sprite", {draw:{...to}})
    });
}