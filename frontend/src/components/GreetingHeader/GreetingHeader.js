import './GreetingHeader.css'
import { ReactComponent as Avatar } from './assets/profile.svg'
const GreetingHeader = () => {
	return (
		<header className='greeting-header'>
			<h2>Welcome</h2>
			<Avatar className='fill-white' height='35px' width='35px' />
		</header>
	)
}

export default GreetingHeader
