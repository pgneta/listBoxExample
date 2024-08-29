// App.tsx
import React from 'react';
import {ExampleMultiSelectListBoxDynamicSelector } from './components/multiSelectionList/ExampleMultiSelectListBoxDynamicSelector';
import './App.css';
import {mockGetItemsById, mockSearchItems} from "./mock/mockUtils";
import {PAGE_SIZE} from "./consts";

function App() {
  return (
      <div className="App">
        <h1>Multi Select ListBox - Example</h1>
        <ExampleMultiSelectListBoxDynamicSelector
            initialSelectedIds={['1','8','24']}
            searchFunction={mockSearchItems}
            getItemsById={mockGetItemsById}
            pageSize={PAGE_SIZE}
        />
      </div>
  );
}

export default App;
