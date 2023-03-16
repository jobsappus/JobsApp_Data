import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from './Container'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import Axios from 'axios'
import url from '../url'

import StateContext from '../StateContext'
import DispatchContext from '../DispatchContext'

export default function Example() {
	const [uploading, setUploading] = useState(false)
	const [file, setFile] = useState(null)
	const [name, setName] = useState('')
	const [h1b, setH1b] = useState('')

	const appState = useContext(StateContext)
	const appDispatch = useContext(DispatchContext)

	const navigate = useNavigate()

	useEffect(() => {
		if (!appState.loggedIn) {
			appDispatch({
				type: 'flashMessage',
				value: {
					message: 'You must be logged in to perform this action',
					color: 'red'
				}
			})
			navigate('/')
			return
		}
	})

	async function handleSubmit(e) {
		e.preventDefault()
		setUploading(true)
		const formData = new FormData()
		formData.append('image', file)
		formData.append('name', name)
		formData.append('h1b', h1b)
		formData.append('token', appState.token)
		try {
			const response = await Axios.post(`${url}/api/v1/companies`, formData)
			setUploading(false)
			setFile(null)
			setName('')
			setH1b('')
			if (response.data.ok) {
				appDispatch({
					type: 'flashMessage',
					value: {
						message: 'Uploaded successfully!',
						color: 'green'
					}
				})
			} else {
				appDispatch({
					type: 'flashMessage',
					value: {
						message: response.data.message,
						color: 'red'
					}
				})
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Container>
			<div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-gray-50 py-6 px-4 shadow sm:rounded-lg sm:px-10">
						<div className="m-1">
							<Link
								to="/company"
								className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								<ArrowLeftIcon
									className="-ml-0.5 h-5 w-5"
									aria-hidden="true"
								/>
								go back
							</Link>
						</div>
						<form className="space-y-6">
							<div className="col-span-6 sm:col-span-3 shadow sm:overflow-hidden sm:rounded-md">
								<div className="space-y-6 bg-white px-4 py-5 sm:p-6">
									<div>
										<label className="block text-sm font-medium leading-6 text-gray-900">
											Company Logo
										</label>
										{file ? (
											<>
												<div className="flex justify-center">
													<img
														src={URL.createObjectURL(file)}
														alt="Uploaded file"
														className="mt-3 inline-block h-28 w-28 rounded-md"
													/>
												</div>
												<p className="text-center">{file.name}</p>
											</>
										) : (
											<div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
												<div className="space-y-1 text-center">
													<svg
														className="mx-auto h-12 w-12 text-gray-400"
														stroke="currentColor"
														fill="none"
														viewBox="0 0 48 48"
														aria-hidden="true"
													>
														<path
															d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
															strokeWidth={2}
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
													<div className="flex text-sm text-gray-600">
														<label
															htmlFor="file-upload"
															className="mx-auto relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
														>
															<span>Upload a file</span>
															<input
																id="file-upload"
																name="file-upload"
																type="file"
																className="sr-only"
																onChange={e =>
																	setFile(e.target.files[0])
																}
															/>
														</label>
													</div>
													<p className="text-xs text-gray-500">
														PNG, JPG, GIF up to 100 Kb
													</p>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
							<div className="col-span-6 sm:col-span-3">
								<div className="col-span-6">
									<label
										htmlFor="name"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Company name
									</label>
									<input
										type="text"
										name="name"
										id="name"
										autoComplete="given-name"
										className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										value={name}
										onChange={e => setName(e.target.value)}
									/>
								</div>
								<div className="col-span-6 mt-2">
									<label
										htmlFor="h1b"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										H1B Approed
									</label>
									<input
										type="number"
										name="h1b"
										id="h1b"
										autoComplete="family-name"
										className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										value={h1b}
										onChange={e => setH1b(e.target.value)}
									/>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
								<button
									className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
									onClick={handleSubmit}
								>
									{uploading ? 'Uploading....' : 'Add company'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Container>
	)
}
