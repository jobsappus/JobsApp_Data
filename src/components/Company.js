import url from '../url';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import Axios from 'axios';

export default function Company() {
	const [companies, setCompanies] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const ourRequest = Axios.CancelToken.source();
		async function fetchResults() {
			try {
				const response = await Axios.get(`${url}/api/v1/companies`);
				setCompanies(response.data.data.sort((a, b) => b.h1b - a.h1b));
				// localStorage.setItem('data', JSON.stringify(response.data.data));
				setTotalPages(parseInt(response.data.data.length / 10));
			} catch (e) {
				console.log('There was a problem or the request was cancelled.');
			}
		}
		fetchResults();
		return () => {
			ourRequest.cancel();
		};
	}, []);

	return (
		<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-5xl mt-3">
				<div className="px-4 sm:px-6 lg:px-8">
					<div className="sm:flex sm:items-center">
						<div className="sm:flex-auto">
							<h1 className="text-base font-semibold leading-6 text-gray-900">
								Company
							</h1>
							<p className="mt-2 text-sm text-gray-700">
								A list of all the Companies.
							</p>
						</div>
						<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
							<Link
								to="/job"
								className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								View Jobs
							</Link>
						</div>
						<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
							<Link
								to="/company/add"
								className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Add company
							</Link>
						</div>
					</div>
					<Pagination
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
						totalPages={totalPages}
					/>
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
												LOGO
											</th>
											<th
												scope="col"
												className="py-3.5 pl-3 text-left text-sm font-semibold text-gray-900"
											>
												NAME
											</th>
											<th
												scope="col"
												className="py-3.5 pl-3 text-left text-sm font-semibold text-gray-900"
											>
												H1B's
											</th>
											<th
												scope="col"
												className="relative py-3.5 pl-3 pr-4 sm:pr-0"
											>
												<span className="sr-only">Edit</span>
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200">
										{companies
											.slice(currentPage * 10, currentPage * 10 + 10)
											.map(company => (
												<tr key={company.companyId}>
													<td className="whitespace-nowrap py-4 pl-4 px-3 text-sm font-medium text-gray-900 sm:pl-0">
														<img
															className="h-20 w-20 rounded-full"
															src={company.logo}
															alt=""
														/>
													</td>
													<td className="py-4 px-3 text-sm text-gray-500">
														{company.name}
													</td>
													<td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
														{company.h1b}
													</td>
													<td className="relative whitespace-nowrap py-4 pl-5 pr-4 text-right text-sm font-medium sm:pr-0">
														<Link
															to={`/company/edit/${company.companyId}`}
															className="text-indigo-600 hover:text-indigo-900"
														>
															Edit
														</Link>
													</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
