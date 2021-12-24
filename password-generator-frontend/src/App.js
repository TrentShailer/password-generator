import "./App.css";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Button, Divider, Grid, Paper, Card, Slider, Typography } from "@mui/material";

import adjectives from "./static/adjectives.js";
import nouns from "./static/nouns.js";
import verbs from "./static/verbs.js";

function GeneratePassword(numberOfWords, characterLimit) {
	let password = "";

	for (let i = 0; i < numberOfWords - 1; i++) {
		let wordIndex = Math.floor(Math.random() * adjectives.length);
		password += `${adjectives[wordIndex]} `;
	}

	let finalType = Math.floor(Math.random() * 2);

	if (finalType === 1) {
		let wordIndex = Math.floor(Math.random() * nouns.length);
		password += nouns[wordIndex];
	} else {
		let wordIndex = Math.floor(Math.random() * verbs.length);
		password += verbs[wordIndex];
	}

	if (password.length > characterLimit && characterLimit > 9) {
		password = GeneratePassword(numberOfWords, characterLimit);
	}

	return password;
}

function App() {
	const [passwords, setPasswords] = useState([]);
	const [characterLimit, setCharacterLimit] = useState(50);
	const [wordCount, setWordCount] = useState(2);
	const [passwordCount, setPasswordCount] = useState(3);

	const changeCharLimit = (event, newValue) => {
		if (typeof newValue === "number") {
			setCharacterLimit(newValue);
		}
	};

	const changeWordCount = (event, newValue) => {
		if (typeof newValue === "number") {
			setWordCount(newValue);
		}
	};

	const changePasswordCount = (event, newValue) => {
		if (typeof newValue === "number") {
			setPasswordCount(newValue);
		}
	};

	const generatePasswords = () => {
		let newPasswords = [];
		for (let i = 0; i < passwordCount; i++) {
			newPasswords.push(GeneratePassword(wordCount, characterLimit));
		}
		setPasswords(newPasswords);
	};

	return (
		<div className="App">
			<Container maxWidth="md">
				<Grid
					container
					direction="column"
					justifyContent="center"
					spacing="25"
					style={{ marginTop: "5rem" }}>
					<Grid item>
						<Typography variant="h2">Password Generator</Typography>
					</Grid>

					<Grid item>
						<Typography variant="subtitle2">Word Count</Typography>
						<Slider
							defaultValue={2}
							step={1}
							min={2}
							max={5}
							marks={[
								{ value: 2, label: "2" },
								{ value: 5, label: "5" },
							]}
							onChange={changeWordCount}
							valueLabelDisplay="auto"
						/>
					</Grid>
					<Grid item>
						<Typography variant="subtitle2">Character Limit</Typography>
						<Slider
							defaultValue={50}
							step={1}
							min={10}
							max={50}
							scale={(value) => (value === 50 ? Infinity : value)}
							marks={[
								{ value: 10, label: "10" },
								{ value: 50, label: "No Limit" },
							]}
							onChange={changeCharLimit}
							valueLabelDisplay="auto"
						/>
					</Grid>
					<Grid item>
						<Typography variant="subtitle2">Passwords to Generate</Typography>
						<Slider
							defaultValue={3}
							step={1}
							min={1}
							max={10}
							marks={[
								{ value: 1, label: "1" },
								{ value: 10, label: "10" },
							]}
							onChange={changePasswordCount}
							valueLabelDisplay="auto"
						/>
					</Grid>
					<Grid item>
						<Button
							onClick={generatePasswords}
							startIcon={
								<svg width="24" height="24" viewBox="0 0 24 24">
									<path
										fill="#fff"
										d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
									/>
								</svg>
							}
							size="large"
							variant="contained"
							color="success">
							Generate Passwords
						</Button>
					</Grid>
					<Grid item>
						<Card scrollable style={{ padding: 25, marginBottom: 25 }} elevation={5}>
							<Grid container direction="column" justifyContent="center" spacing="5">
								{passwords.map((password) => (
									<Grid item key={password}>
										<Grid container direction="row" justifyContent="center">
											<Grid item xs={8}>
												<Typography
													style={{ textTransform: "capitalize" }}
													variant="body"
													fontFamily="Roboto Mono">
													{password}
												</Typography>
											</Grid>
											<Grid item>
												<Typography variant="body" fontFamily="Roboto Mono">
													{password.length}
												</Typography>
											</Grid>
										</Grid>
										<Divider style={{ marginTop: 20 }} />
									</Grid>
								))}
							</Grid>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default App;
