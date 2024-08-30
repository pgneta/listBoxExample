import React, {useEffect, useRef, useState} from 'react';
import {Item, ListBoxProps} from "../types";
import {ButtonsContainer, Container, List, ListItem, SearchInput, ShowButton} from "../styled";

export const ExampleMultiSelectListBoxDynamicSelector2: React.FC<ListBoxProps> = ({
                                                                                      initialSelectedIds,
                                                                                      searchFunction,
                                                                                      getItemsById,
                                                                                      pageSize
                                                                                  }) => {
    const [fetchedItems, setFetchedItems] = useState<Item[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [preSelectedItems, setPreSelectedItems] = useState<Item[]>([]);
    const latestSearchRequestRef = useRef<number>(0);
    const [loadingCount, setLoadingCount] = useState<number>(0);
    const [fetchPreSelectedCompleted, setFetchPreSelectedCompleted] = useState<boolean>(false);

    useEffect(() => {
        const fetchPreSelectedItems = async () => {
            setLoadingCount(prevCount => prevCount + 1);
            try {
                const fetchedPreSelected = await getItemsById(initialSelectedIds);
                setPreSelectedItems(fetchedPreSelected);
            } catch (error) {
                console.error("Error fetching initial items:", error);
            } finally {
                setLoadingCount(prevCount => prevCount - 1);
                setFetchPreSelectedCompleted(true);
            }
        };

        fetchPreSelectedItems();
    }, [getItemsById, initialSelectedIds]);

    // Fetch items based on search term and page
    useEffect(() => {
        if (!fetchPreSelectedCompleted) return; // Ensure this fetch runs only after the initial fetch
        const fetchItems = async () => {
            const requestId = ++latestSearchRequestRef.current;
            setLoadingCount(prevCount => prevCount + 1);
            try {
                const fetchedItems = await searchFunction(searchTerm, page);

                if (requestId !== latestSearchRequestRef.current) {
                    setLoadingCount(prevCount => prevCount - 1);
                    return;
                }

                setFetchedItems((prevItems) => {
                    // Combine prevItems and fetchedItems
                    const combinedItems = [...prevItems, ...fetchedItems];

                    // Filter out preSelectedItems
                    const filteredItems = combinedItems.filter(
                        (i) => !preSelectedItems.some((item) => item.value === i.value)
                    );

                    // Deduplicate filteredItems
                    const deduplicatedItems = filteredItems.reduce((acc, item) => {
                        if (!acc.find(existingItem => existingItem.value === item.value)) {
                            acc.push(item);
                        }
                        return acc;
                    }, [] as Item[]);

                    // Sort deduplicatedItems by name
                    return deduplicatedItems.sort((a, b) => {
                        const valueA = parseInt(a.value, 10);
                        const valueB = parseInt(b.value, 10);
                        return valueA - valueB;
                    });

                });

            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setLoadingCount(prevCount => prevCount - 1);
            }
        };

        fetchItems();
    }, [searchTerm, page, fetchPreSelectedCompleted, preSelectedItems, searchFunction]);



    // Toggle the selected state of the item
    const toggleItemSelectionState = (itemValue: string) => {
        setFetchedItems((prevItems) =>
            prevItems.map(item =>
                item.value === itemValue ? {...item, selected: !item.selected} : item
            )
        );

        setPreSelectedItems((prevItems) =>
            prevItems.map(item =>
                item.value === itemValue ? {...item, selected: false} : item
            )
        );
    };

    const togglePreSelectedItemState = (itemValue: string) => {
        // we remove this item from preSelected list:
        setPreSelectedItems((prevItems) => {
            const item = prevItems.find(i => i.value === itemValue);
            if (item) {
                // check if it should be kept on current search fetched items:
                setFetchedItems((prevItems) =>
                    prevItems.map(item =>
                        item.value === itemValue ? {...item, selected: false} : item
                    )
                );
                // Remove item from pre-selected list if it is no longer selected
                return prevItems.filter(i => i.value !== itemValue);
            }
            return prevItems;
        });

    };
    //
    // useEffect(() => {
    //     const fetchInitialSelectedItems = async () => {
    //         setLoadingCount(prevCount => prevCount + 1);
    //         const fetchedPreSelected = await getItemsById(initialSelectedIds);
    //         setPreSelectedItems(fetchedPreSelected);
    //         setLoadingCount(prevCount => prevCount - 1);
    //     };
    //
    //     fetchInitialSelectedItems();
    // }, []);
    //
    // useEffect(() => {
    //     const fetchItems = async () => {
    //         const requestId = ++latestSearchRequestRef.current;
    //         setLoadingCount(prevCount => prevCount + 1);
    //         if (requestId !== latestSearchRequestRef.current) {
    //             setLoadingCount(prevCount => prevCount - 1);
    //             return;
    //         }
    //         const getFetchedItems = await searchFunction(searchTerm, page);
    //
    //         setFetchedItems((prevItems) =>
    //             [...preSelectedItems, ...prevItems, ...getFetchedItems].reduce((acc, item) => {
    //                 if (!acc.find(existingItem => existingItem.value === item.value)) {
    //                     acc.push(item);
    //                 }
    //                 return acc;
    //             }, [] as Item[])
    //         );
    //         setLoadingCount(prevCount => prevCount - 1);
    //     };
    //
    //     fetchItems();
    // }, [searchTerm, page]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(0);
        setFetchedItems([]);
    };

    const handleShowMore = () => {
        // if (fetchedItems.length <= pageSize) {
        //     return;
        // }
        setPage((prevPage) => prevPage + 1);
    };

    const handleShowLess = () => {
        setFetchedItems((prevItems) => (prevItems.length > pageSize ? prevItems.slice(0, prevItems.length - pageSize) : prevItems));
        setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
    };

    const TotalItems: React.FC = () => {
        return <div>Total items: {fetchedItems.length + preSelectedItems.length}, page: {page}</div>;
    };

    const Loading: React.FC = () => {
        return <div>Loading...</div>;
    };

   // const disableShowMore = fetchedItems.length < pageSize || fetchedItems.length === 0;

    // setDisableShowMore(  fetchedItems.length < pageSize);

    return (
        <Container>
            <SearchInput type="text" placeholder="Search..." onChange={handleSearchChange}/>
            <List>
                {preSelectedItems.map((item) => (
                    <ListItem
                        key={item.value}
                        className= 'selected'
                        onClick={() => togglePreSelectedItemState(item.value)}
                    >
                        {item.name}
                    </ListItem>
                ))}
                {fetchedItems.map((item) => (
                    <ListItem
                        key={item.value}
                        className={item.selected ? 'selected' : ''}
                        onClick={() => toggleItemSelectionState(item.value)}
                    >
                        {item.name}
                    </ListItem>
                ))}
            </List>
            {loadingCount > 0 ? <Loading/> : <TotalItems/>}
            {/*{loadingCount === 0 && <TotalItems/>}*/}
            <ButtonsContainer>
                <ShowButton onClick={handleShowMore} disabled={false}>Show More</ShowButton>
                <ShowButton onClick={handleShowLess} disabled={page === 0}>Show Less</ShowButton>
            </ButtonsContainer>
        </Container>
    );
};
