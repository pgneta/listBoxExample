export interface Item {
    name: string;
    value: string;
}

export interface ListBoxProps {
    initialSelectedIds: string[];
    searchFunction: (text: string, page: number) => Promise<Item[]>;
    getItemsById: (ids: string[]) => Promise<Item[]>;
    pageSize: number;
}

