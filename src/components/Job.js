import url from '../url'
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Container from './Container'

import StateContext from '../StateContext'
import DispatchContext from '../DispatchContext'

function Jobs() {
	const [jobs, setJobs] = useState([])
	const [del, setDel] = useState(0)

	const appState = useContext(StateContext)
	const appDispatch = useContext(DispatchContext)
	// const navigate = useNavigate()

	function parse(timestamp) {
		const date = new Date(timestamp)
		const day = date.getDate()
		const month = date.getMonth() + 1
		const year = date.getFullYear()
		return `${day}/${month}/${year}`
	}

	const deleteHandler = async e => {
		const deleteResponse = window.confirm('Are you sure you want to do that?')

		if (deleteResponse) {
			const response = await Axios.delete(
				`${url}/api/v1/jobs/${e.target.value}_${appState.token}`
			)
			if (response.data.ok) {
				appDispatch({
					type: 'flashMessage',
					value: {
						message: 'Deleted successfully!',
						color: 'green'
					}
				})
				setTimeout(() => {
					setDel(del + 1)
				}, 1000)
			} else {
				appDispatch({
					type: 'flashMessage',
					value: {
						message: response.data.message,
						color: 'red'
					}
				})
			}
		}
		return
	}

	useEffect(() => {
		async function fetchData() {
			const response = await Axios.get(`${url}/api/v1/jobs`)
			setJobs(response.data.data)
		}
		fetchData()
	}, [del])

	return (
		<Container>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center">
					<div className="sm:flex-auto">
						<h1 className="text-base font-semibold leading-6 text-gray-900">
							Jobs
						</h1>
						<p className="mt-2 text-sm text-gray-700">
							A list of all the Jobs.
						</p>
					</div>
					<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
						<Link
							to="/company"
							className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							View Companies
						</Link>
					</div>
					<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
						<Link
							type="button"
							className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							to="/job/add"
						>
							Add Job/Company
						</Link>
					</div>
				</div>
				<div className="mt-8 flow-root">
					<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table className="min-w-full divide-y divide-gray-300">
								<thead>
									<tr>
										<th
											scope="col"
											className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
										>
											Company
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>
											Title
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>
											Posted Date
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>
											Job Type
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>
											Apply Link
										</th>
										<th
											scope="col"
											className="relative py-3.5 pl-3 pr-4 sm:pr-0"
										>
											<span className="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{jobs.map(job => (
										<tr key={job.jobId}>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
												<div className="flex items-center">
													<div className="h-10 w-10 flex-shrink-0">
														<img
															className="h-10 w-10 rounded-full"
															src={job.company.logo}
															alt=""
														/>
													</div>
													<div className="ml-4">
														<div className="font-medium text-gray-900">
															{job.company.name}
														</div>
														<div className="text-gray-500">
															{job.company.h1b +
																" H1B's Approved"}
														</div>
													</div>
												</div>
											</td>
											<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
												<div className="text-gray-900">
													{job.jobTitle}
												</div>
											</td>
											<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
												<div className="text-gray-900">
													{parse(job.jobPostedDate)}
												</div>
											</td>
											<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
												<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
													{job.jobType === 'true'
														? 'Full Time'
														: 'Internship'}
												</span>
											</td>
											<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
												<a
													href={job.jobLink}
													target="blank"
													className="rounded bg-indigo-600 py-1 px-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
												>
													Apply
												</a>
											</td>
											<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
												<Link
													to={`/job/edit/${job.jobId}`}
													className="text-indigo-600 hover:text-indigo-900"
												>
													Edit
												</Link>
											</td>
											<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
												<button
													className="text-red-600 hover:text-red-900"
													onClick={deleteHandler}
													value={job.jobId}
												>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default Jobs
