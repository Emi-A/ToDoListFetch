import React, { useState, useEffect } from "react";

import { ListaTarea } from "./lista-tarea";

//create your first component
export function Home() {
	const [list, setList] = useState([]);

	useEffect(() => {
		async function fetchTodo() {
			let url = "https://assets.breatheco.de/apis/fake/todos/user/Emi-A1";
			let response = await fetch(url)
				.then(res => {
					return res;
				})
				.catch(err => {
					console.log("Error", err);
				});

			if (response.status >= 400) {
				let result = await fetch(url, {
					method: "POST",
					body: JSON.stringify([]),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => {
						console.log(res);
						console.log(res.text());
					})

					.catch(error => console.log(error));
			} else {
				setList[response.json()];
			}
		}
		fetchTodo();
	}, []);

	const handle = e => {
		if (e.key === "Enter") {
			setList([...list, e.target.value]);
			e.target.value = "";
		}
	};

	return (
		<div
			className="text-center"
			style={{ backgroundColor: "rgba(52, 52, 52, 0.8)" }}>
			<h1>Todos</h1>
			<input
				type="text"
				placeholder="What needs to be done?"
				onKeyDown={handle}
			/>
			<ListaTarea list={list} actList={setList} />
			<span>{"Tareas pendientes: " + list.length}</span>
		</div>
	);
}
