import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./Routes/AllRoutes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AuthContextProvider } from "./ContextApi/AuthContext";
import { Box } from "@chakra-ui/react";
import OrderDetails from './Pages/OrderDetails/OrderDetails';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <Box minH="100vh" bg="gray.50">
              <AllRoutes />
            </Box>
          </BrowserRouter>
        </AuthContextProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default App; 