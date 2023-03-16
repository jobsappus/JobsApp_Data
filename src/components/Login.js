import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import DispatchContext from '../DispatchContext'

import Axios from 'axios'

import url from '../url'

export default function Login() {
	const [loginId, setLoginId] = useState('')
	const [password, setPassword] = useState('')

	const appDispatch = useContext(DispatchContext)

	const navigate = useNavigate()

	async function handleSubmit(e) {
		e.preventDefault()
		// try {
		const response = await Axios.post(`${url}/api/v1/users/login`, {
			loginId,
			password
		})
		// console.log(response.data)
		if (response.data.ok) {
			appDispatch({ type: 'login', value: response.data.token })
			appDispatch({
				type: 'flashMessage',
				value: {
					message: 'Welcome Admin!!',
					color: 'green'
				}
			})
			setTimeout(() => {
				navigate('/')
			}, 1000)
		} else {
			appDispatch({
				type: 'flashMessage',
				value: {
					message: 'Incorrect username / password',
					color: 'red'
				}
			})
		}
	}

	return (
		<>
			<div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
						Sign in to admin account
					</h2>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form className="space-y-6">
							<div>
								<label
									htmlFor="loginId"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Admin Id
								</label>
								<div className="mt-2">
									<input
										id="loginId"
										name="loginId"
										type="text"
										autoComplete="loginId"
										required
										className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										value={loginId}
										onChange={e => setLoginId(e.target.value)}
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
								<div className="mt-2">
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										value={password}
										onChange={e => setPassword(e.target.value)}
									/>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									onClick={handleSubmit}
								>
									Sign in
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
