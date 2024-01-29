import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  articles= []

  constructor(){
    super();
    console.log("Hello i am a constructor from News component")
    this.state={
      articles:[],
      loading:false,
      page:1
      
    }
  }

  async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=62ee45855ce94483ab5f3f3743074192"
    let data= await fetch(url)
    let parsedData= await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults})

  }



   handlePrevClick=async()=>{
      console.log("Previous")
      
      let url=`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=62ee45855ce94483ab5f3f3743074192&page=${this.state.page -1 }`
      let data= await fetch(url)
      let parsedData= await data.json();
      console.log(parsedData);
      
      this.setState({
        page:this.state.page -1 ,
        articles:parsedData.articles
      })




  }


   handleNextClick=async()=>{
      console.log("Next")
      if(this.state.page +1 > Math.ceil(this.state.totalResults/20)){

      }
      else{
      let url=`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=62ee45855ce94483ab5f3f3743074192&page=${this.state.page +1 }&pageSize=20`
      let data= await fetch(url)
      let parsedData= await data.json();
      console.log(parsedData);
      
      this.setState({
        page:this.state.page +1 ,
        articles:parsedData.articles
      })

      }

      
  

  }


  


  render() {
  
    return (
      <div className='container my-3' >
        <h2>News app - Top headlines</h2>
        
        <div className="row">

        {this.state.articles.map((element)=>{
          
          return(<div className='col-md-4'  key={element.url}>
          <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} className="card-img-top" alt="..." newsUrl={element.url}/>
      </div>)
          
          

        })}
        <div className="container d-flex justify-content-between">

        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>&raquo; Next</button>
        </div>
            
            
        </div>
      </div>
    )
  }
}

export default News
