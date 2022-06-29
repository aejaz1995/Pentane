import React from 'react'
import { useParams } from 'react-router'
import Section_latestNews from './Section_latestNews'
import Section_popular from './Section_popular'
import { fetchSectionData } from "../Redux/getData/action"
import { useDispatch, useSelector } from "react-redux"
import Weather from './Weather'
import { Container } from '@material-ui/core'


const SectionNews = () => {

  const {name} = useParams()
  const {news} = useSelector( (state) => state.getData)
  const {isLoading} = useSelector( (state) => state.getData)
  const {isError} = useSelector( (state) => state.getData)
  const dispatch = useDispatch()  //action dispatcher
  const [article,setArticle]=React.useState("");
  
  const getNewsData =()=>{
    const url = `https://api.nytimes.com/svc/topstories/v2/${name}.json?`
    dispatch( fetchSectionData(url) )
  }

  React.useEffect(()=>{
    getNewsData()
    if(localStorage.getItem("postedArticle")){
      setArticle(JSON.parse(localStorage.getItem("postedArticle")))
    };
  },[name])


 

  if (isLoading) {
    return (
      <div style ={{margin:"10px 40%",}}> <img style ={{margin:"auto",}} width="300px" height="300px" src="https://www.bluechipexterminating.com/wp-content/uploads/2020/02/loading-gif-png-5.gif" alt="loading"/> </div>
    )
  } else if (isError) {
    return (
      <div> something went wrong</div>
    )
  } else if (news) {
        return (
          <div>
            
            <div style = {{width:"90%", margin:"15px auto", marginTop:"50px"}}> 
                  <div style = {{display:"flex", justifyContent:"space-between"}}>
                    <div style={{fontSize:"35px", textAlign:"left",  fontWeight:"600"}}>{name.toUpperCase()}</div> 
                    <Weather/>
                  </div>
                  {name==="opinion"? <div style ={{ borderTop:'3px solid #ddd', padding:'1px', borderBottom:'1px solid #ddd'}}></div>: null}
                  {(name === "opinion" && article)?<Container><div dangerouslySetInnerHTML={article} ></div></Container>:null}
                  <div style ={{ borderTop:'3px solid #ddd', padding:'1px', borderBottom:'1px solid #ddd'}}></div>
                  {news && <Section_popular data = {news} />}
                  { <Section_latestNews data = {news}/> }
            </div>
          </div>
        )
  }    

}

export default SectionNews
