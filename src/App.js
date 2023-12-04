import React, { useState } from 'react';
import {marked} from 'marked';

// TODO:
// > Implement redux for state management
// > Different files for different components

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function App(props) {
	const [previewText, setPreviewText] = useState(props.initialText);
	const [fullScreened, setFullScreened] = useState(false);
	const [focusedPanel, setFocusedPanel] = useState(null);

	const panels = [
		{ name: "editor", content: <Editor previewText={previewText}setPreviewText={setPreviewText} /> },
		{ name: "preview", content: <Previewer previewText={previewText} /> }
	]

	const fullScreen = (name) => {
		setFocusedPanel(!fullScreened ? name : null);
		setFullScreened(!fullScreened);
	}

	const displayPanel = (panel) => {
		return (<Panel {...panel} fullScreen={fullScreen} key={panel.name} isFullscreened={focusedPanel===panel.name}/>)
	}

	const displayPanels = () => {
		if (fullScreened) {
			const panel = panels.filter(element => element.name===focusedPanel)[0];
			return displayPanel(panel);
		}
		return panels.map(displayPanel);
	}

	return (
		<div id='container'>
			<div id="top-bar">
			<h2>
			<i class="fa-brands fa-react"></i>
			_Markdown Previewer_
			<i class="fa-brands fa-react"></i>
			</h2>

			</div>
			<div id="wrapper">
				{displayPanels()}
			</div>
		</div>
	);
}

function Panel(props) {
	const fullScreenStyle = props.isFullscreened ? {height: "100%", width: "100%"} : {};
	const icon = props.isFullscreened ? "fa-minimize" : "fa-maximize";

	return (
		<div id={props.name + "-panel"} className='panel' style={fullScreenStyle}>
			<div className='toolbar'>
				{capitalizeFirstLetter(props.name)}
				<button type="button" onClick={() => {props.fullScreen(props.name)}}>
					<i className={"fa-solid " + icon} ></i>
				</button>
			</div>
			{props.content}
		</div>

	);
}

function Editor(props) {
	return (
		<textarea
			id="editor"
			className='text'
			value={props.previewText}
			typeof='text'
			onChange={(e) => { props.setPreviewText(e.target.value) }}>
		</textarea>
	)
}

function Previewer(props) {
	return (
		<div
			id="preview"
			className='text'
			dangerouslySetInnerHTML={{ __html: marked(props.previewText) }} />
	)
}


export default App;
