import React, { useState } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from "react-redux";
import store, { persistor } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import AppContext from "./src/context/AppContext";

const App = () => {
  const [places,setPlaces] = useState([]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContext.Provider value={{ places,setPlaces }}>
          <AppNavigator />
        </AppContext.Provider>
      </PersistGate>
    </Provider>
  )
}

export default App;