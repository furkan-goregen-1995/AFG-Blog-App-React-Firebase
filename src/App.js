import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Blog from './pages/blog/Blog';
import Create from './pages/create/Create';
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import Navbar from './components/Navbar';
import Edit from './pages/edit/Edit';
import ThemeSelector from './components/ThemeSelector';
import { useTheme } from './hooks/useTheme';


function App() {
  const {mode}=useTheme();
  console.log(mode);
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar/>
        <ThemeSelector/>
        <Switch>
          <Route exact path='/AFG-Blog-App-React-Firebase'>
            <Home/>
          </Route>
          <Route path='/AFG-Blog-App-React-Firebase/create'>
            <Create/>
          </Route>
          <Route path='/AFG-Blog-App-React-Firebase/edit/:id'>
            <Edit/>
          </Route>
          <Route path='/AFG-Blog-App-React-Firebase/search'>
            <Search/>
          </Route>
          <Route path='/AFG-Blog-App-React-Firebase/blog/:id'>
            <Blog/>
          </Route>
        </Switch>
      </BrowserRouter>  
    </div>
  );
}

export default App;
