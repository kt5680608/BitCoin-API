import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Coin from './Coin'
import './App.css'

function App() {

const [coins, setCoins] = useState([])
const [search, setSearch] = useState('')

//axios 세팅할게요
useEffect(()=>{
  //API 불러올게요
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')

  .then(res=>{ 
    //서버가 제공하는 응답 데이터로 setCoins를 초기화할게요
    try{setCoins(res.data)}
    catch (e){ console.error(e) }
  })
})

//이벤트가 발생하면 value를 조회해서 setSearch로 넘겨주세요
const handleChange = e => {
  setSearch(e.target.value);
};

//입력한 검색어를 포함한 목록으로 필터링해주세요
const filteredCoins = coins.filter(coin =>
  coin.name.toLowerCase().includes(search.toLowerCase())
)

  return (
    <div className="coin__app">
      <div className="coin__search">
        <h1 className="coin__text">Search a currency</h1>
        <form>
          <input type="text" placeholder = "Search" className = "coin__input" onChange = {handleChange}/>
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key = { coin.id }
            name = { coin.name }
            image = { coin.image }
            symbol = { coin.symbol }
            marketcap = { coin.market_cap }
            price = { coin.current_price }
            priceChanged = { coin.price_change_percentage_24h }
            volume = { coin.total_volume }
          />
        )
      })}
    </div>
  )
}

export default App