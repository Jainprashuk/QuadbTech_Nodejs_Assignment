import './App.css'
import Data from './Components/Data'
import Header from './Components/Header'
import Stats from './Components/Stats'

function App() {


  return (
    <>
      <div className='bg-gray-800 '>
        <Header/>

        <Stats/>

        <Data/>
      </div>
    </>
  )
}

export default App
