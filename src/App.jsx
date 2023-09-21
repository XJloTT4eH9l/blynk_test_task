import { useState, useEffect } from "react"

import Items from "./components/Items/Items"
import Comments from "./components/Comments/Comments"
import Aside from "./components/Aside/Aside";

function App() {
const [items, setItems] = useState([]);
const [currentItem, setCurrentItem] = useState(null);

useEffect(() => {
  const lsItems = localStorage.getItem('lsItems');
  const lsCurentItem = localStorage.getItem('lsCurentItem');

  if(lsItems !== null) setItems(JSON.parse(lsItems))
  if(lsCurentItem !== null) setCurrentItem(JSON.parse(lsCurentItem))
}, [])

  return (
    <>
      <Aside />
      <main className="main">
        <div className="wrapper">
          <Items 
            items={items} 
            setItems={setItems}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
          />
          <Comments 
            items={items} 
            setItems={setItems}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
          />
        </div>
      </main>
    </>
  )
}

export default App