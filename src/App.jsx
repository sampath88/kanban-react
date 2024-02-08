import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./App.css";
import Dashboard from "src/pages/dashboard";
import { Provider } from "react-redux";
import store from "src/store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="App  bg-[#f5f5fa]">
          <DndProvider backend={HTML5Backend}>
            <Dashboard />
          </DndProvider>
        </div>
      </Provider>
    </>
  );
}

export default App;
