import { useEffect } from 'react';
// Software
// Data
// Cloud
// Security
// DevOps
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';

import Job from './components/Job';
import EditJob from './components/EditJob';
import AddJob from './components/AddJob';
import Company from './components/Company';
import AddCompany from './components/AddCompany';
import EditCompany from './components/EditCompany';
import FlashMessages from './components/FlashMessages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import StateContext from './StateContext';
import DispatchContext from './DispatchContext';

import { useImmerReducer } from 'use-immer';

function App() {
	const initialState = {
		token: localStorage.getItem('token'),
		loggedIn: Boolean(localStorage.getItem('token')),
		flashMessages: [],
	};
	function ourReducer(draft, action) {
		switch (action.type) {
			case 'login':
				draft.loggedIn = true;
				draft.token = action.value;
				return;
			case 'logout':
				draft.loggedIn = false;
				return;
			case 'flashMessage':
				draft.flashMessages.push(action.value);
				return;
			case 'clearFlashMessages':
				draft.flashMessages = [];
				return;
			default:
				return;
		}
	}

	const [state, dispatch] = useImmerReducer(ourReducer, initialState);

	useEffect(() => {
		if (state.loggedIn) {
			localStorage.setItem('token', state.token);
		} else {
			localStorage.removeItem('token');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.loggedIn]);
	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<BrowserRouter>
					<FlashMessages messages={state.flashMessages} />
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/job" element={<Job />} />
						<Route path="/job/add" element={<AddJob />} />
						<Route path="/job/edit/:id" element={<EditJob />} />
						<Route path="/company" element={<Company />} />
						<Route path="/company/add" element={<AddCompany />} />
						<Route path="/company/edit/:id" element={<EditCompany />} />
					</Routes>
				</BrowserRouter>
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
}

export default App;
