import { useEffect, useState } from 'react';

import './App.css';
import CardList from './components/card-list/cardlist.component';
import SearchBox from './components/search-box/searchbox.component';

const App = () => {

  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  console.log(searchField)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []); 

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }


  return (
    <div className="App">
      <h1 className='app-title'> Monsters </h1>
      <SearchBox
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder='search monsters' />


      {<CardList monsters={filteredMonsters} />}
    </div>
  )

}

// class App extends Component {

//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     };

//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) => this.setState(() => {
//         return { monsters: users }
//       }
//       ))
//   }


//   onSearchChange = (event) => {
//     console.log(event.target.value);
//     const searchField = event.target.value.toLocaleLowerCase();


//     this.setState(() => {
//       return { searchField };
//     })
//   }

//   render() {

//     const { monsters, searchField } = this.state;

//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">

//         <h1 className='apptitle'>Monsters</h1>

//         <SearchBox onChangeHandler={onSearchChange} placeholder='Search monsters' className="search-box" />

//        
//       </div>
//     );
//   }

// }

export default App;
