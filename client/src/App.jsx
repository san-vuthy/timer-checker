import React, { useState } from "react";
import { useEffect } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import { useCallback } from "react";
function App() {
	const [data, setData] = useState();
	const [checkResult, setCheckResult] = useState();

	const check = useCallback(async () => {
		if (typeof data !== "undefined" && typeof checkResult === "undefined") {
			await axios
				.post("http://localhost:60050/check", { qrcode: data })
				.then((res) => {
					setCheckResult(res.data);
				});
		}
	}, [data, checkResult, setCheckResult]);

	useEffect(() => {
		if (typeof data !== "undefined" && typeof checkResult === "undefined") {
			check();
		}
	}, [data, checkResult, check]);

	useEffect(() => {
		if (typeof data !== "undefined" && typeof checkResult !== "undefined") {
			setTimeout(() => {
				setData();
				setCheckResult();
			}, 3000);
		}
	});

	return (
		<div
			style={{
				width: "100vw",
				display: "flex",
				placeContent: "center",
				placeItems: "center",
				gap: "50px",
			}}
		>
			<div style={{ width: "50vw" }}>
				<QrReader
					onResult={(result, error) => {
						if (!!result) {
							setData(result?.text);
						}

						if (!!error) {
							// console.info(error);
						}
					}}
					style={{ width: "20vw" }}
					scanDelay={1000}
				/>
			</div>
			<div>
				<p>{data}</p>
				{typeof checkResult !== "undefined" ? (
					<pre>{JSON.stringify(checkResult, null, 4)}</pre>
				) : (
					""
				)}
				<button
					onClick={(e) => {
						setData();
						setCheckResult();
					}}
				>
					RESET
				</button>
			</div>
		</div>
	);
}

export default App;
