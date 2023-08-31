import React from 'react';
import './App.css';

const Header = () => {
	return <h2>Hello World</h2>
}

class Field extends React.Component {
	render() {
		const holder = 'Enter here';
		const styledField = {
			width: '300px'
		};

		return <input placeholder={holder} type='text' style={styledField} />
	}
}

function Btn() {
	const text = 'Log in';
	const logged = true;

	return <button>{logged ? 'Enter' : text}</button>
}

function App() {
	return (
		<div className="App">
			<Header />
			<Field />
			<Btn />
		</div>
	);
}

export default App;
