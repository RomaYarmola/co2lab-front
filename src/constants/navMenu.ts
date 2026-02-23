export type NavSubmenuItem = {
    title: string;
    slug: string;
};

export type NavMenuItem = {
    title: string;
    slug?: string;
    submenu?: NavSubmenuItem[];
};

export const navMenuList: NavMenuItem[] = [
    { title: "Home", slug: "/" },
    { title: "Supply", slug: "/supply" },
    {
        title: "Solutions",
        submenu: [
            {
                title: "Engineering Solutions",
                slug: "/solutions/engineering-solutions",
            },
            {
                title: "Equipment and systems",
                slug: "/solutions/equipment-and-systems",
            },
            {
                title: "Industries we serve",
                slug: "/solutions/industries-we-serve",
            },
        ],
    },
    { title: "About", slug: "/about" },
    { title: "Contacts", slug: "/contacts" },
];

export function getActiveIndex(pathname: string): number {
    if (pathname === "/") return 0;
    if (pathname === "/supply") return 1;
    if (pathname.startsWith("/solutions")) return 2;
    if (pathname === "/about") return 3;
    if (pathname === "/contacts") return 4;
    return 0;
}
