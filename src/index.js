let {render} = ReactDOM;

const Board = (props) => {
  return (
    <div className="buffer"> 
      <div className={`card ${props.active || props.matched ? 'active' : ''}`} onClick={props.handleClick.bind(this, props.index)}>
        <div className="flip">
          <div className="front"></div>
          <div className="back" onClick={(e) => {e.stopPropagation()}}><img src={props.item.url} /></div>
        </div>
      </div>
    </div>
  );
};
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items:[
        {
          id: 1,
          url: 'https://unsplash.it/195?image=237'
        },
        {
          id: 2,
          url: 'https://unsplash.it/195?image=455'
        },
        {
          id: 3,
          url: 'https://unsplash.it/195?image=669'
        },
        {
          id: 4,
          url: 'https://unsplash.it/195?image=474'
        },
        {
          id: 5,
          url: 'https://unsplash.it/195?image=631'
        },
        {
          id: 6,
          url: 'https://unsplash.it/195?image=1080'
        },
        {
          id: 7,
          url: 'https://unsplash.it/195?image=869'
        },
        {
          id: 8,
          url: 'https://unsplash.it/195?image=1033'
        },
        {
          id: 9,
          url: 'https://unsplash.it/195?image=553'
        }
      ],
      activeItems: [],
      matchedItems: []
    };

    this.onReset = this.onReset.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onReset() {
    var {items} = this.state;
    this.setState({
      items:_.shuffle(items),
      activeItems:_.shuffle(items),
      matchedItems:_.shuffle(items),
    });
  };

  handleClick(index) {
    let {activeItems, matchedItems, items} = this.state;
    if (activeItems.length >= 2) {
      activeItems.length = 0;
      activeItems.push(index);
    } else {
      activeItems.push(index);
      if (_.hasIn(items[activeItems[0]], 'id') && _.hasIn(items[activeItems[1]], 'id')) {
        if (items[activeItems[0]].id == items[activeItems[1]].id) {
          matchedItems.push(items[activeItems[0]].id);
        }
      }
    }
    this.setState({
      items, activeItems, matchedItems
    });
  }

  componentWillMount() {
    var {items} = this.state;
    this.setState({
      items:_.shuffle(items.concat(items.slice(0)))
    });
  }

  render() {
    var {activeItems, matchedItems, items} = this.state;
    return (
      <div>
        <h2 className="textCenter">Memory Match</h2>
        <h5 className="textCenter">Choose Wisely</h5>
        <div className="textCenter">
          <button className="reset" onClick={this.onReset}>Reset</button>
        </div>
        <div className="buffer"></div>
        <div className="Board textCenter">
          {items.map((item, i) => {
            return <Board
              key={i}
              index={i}
              item={item}
              active={activeItems.indexOf(i) != -1 ? true : false}
              matched={matchedItems.indexOf(item.id) != -1 ? true : false}
              handleClick={this.handleClick} /> 
          })} 
       </div>
      </div>
  )};    
}

ReactDOM.render(
  <Game />,  
  document.getElementById('container')
);
