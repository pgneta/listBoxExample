import React from 'react';
// import {ExampleMultiSelectListBoxDynamicSelector } from './components/multiSelectionList/ExampleMultiSelectListBoxDynamicSelector';
import './App.css';
import {mockGetItemsById, mockSearchItems} from "./mock/mockUtils";
import {PAGE_SIZE} from "./consts";
import {ListHeader} from "./components/ListHeader";
import {
    ExampleMultiSelectListBoxDynamicSelector2
} from "./components/multiSelectionList/ExampleMultiSelectListBoxDynamicSelector2";

function App() {
  return (
      <div className="App">
        <ListHeader />
        <ExampleMultiSelectListBoxDynamicSelector2
            initialSelectedIds={['0','29','8','24']}
            searchFunction={mockSearchItems}
            getItemsById={mockGetItemsById}
            pageSize={PAGE_SIZE}
        />
      </div>
  );
}

export default App;
