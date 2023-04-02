import React,{useEffect, useState} from "react";
import PokemonList from './PokemonList'
import Pagination from './Pagination'
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([])//(["bulbasaur","charmander","squirtle"]) //default state keep pokemon [] by def
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon") //def state api url assiged to cPageurl
  const [nextPageUrl, setNextPageUrl] = useState([]) 
  const [prevPageUrl, setPrevPageUrl] = useState([]) 
  const [loading, setLoading] = useState(true)
   useEffect(() =>{
    setLoading(true)
    let cancel
    axios.get(currentPageUrl,{
      cancelToken: new axios.CancelToken(c => cancel=c) //var cancel assigned canceltoken c
    }).then(res =>{
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p =>p.name))
      //this list is rendered only once
      //returns a promise similar to fetch async response for request is returned p points to object setPokemon variable to a value
  })
   return() =>{  //function to overwrite on prev requests
    cancel()  //cancel created above uses cancel method to stop req
   }
   },[currentPageUrl]) //prop is an array of arguments this effect is run due to rerender if an element in array changes
   //whenever we go to next/prev page the cPageurl changes so re render w new list of pokemons
   
   function gotoNextPage(){
    setCurrentPageUrl(nextPageUrl)
   }
   function gotoPrevPage(){
    setCurrentPageUrl(prevPageUrl)
   }

   if(loading) return "Loading...."
  return (//rendering pokemon into pokemon list
    <>
    <PokemonList pokemon = {pokemon} />   
    <Pagination
     gotoNextPage={nextPageUrl ? gotoNextPage:null}
     gotoPrevPage={prevPageUrl ? gotoPrevPage:null}
    />
    </> //only 1 object returned in JS So keep in <></>
  );
}

export default App;

//HOOK:  UseState: to store state in functional component  1st parameter is initial state 2nd parameter is method to update 1st
//UseEffect:
//Destructure props
//axios library used to fetch from api better than standard fetch by making async request
//these effects can be run whenever we re-render our application
