import React, { useState } from 'react';

function App() {
	const [previewText, setPreviewText] = useState("");



	return (
		<div id='container'>
			<textarea
				id="text-input"
				onChange={(e) => { setPreviewText(e.target.value) }}>

			</textarea>
			<div id="preview-panel">
				<p id="preview-text">{previewText}</p>
			</div>
		</div>
	);
}

export default App;
