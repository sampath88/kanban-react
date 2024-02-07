import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./App.css";
import Dashboard from "src/pages/dashboard";

function App() {
  return (
    <>
      <div className="App  bg-[#f5f5fa]">
        <DndProvider backend={HTML5Backend}>
          <Dashboard />
        </DndProvider>
      </div>
    </>
  );
}

export default App;
