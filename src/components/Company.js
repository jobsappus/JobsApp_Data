import url from '../url'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Container from './Container'

export default function Company() {
	const [companies, setCompanies] = useState([])

	useEffect(() => {
		const ourRequest = Axios.CancelToken.source()
		async function fetchResults() {
			try {
				const response = await Axios.get(`${url}/api/v1/companies`)
				// console.log(response.data)
				setCompanies(response.data.data.sort((a, b) => a.name > b.name))
			} catch (e) {
				console.log('There was a problem or the request was cancelled.')
			}
		}
		fetchResults()
		return () => {
			ourRequest.cancel()
		}
	}, [])

	return (
		<Container>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center">
					<div className="sm:flex-auto">
						<h1 className="text-base font-semibold leading-6 text-gray-900">
							Companies
						</h1>
						<p className="mt-2 text-sm text-gray-700">
							A list of all the Companies.
						</p>
					</div>
					<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
						<Link
							className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							to="/job"
						>
							View Jobs
						</Link>
					</div>
					<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
						<Link
							to="/company/add"
							className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Add Company
						</Link>
					</div>
				</div>
				<div className="mt-8 flow-root">
					<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
								{companies.map(company => (
									<div
										key={company.companyId}
										className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
									>
										<div className="flex-shrink-0">
											<img
												className="h-20 w-20 rounded-full border-blue-500"
												src={company.logo}
												alt=""
											/>
										</div>
										<div className="min-w-0 flex-1">
											<span
												className="absolute inset-0"
												aria-hidden="true"
											/>
											<p className="text-lg font-medium text-gray-900">
												{company.name}
											</p>
											<p className="truncate text-sm text-gray-500">
												{company.h1b + ' H1B Approved'}
											</p>
										</div>
										<div className="min-w-0 flex-1">
											<div className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
												<Link
													to={`/company/edit/${company.companyId}`}
													className="text-indigo-600 hover:text-indigo-900"
												>
													Edit
												</Link>
											</div>
											{/* <div className="relative whitespace-nowrap pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
												<Link
													to={`/jobs/edit/${company.companyId}`}
													className="text-red-600 hover:text-red-900"
												>
													Delete
												</Link>
											</div> */}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}
