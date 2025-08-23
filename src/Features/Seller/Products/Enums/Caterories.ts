export const Categories = {
       Electronics : 1,
        Fashion : 2,
        Home : 3,
        Beauty : 4,
        Sports : 5,
        Books : 6,
        Toys : 7,
        Automotive : 8,
        Food : 9,
        Health : 10
} as const;

export type Categories = typeof Categories[keyof typeof Categories];
