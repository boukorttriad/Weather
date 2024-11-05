
import './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss'
import SearchBar from './Component/SearchBar/SearchBar';
import Wallpaper from './Component/SearchBar/Wallpaper';
import Weather from './Component/weather/Weather';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Footer from './Component/Footer/Footer';

function App() {
  return (<>
    
    <div className="app">
      <Provider  store={store}>
        <Wallpaper />
        <Container>
        <SearchBar/>
        <Weather/>
       
        </Container>
        <Footer/>
      </Provider>
     
    </div>
  </>
  
  );
}

export default App;
