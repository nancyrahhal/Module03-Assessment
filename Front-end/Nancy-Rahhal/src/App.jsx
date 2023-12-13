import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import ArticlesPage from "./Pages/ArticlesPage.jsx";

const Layout = () => {
  return (
    <>
<ArticlesPage/>     
    </>
  );
};

function App() {
  
   
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Layout />}> 
        <Route path="/" element={<ArticlesPage />} />

         
        </Route>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
