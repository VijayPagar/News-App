
import './App.css';
import NavBar from './Components/NavBar';
import News from './Components/News';
//import NewsItem from './Components/NewsItem';

function App() {
  return (
    <>
    
    <NavBar />
    <News pageSize={6} country="in" category="health"/>
    
    </>
    

    
  );
}

export default App;
