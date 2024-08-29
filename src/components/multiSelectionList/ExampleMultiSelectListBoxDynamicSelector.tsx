import React, {useState, useEffect, useRef} from 'react';
import {Item, ListBoxProps} from "../types";
import {ButtonsContainer, Container, List, ListItem, SearchInput, ShowButton} from "../styled";


export const ExampleMultiSelectListBoxDynamicSelector: React.FC<ListBoxProps> = ({
                                                               initialSelectedIds,
                                                               searchFunction,
                                                               getItemsById,
                                                               pageSize
                                                           }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [loadingCount, setLoadingCount] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [userSelectedItems, setUserSelectedItems] = useState<string[]>([]);
    const [preSelectedItems, setPreSelectedItems] = useState<Item[]>([]);
    const latestSearchRequestRef = useRef<number>(0);
    const [newData, setNewData] = useState<boolean>(true);


    const updateUserSelectedItems = (items: Item[]) => {
       items.map((item) => setUserSelectedItems(prevSelected =>  prevSelected.includes(item.value)
           ? prevSelected : [...prevSelected, item.value]));
    };

    const toggleSelection = (value: string) => {
        setUserSelectedItems((prevSelected) => {
            const isSelected = prevSelected.includes(value);
            const updatedSelectedItems = isSelected
                ? prevSelected.filter((item) => item !== value)
                : [...prevSelected, value];

            // Check if the item being unselected is a pre-selected item
            if (isSelected && preSelectedItems.some(item => item.value === value)) {
                // Remove the item from preSelectedItems
                const updatedPreSelectedItems = preSelectedItems.filter(item => item.value !== value);
                setPreSelectedItems(updatedPreSelectedItems);
            }

            return updatedSelectedItems;
        });
    }




    useEffect(() => {
        const fetchInitialSelectedItems = async () => {
            setLoadingCount(prevCount => prevCount + 1);
            const selectedItems = await getItemsById(initialSelectedIds);
            setItems(selectedItems);
            updateUserSelectedItems(selectedItems);
            setPreSelectedItems(selectedItems);
            setLoadingCount(prevCount => prevCount - 1);
        };

        fetchInitialSelectedItems();
    }, []);

    useEffect(() => {
        const fetchItems = async () => {
            const requestId = ++latestSearchRequestRef.current; // solving the Search Issue where old search completed after new one
            setLoadingCount(prevCount => prevCount + 1);
            const fetchedItems = await searchFunction(searchTerm, page);
            // if this is an irrelevant search
            if (requestId !== latestSearchRequestRef.current) {
                setLoadingCount(prevCount => prevCount - 1);
                return;
            }
            if (fetchedItems.length === 0) {
                setNewData(false);
            } else {
                setNewData(true);
            }

            setItems((prevItems) => {
                const newItems = [...preSelectedItems, ...prevItems, ...fetchedItems];
                const uniqueItems = Array.from(
                    new Set(newItems.map((item) => item.value))
                ).map((value) => newItems.find((item) => item.value === value)!);
                return uniqueItems;
            });
            setLoadingCount(prevCount => prevCount - 1);
        };

        fetchItems();
    }, [searchTerm, page, searchFunction]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(0);
        setItems([]);
    };

    const handleShowMore = () => {
        if ( items.length <=preSelectedItems.length) {
            return;
        }
        if (!newData) {
            return;
        }
        // setItems((prevItems) => [...prevItems, ...preSelectedItems]);
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

     const disableShowMore = !newData || (items.length < (pageSize ))

    return (
        <Container>
            <SearchInput type="text" placeholder="Search..." onChange={handleSearchChange}/>
            <List>
                {items.map((item) => (
                    <ListItem key={item.value}
                              className={userSelectedItems.includes(item.value) ? 'selected' : ''}
                              onClick={() => toggleSelection(item.value)}>{item.name}</ListItem>
                ))}
            </List>
            {(loadingCount > 0)  && <Loading/>}
            {(loadingCount === 0 ) && <TotalItems/>}
            <ButtonsContainer>
                <ShowButton onClick={handleShowMore} disabled={disableShowMore}>Show More</ShowButton>
                <ShowButton onClick={handleShowLess} disabled={page === 0 }>Show Less</ShowButton>
            </ButtonsContainer>
        </Container>
    );

};

