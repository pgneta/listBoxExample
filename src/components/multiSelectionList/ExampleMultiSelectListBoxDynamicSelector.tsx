import React, {useState, useEffect} from 'react';
import {Item, ListBoxProps} from "../types";
import {ButtonsContainer, Container, List, ListItem, SearchInput, ShowButton} from "./styled";


export const ExampleMultiSelectListBoxDynamicSelector: React.FC<ListBoxProps> = ({
                                                               initialSelectedIds,
                                                               searchFunction,
                                                               getItemsById,
                                                               pageSize
                                                           }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const updateSelectedItems = (items: Item[]) => {
       items.map((item) => setSelectedItems(prevSelected =>  prevSelected.includes(item.value)
           ? prevSelected : [...prevSelected, item.value]));
    };

    const toggleSelection = (value: string) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((item) => item !== value)
                : [...prevSelected, value]
        );
    };
    useEffect(() => {
        const fetchInitialSelectedItems = async () => {
            setLoading(true);
            const selectedItems = await getItemsById(initialSelectedIds);
            setItems(selectedItems);
            updateSelectedItems(selectedItems);
            setLoading(false);
        };

        fetchInitialSelectedItems();
    // }, [initialSelectedIds, getItemsById]);
    }, []);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            const fetchedItems = await searchFunction(searchTerm, page);
            setItems((prevItems) => {
                const newItems = [...prevItems, ...fetchedItems];
                const uniqueItems = Array.from(
                    new Set(newItems.map((item) => item.value))
                ).map((value) => newItems.find((item) => item.value === value)!);
                return uniqueItems;
            });
            setLoading(false);
        };

        fetchItems();
    }, [searchTerm, page, searchFunction]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(0);
        setItems([]);
    };

    const handleShowMore = () => {
        setPage((prevPage) => prevPage + 1);
    };
    const handleShowLess = () => {
        setItems((prevItems) => (prevItems.length > pageSize ? prevItems.slice(0, prevItems.length - pageSize) : prevItems));
        setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
    };
    const TotalItems: React.FC = () => {
        return <div>Total items: {items.length} , page: {page}</div>;
    }
    const Loading: React.FC = () => {
        return <div>Loading...</div>;
    }
    return (
        <Container>
            <SearchInput type="text" placeholder="Search..." onChange={handleSearchChange}/>
            <List>
                {items.map((item) => (
                    <ListItem key={item.value}
                              className={selectedItems.includes(item.value) ? 'selected' : ''}
                              onClick={() => toggleSelection(item.value)}>{item.name}</ListItem>
                ))}
            </List>
            {loading && <Loading/>}
            {!loading && <TotalItems/>}
            <ButtonsContainer>
                <ShowButton onClick={handleShowMore}>Show More</ShowButton>
                <ShowButton onClick={handleShowLess} disabled={page === 0}>Show Less</ShowButton>
            </ButtonsContainer>
        </Container>
    );


};

