import { Link } from 'react-router-dom'
import './Footer.css'
const Footer = () => {
	return (
		<footer>
			<nav>
				<ul className='navigation-items'>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='/buildings'>Buildings</Link>
					</li>
				</ul>
			</nav>
		</footer>
	)
}

export default Footer
