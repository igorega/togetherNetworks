const style = getComputedStyle(document.body);

export const XS = style.getPropertyValue('--XS');
export const S = style.getPropertyValue('--S');
export const M = style.getPropertyValue('--M');
export const L = style.getPropertyValue('--L');
export const XL = style.getPropertyValue('--XL');
export const XXL = style.getPropertyValue('--XXL');

export const MIN_WIDTH_XS = window.matchMedia(`(min-width: ${XS}px)`);
export const MIN_WIDTH_S = window.matchMedia(`(min-width: ${S}px)`);
export const MIN_WIDTH_M = window.matchMedia(`(min-width: ${M}px)`);
export const MIN_WIDTH_L = window.matchMedia(`(min-width: ${L}px)`);
export const MIN_WIDTH_XL = window.matchMedia(`(min-width: ${XL}px)`);
export const MIN_WIDTH_XXL = window.matchMedia(`(min-width: ${XXL}px)`);
