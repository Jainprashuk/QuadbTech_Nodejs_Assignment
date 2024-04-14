import './App.css'
import Data from './Components/Data'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Stats from './Components/Stats'

function App() {


  return (
    <>
      <div className='bg-gray-800 '>
        <Header/>

        <Stats/>

        <Data/>

        <Footer/>

      </div>
    </>
  )
}

export default App
