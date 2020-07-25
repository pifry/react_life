import React from 'react';
//import logo from './logo.svg';
import './App.css';

class Button extends React.Component {
  render () {
    return <button onClick={this.props.onClick}>{this.props.text}</button>
  }
}

class Tile extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     active_share: 0,
  //     total_share: 1
  //   }
  // }

  // componentWillReceiveProps() {
  //   this.setState( { active_share: this.state.active_share + 1 } );
  // }

  handleClick = () => {
    this.props.onClick(this.props.col, this.props.row)
  }

  render() {
    return <td onClick={this.handleClick} className={`${this.props.type} "tile"`}></td>
  }
}

class Grid extends React.Component {
  
  initialState = (width, height) => {
    let grid = [];
    for(let i=0;i<height;i++) {
      grid[i] = [];
      for(let j=0;j<width;j++) {
        grid[i][j] = 'dead';
      }
    }
    return grid;
  }

  constructor(props) {
    super(props);
    this.state = {
      arr: this.initialState(props.height,props.width),
      epoch: 0
    };
  }

  step = () => {
    let items = this.state.arr.map(el => [...el]);
    for(let row_num=0;row_num<items.length;row_num++) {
      let row = items[row_num];
      for(let col_num=0;col_num<row.length;col_num++) {
        let n =  this.getNeighbours(this.state.arr, row_num, col_num);
        row[col_num] = this.getNextState(row[col_num], n);
      }
    }
    
    this.setState({arr: items})
    this.setState({epoch: this.state.epoch + 1})
  }

  getNeighbours = (grid, row_num, col_num) => {
    let count = 0;
    let row_numm_low = (row_num > 0 ? row_num - 1 : 0);
    let col_num_low = (col_num > 0 ? col_num - 1 : 0);
    let sliced = grid.slice(row_numm_low, row_num+2);
    if(row_num === 0) {
      sliced = [...sliced, grid.slice(grid.length-1, grid.length)[0]];
    }
    if(row_num === grid.length-1) {
      sliced = [...sliced, grid.slice(0, 1)[0]];
    }
    //console.log(sliced);
    sliced.forEach(row => {
      let row_slice = row.slice(col_num_low, col_num+2);
      if(col_num === 0) {
        row_slice = [...row_slice, row.slice(row.length-1, row.length)[0]];
      }
      if(col_num === row.length - 1) {
        row_slice = [...row_slice, row.slice(0,1)[0]];
      }
      count += row_slice.filter(x => x === 'alive').length;
    });
    count = grid[row_num][col_num] === 'alive' ? count - 1 : count;
    return count;
  }

  getNextState = (state, neighbours) => {
    switch (state) {
      case 'alive':
        if(neighbours >= 2 && neighbours <= 3) {
          return 'alive';
        } else {
          return 'dead';
        }
      case 'dead':
        if(neighbours === 3) {
          return 'alive';
        } else {
          return 'dead';
        }
      default:
        return 'dead';
    }
  }

  handleClick = (col_num, row_num) => {
    console.log(row_num, col_num, this.getNeighbours(this.state.arr, row_num, col_num));
    let items = this.state.arr.map(el => [...el]);
    let row = items[row_num];
    row[col_num] = row[col_num] === 'alive' ? 'dead' : 'alive';
    this.setState({arr: items})
  }

  start = () => {
    if(this.interval === null) {
      this.interval = setInterval(() => this.step(), 300);
    }
  }

  stop = () => {
    if(this.interval != null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  render() {
  return <div> 
  {this.state.epoch}
  <table className='Grid'>
  
    <tbody>
      {this.state.arr.map((row, row_index) => 
      <tr>
        {row.map((item, col_index) => <Tile col={col_index} row={row_index} onClick={this.handleClick} type={item}/>)}
      </tr>
      )}
      </tbody>
    </table>
    <Button text="Start" onClick={this.start}/><Button text="Stop" onClick={this.stop}/>
    </div>
  }

  componentDidMount() {
    this.interval = null;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

class Game extends React.Component {

  render() {
    return <Grid width={30} height={30}/>
  }
}

export default Game;
