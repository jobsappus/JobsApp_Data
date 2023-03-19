import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import Select from 'react-select'

import Axios from 'axios'

import Container from './Container'
import CompanyDropDown from './companyDropDown'
import url from '../url'

import StateContext from '../StateContext'
import DispatchContext from '../DispatchContext'

export default function Example() {
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [jobTitle, setJobTitle] = useState('')
	const [jobLink, setJobLink] = useState('')
	const [jobType, setJobType] = useState('')
	const [jobDesc, setJobDesc] = useState('')
	const [companyId, setCompanyId] = useState('')
	const [domain, setDomain] = useState('')
	// console.log('CompanyId', CompanyId)
	const navigate = useNavigate()
	const appState = useContext(StateContext)
	const appDispatch = useContext(DispatchContext)

	const Domains = [
		{ label: 'Software', value: 'Software' },
		{ label: 'Data', value: 'Data' },
		{ label: 'Security', value: 'Security' },
		{ label: 'Cloud', value: 'Cloud' },
		{ label: 'Devops', value: 'Devops' }
	]

	useEffect(() => {
		if (!appState.loggedIn) {
			appDispatch({
				type: 'flashMessage',
				value: {
					message: 'You must be logged in to continue with this action',
					color: 'red'
				}
			})
			navigate('/')
			return
		}
	}, [])

	async function handleSubmit(e) {
		e.preventDefault()
		const response = await Axios.post(`${url}/api/v1/jobs`, {
			companyId: companyId,
			jobTitle: jobTitle,
			jobLink: jobLink,
			jobPostedDate: selectedDate,
			jobType: jobType,
			jobDesc: jobDesc,
			jobDomain: domain,
			token: appState.token
		})

		if (response.data.ok) {
			appDispatch({
				type: 'flashMessage',
				value: {
					message: 'Job posted successfully!!',
					color: 'green'
				}
			})
			navigate('/job')
		} else {
			appDispatch({
				type: 'flashMessage',
				value: response.data.message,
				color: 'red'
			})
		}
	}

	return (
		<>
			<Container>
				<div className="mt-10 sm:mt-0">
					<div className="md:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<div className="px-4 sm:px-0">
								<h3 className="text-base font-semibold leading-6 text-gray-900">
									Create a Job
								</h3>
								<p className="mt-1 text-sm text-gray-600">
									Please fill in the details of the job you want to
									add.
								</p>
							</div>
						</div>

						<div className="mt-5 md:col-span-2 md:mt-0">
							<form>
								<div className="overflow-hidden shadow sm:rounded-md">
									<div className="bg-white px-4 py-5 sm:p-6">
										<div className="grid grid-cols-6 gap-6">
											{/* {Job Title} */}
											<div className="col-span-6">
												<label
													htmlFor="first-name"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Job Title
												</label>
												<input
													type="text"
													name="first-name"
													id="first-name"
													autoComplete="given-name"
													value={jobTitle}
													onChange={e =>
														setJobTitle(e.target.value)
													}
													className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
											{/* {link} */}
											<div className="col-span-6">
												<label
													htmlFor="company-website"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Job link
												</label>
												<div className="mt-2 flex rounded-md shadow-sm">
													<span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
														https://
													</span>
													<input
														type="text"
														name="company-website"
														id="company-website"
														value={jobLink}
														onChange={e =>
															setJobLink(e.target.value)
														}
														className="block w-full flex-1 rounded-none rounded-r-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														placeholder=" www.example.com"
													/>
												</div>
											</div>
											{/* {" posted date"} */}
											<div className="col-span-6 sm:col-span-3">
												<label
													htmlFor="email-address"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Posted Date
												</label>
												<DatePicker
													className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													selected={selectedDate}
													onChange={date => setSelectedDate(date)}
												/>
												<input
													type="hidden"
													name="email-address"
													id="email-address"
													value={selectedDate}
													onChange={date => {
														return
													}}
													className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
											{/* {Job Type} */}
											<div className="col-span-6 sm:col-span-3">
												<label
													htmlFor="country"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Job Type
												</label>
												<select
													id="country"
													name="country"
													autoComplete="country-name"
													className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													value={jobType}
													onChange={event =>
														setJobType(event.target.value)
													}
												>
													<option>-- select --</option>
													<option value={false}>Internship</option>
													<option value={true}>Full Time</option>
												</select>
											</div>
											{/* {compnay} */}
											<div className="col-span-8 sm:col-span-4">
												<label
													htmlFor="company"
													className="block text-sm font-medium leading-6 mb-2 text-gray-900"
												>
													Company
												</label>
												<CompanyDropDown
													value={companyId}
													onChange={setCompanyId}
													isMulti={false}
												/>
											</div>
											<div className="col-span-2 sm:col-span-2 flex justify-start pt-8">
												<Link
													className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
													to="/company/add"
												>
													Add a Company
												</Link>
											</div>
											{/* {Domain} */}
											<div className="col-span-6">
												<label
													htmlFor="company"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Domains
												</label>
												<Select
													options={Domains}
													isMulti={true}
													value={domain}
													onChange={opt => setDomain(opt)}
												/>
											</div>
											{/* {Description} */}
											<div className="col-span-6">
												<label
													htmlFor="about"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Description
												</label>
												<div className="mt-2">
													<textarea
														id="about"
														name="about"
														rows={3}
														className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
														placeholder=" more about this Job..."
														value={jobDesc}
														onChange={e =>
															setJobDesc(e.target.value)
														}
													/>
												</div>
											</div>
										</div>
									</div>
									{/* {submit} */}
									<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
										<button
											type="submit"
											className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
											onClick={handleSubmit}
										>
											Save
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</Container>
		</>
	)
}
