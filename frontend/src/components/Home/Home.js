import { Link } from 'react-router-dom'
import './Home.css'
import building from '../../assets/building.png'

const Home = () => {
	return (
		<section className='page-wrapper'>
			<Link data-testid='header' to='/buildings'>
				<header>
					<h1>Buildings</h1>
				</header>
			</Link>
			<div className='image-container'>
				<img className='img-size' src={building} alt='building' />
			</div>
			<p>
				Eu voluptate veniam esse ad incididunt Lorem. Fugiat nulla est eiusmod
				labore Lorem dolore minim ex anim. Pariatur aute elit sit cupidatat
				adipisicing qui culpa minim. Officia occaecat voluptate ea laborum anim.
				Tempor culpa cupidatat velit do fugiat duis voluptate culpa nulla
				eiusmod quis laborum. Aute commodo eiusmod labore nulla culpa ut aliqua
				aute ex commodo sunt. Qui amet consectetur mollit velit tempor mollit
				laboris ex Lorem exercitation velit. Amet exercitation amet qui aute et
				sit velit aute et dolore ipsum in. Commodo culpa quis ut eiusmod
				consequat cillum officia anim pariatur reprehenderit cillum.
			</p>
		</section>
	)
}

export default Home
