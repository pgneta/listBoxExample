import {PAGE_SIZE} from "../consts";

export const longItemsNameValue = Array.from(
    { length: 700 },
    (_, i) => ({ name: `Item Name ${i}`, value: `${i}` })
);

export const mockSearchItems = async (text: string, page: number = 0) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return longItemsNameValue
        .filter((value1) => value1.name.includes(text))
        .slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
};

export const mockGetItemsById = async (ids: string[]) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return ids.map((id) => ({ name: `Item Name ${id}`, value: id }));
};

