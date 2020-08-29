import React, { Component } from 'react';
import { Modal, Button, message } from 'antd';
import TabsCard from './components/recipeCards';
import './App.css';

require("dotenv").config();


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isloaded: false,
      search: "",
      query: "",
      visible: false,
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = () => {
    fetch(
      `https://api.edamam.com/search?q=${this.state.query}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isloaded: true,
          items: json,
        });
      });
  };

  componentDidUpdate(prevP, prevS, SS) {
    if (this.state.query !== prevS.query) {
      this.setState({ query: this.state.query });
      this.performSearch(this.state.query);
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };



  //keep past searches, click on them to search again?
  //view btn opens full page modal to view larger image and all details
  //save recipe btn, saves all recipes from all searches in a recipe book
  //recipe book routes to a new page
  
  
  render() {
    var { isloaded, items } = this.state;
    
    if (!isloaded) {
      return (
        <div className="loading">
          <i className="fas fa-spinner fa-5x"></i>
          <h2>Loading...</h2>
        </div>
      );
    } else {
      const updateSearch = (e) => {
        //passes the input target value into the search state
        this.setState({ search: e.target.value });
      };

      const getSearch = (e) => {
        e.preventDefault();
        this.setState({ query: this.state.search });
      };

      const clickFav = (e) => {
        var starIcon = document.getElementsByClassName("fa-star");
        console.log(starIcon)
        console.log(e.target.classList)
        success();
        e.target.classList.toggle("fas");
      };

      const success = () => {
        message.success('Recipe saved!');
      };

      return (
        
        <div className="App">
          <h1>Recipes</h1>
          <form onSubmit={getSearch} className="search-form">
            <input
              className="search-bar"
              type="text"
              value={this.state.search}
              onChange={updateSearch}
              placeholder="Search for recipes..."
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </form>

         <div className="recipes">
            {items.hits.map((item) => (
              <>
              <TabsCard
                  key={item.id}
                  image={item.recipe.image}
                  label={item.recipe.label}
                  ingredients={item.recipe.ingredientLines}
                  calories={item.recipe.calories.toFixed(0)}
                  totalTime={item.recipe.totalTime}
                  servingSize={item.recipe.yield}
                  dietLabels={item.recipe.dietLabels}
                  healthLabels={item.recipe.healthLabels}
                >
              </TabsCard>
              
                
                {console.log(item.recipe)}
                {/*<div className="recipe-box">
                  <div>
                    <h2>{item.recipe.label}</h2>
                    <img
                      src={item.recipe.image}
                      alt=""
                      className="recipe-image"
                      onClick={this.openImage}
                    ></img>
                  </div>
                  <div>
                    <p>{item.recipe.dietLabels[0]}</p>
                    <p>Calories: {item.recipe.calories.toFixed(0)}</p>
                    <h4 className="ingredients">Ingredients:</h4>
                    <ul className="ingredients">
                      {item.recipe.ingredientLines.map((ingredient) => (
                        <li>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <p>Cook time: {item.recipe.totalTime} minutes</p>
                  <br />
                  <button className="save-recipe-btn" onClick={this.showModal}>
                    View More
                  </button>
                  <i className="far fa-star fa-3x" onClick={clickFav}></i>
                  <HeartTwoTone twoToneColor="#eb2f96" />
                  <button className="view-btn" onClick={view}>View</button></div>*/}
                
              </>
            ))}
            </div>


            <Modal
              title="Recipe Label"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p></p>
            </Modal>
          </div>
          
        
      );
    }
  }
}

export default App;
