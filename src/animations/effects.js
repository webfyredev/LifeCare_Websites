export const scrollLeft = {
    initial : {opacity : 0, x : -30},
    whileInView : {opacity : 1, x : 0},
    transition : {duration:1},
    exit : {opacity : 0, x : -30}
};
export const CardscrollLeft = {
    initial : {opacity : 0, x : -30},
    whileInView : {opacity : 1, x : 0},
    transition : {duration:1},
    exit : {opacity : 0, x : -30},
    whileHover : {scale : 1.05}
};
export const scrollUp = {
    initial : {opacity : 0, y : 30},
    whileInView : {opacity : 1, y : 0},
    transition : {duration:1},
    exit : {opacity : 0, y : 30}
};
export const cardscrollRight = {
    initial : {opacity : 0, x : 30},
    whileInView : {opacity : 1, x : 0},
    transition : {duration:1},
    exit : {opacity : 0, x : 30},
    whileHover : {scale : 1.05}
};
export const scrollRight = {
    initial : {opacity : 0, x : 30},
    whileInView : {opacity : 1, x : 0},
    transition : {duration:1},
    exit : {opacity : 0, x : 30},
}
export const buttonEffects = {
    whileHover : { scale : 1.05},
    whileTap : {scale : 0.95}
}

export const pageheadEffects = {
    initial : { opacity: 0, y:-40},
    animate : {opacity : 1, y: 0},
    transition : {duration : 0.5},
    exit : {opacity : 0, y:-40}
}

export const scrolldown = {
    initial : {opacity : 0, y : -30},
    whileInView : {opacity : 1, y : 0},
    transition : {duration:1},
    exit : {opacity : 0, y : -30}
};