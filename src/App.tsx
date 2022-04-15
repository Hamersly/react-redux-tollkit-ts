import React, {useEffect} from 'react';
import './App.css';
import {useDispatch} from "react-redux";
import {useAppSelector} from "./hooks/redux";
import {userSlice} from "./store/redusers/userSlice";
import {fetchUsers} from "./store/redusers/actions";
import {PostContainer} from "./components/PostContainer";

function App() {
	const {users, isLoading, error} = useAppSelector(state => state.userReducer)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchUsers())
	}, [])

	return (
		<div className="App">
			{isLoading && <h1>Loading...</h1>}
			{error && <h1>{error}</h1>}
			{JSON.stringify(users, null, 2)}
			<hr/>
			<PostContainer/>
		</div>
	);
}

export default App;
