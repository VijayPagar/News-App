import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  //articles= []
  static defaultProps={
    country:"in",
    pageSize:8,
    category:'general'


  }

  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,

    
  }
  capitalize=(s)=>
  {
      return s[0].toUpperCase() + s.slice(1);
  }

  constructor(props){
    super(props);
    console.log("Hello i am a constructor from News component")
    this.state={
      articles:[],
      loading:false,
      page:1
      
    }
    document.title=`${this.capitalize(this.props.category)} - NewsHub`;
  }
  async componentDidMount() {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=62ee45855ce94483ab5f3f3743074192&page=1&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
  
      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }
  
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
    } catch (error) {
      console.error('Fetch error:', error);
      this.setState({ loading: false });
    }
  }
  
   handlePrevClick=async()=>{
      console.log("Previous")
      
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=62ee45855ce94483ab5f3f3743074192&page=${this.state.page -1 }&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data= await fetch(url)
      
      let parsedData= await data.json();
      console.log(parsedData);
      
      this.setState({
        page:this.state.page -1 ,
        articles:parsedData.articles,
        loading:false
      })
  }
   handleNextClick=async()=>{
      console.log("Next")
      if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

      }
      
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=62ee45855ce94483ab5f3f3743074192&page=${this.state.page +1 }&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data= await fetch(url)
      let parsedData= await data.json();
      
      
      this.setState({
        page:this.state.page +1 ,
        articles:parsedData.articles,
        loading:false
      })

      
  }
  render() {
  
    return (
      <div className='container my-3' >
        <h1 className='text-center' style={{margin :'35px'}} >NewsHub - Top  {this.capitalize(this.props.category)} headlines</h1>
        
        {this.state.loading && <Spinner/>}
        
        <div className="row">

        {!this.state.loading && this.state.articles.map((element)=>{
          
          return(<div className='col-md-4'  key={element.url}>
   
          <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage || "https://ichef.bbci.co.uk/news/1024/branded_news/83B3/production/_115651733_breaking-large-promo-nc.png"} className="card-img-top" alt="..." newsUrl={element.url} author={element.author} date={element.publishedAt}/>
      </div>)
        })}
        <div className="container d-flex justify-content-between">

        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
        <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>&raquo; Next</button>
        </div>
        </div>
      </div>
    )
  }
}

export default News
