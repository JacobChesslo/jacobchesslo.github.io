interface IWidthHeight {width: number, height: number}

export function getWindowSize (canvas: HTMLCanvasElement): IWidthHeight {
    return {
        width: canvas.clientWidth || window.innerWidth,
        height: canvas.clientHeight || window.innerHeight,
    };
}

export function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
