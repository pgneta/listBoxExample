import React from 'react';
// import './App.css';
import {mockGetItemsById, mockSearchItems} from "./mock/mockUtils";
import {PAGE_SIZE} from "./consts";
import {ListHeader} from "./components/ListHeader";
import {
    ExampleMultiSelectListBoxDynamicSelector
} from "./components/ExampleMultiSelectListBoxDynamicSelector";

function App() {
    const preSelectedIds = ['0','29','8','24'];

  return (
      <div className="App">
        <ListHeader />
        <ExampleMultiSelectListBoxDynamicSelector
            initialSelectedIds={preSelectedIds}
            searchFunction={mockSearchItems}
            getItemsById={mockGetItemsById}
            pageSize={PAGE_SIZE}
        />
      </div>
  );
}

export default App;
