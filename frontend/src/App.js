import './App.css'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Footer from './components/common/Footer'
import BuildingsPage from './pages/BuildingsPage'

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/buildings' component={BuildingsPage} />
				</Switch>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App
