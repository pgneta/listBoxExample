import React from 'react';
// import {ExampleMultiSelectListBoxDynamicSelector } from './components/multiSelectionList/ExampleMultiSelectListBoxDynamicSelector';
import './App.css';
import {mockGetItemsById, mockSearchItems} from "./mock/mockUtils";
import {PAGE_SIZE} from "./consts";
import {ListHeader} from "./components/ListHeader";
import {
    ExampleMultiSelectListBoxDynamicSelector
} from "./components/multiSelectionList/ExampleMultiSelectListBoxDynamicSelector";

function App() {
  return (
      <div className="App">
        <ListHeader />
        <ExampleMultiSelectListBoxDynamicSelector
            initialSelectedIds={['0','29','8','24']}
            searchFunction={mockSearchItems}
            getItemsById={mockGetItemsById}
            pageSize={PAGE_SIZE}
        />
      </div>
  );
}

export default App;
