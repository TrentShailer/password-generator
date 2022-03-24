import "./App.css";
import { useState } from "react";
import Container from "@mui/material/Container";
import { Button, Divider, Grid, Card, Slider, Typography } from "@mui/material";
import axios from "axios";

function App() {
	const [passwords, setPasswords] = useState([]);
	const [charLimit, setCharLimit] = useState([16, 32]);
	const [passwordCount, setPasswordCount] = useState(3);

	const changeCharLimit = (event, newValue, activeThumb) => {
		if (!Array.isArray(newValue)) {
			return;
		}

		if (activeThumb === 0) {
			setCharLimit([Math.min(newValue[0], charLimit[1] - 4), charLimit[1]]);
		} else {
			setCharLimit([charLimit[0], Math.max(newValue[1], charLimit[0] + 4)]);
		}
	};

	const changePasswordCount = (event, newValue) => {
		if (typeof newValue === "number") {
			setPasswordCount(newValue);
		}
	};

	const generatePasswords = () => {
		axios
			.get(`/generate/${passwordCount}/${charLimit}`)
			.then((result) => {
				if (result.data.success) {
					setPasswords(result.data.passwords);
				} else {
					console.log("Failed");
				}
			})
			.catch((error) => {
				console.log("Error");
				console.error(error);
			});
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
						<Typography variant="subtitle2">Character Limit</Typography>
						<Slider
							value={charLimit}
							step={1}
							min={10}
							max={32}
							scale={(value) => (value === 32 ? Infinity : value)}
							marks={[
								{ value: 10, label: "10" },
								{ value: 32, label: "No Limit" },
							]}
							onChange={changeCharLimit}
							valueLabelDisplay="auto"
							disableSwap
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
						<Card
							scrollable={"scroll"}
							style={{ padding: 25, marginBottom: 25 }}
							elevation={5}>
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
