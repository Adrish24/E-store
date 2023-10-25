//importing states provider and routes provider
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";


import Layout from "./layout/Layout";

// importing pages
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";

// importing states
import store from "./redux/store";
import FilteredProducts from "./pages/FilteredProducts";

import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from "./context/AuthContex";

function App() {
  return (
    // handling page navigation for the pages  and proving states
    <div className="font-montserrat select-none">
      <BrowserRouter>
        <Provider store={store}>
          <AuthContextProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/:category" element={<FilteredProducts />} />
                <Route path="/:title/:id" element={<SingleProduct />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/cart" element={<Cart />} />
              </Route>
            </Routes>
          </AuthContextProvider>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
