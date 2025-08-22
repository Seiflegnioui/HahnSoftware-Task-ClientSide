
export const Sources = {
    Instagram: 1,
    Facebook: 2,
    Freind: 3,
    X: 4,
    Other: 5
} as const;

export type Sources = typeof Sources[keyof typeof Sources];
