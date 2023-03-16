import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StateContext from '../StateContext'
import DispatchContext from '../DispatchContext'

export default function Example() {
	const appState = useContext(StateContext)
	const appDispatch = useContext(DispatchContext)

	const navigate = useNavigate()

	function handleLogout() {
		appDispatch({ type: 'logout' })
		appDispatch({
			type: 'flashMessage',
			value: { message: 'You have successfully logged out.', color: 'green' }
		})
		setTimeout(() => {
			navigate('/')
		}, 1500)
	}

	return (
		<div className="bg-black rounded-sm">
			<div className="p-3 md:flex md:items-center md:justify-between">
				<div className="min-w-0 flex-1">
					<h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
						Data uploading
					</h2>
				</div>
				{appState.loggedIn ? (
					<div className="mt-4 flex flex-shrink-0 md:mt-0 md:ml-4">
						<button
							className="mx-10 inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
							onClick={handleLogout}
						>
							Logout
						</button>
					</div>
				) : (
					<div className="mt-4 flex flex-shrink-0 md:mt-0 md:ml-4">
						<Link
							to="/login"
							className="mx-10 inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
						>
							Login
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}
