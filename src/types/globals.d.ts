declare module 'gsap/SplitText' {
    export class SplitText {
        constructor(target: string | Element | Element[] | any, vars?: any);
        words: Element[];
        chars: Element[];
        lines: Element[];
        revert(): void;
    }
}

declare module 'gsap/ScrollSmoother' {
    export class ScrollSmoother {
        static create(vars: any): ScrollSmoother;
        static refresh(force?: boolean): void;
        kill(): void;
        paused(value?: boolean): boolean;
        scrollTop(value?: number): number;
        scrollTo(target: any, smooth?: boolean, position?: string | number): void;
    }
}
