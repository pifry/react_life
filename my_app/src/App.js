import React from 'react';
//import logo from './logo.svg';
import './App.css';


class Tile extends React.Component {

  handleClick = () => {
    this.props.onClick(this.props.col, this.props.row)
  }

  render() {
    return <td onClick={this.handleClick} className={`${this.props.type} "tile"`}></td>
  }
}

class Grid extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = [['alive', 'dead', 'alive', 'dead'], ['inactive', 'alive', 'alive', 'dead']]
  }

  handleClick = (col, row) => {
    console.log("kliknieto z grid. col=" + col + " row=" + row);
  }

  render() {
  return <table className='Grid'>
      {this.state.map((row, row_index) => 
      <tr>
        {row.map((item, col_index) => <Tile col={col_index} row={row_index} onClick={this.handleClick} type={item}/>)}
      </tr>
      )}
    </table>
  }
}

class Game extends React.Component {
  render() {
    return <Grid />
  }
}


// function Game() {
//   return (
//     <div>Hllo world!</div>
//   );
// }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default Game;
