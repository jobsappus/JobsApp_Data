import { useState, useEffect } from 'react'
import Select from 'react-select'

import Axios from 'axios'
import url from '../url'

function App(props) {
	const [companies, setCompanies] = useState([])

	useEffect(() => {
		async function fetchData() {
			const response = await Axios.get(`${url}/api/v1/companies`)
			const companies = response.data.data.map(company => {
				return { label: company.name, value: company.companyId }
			})
			setCompanies(companies)
		}
		fetchData()
	}, [])

	return (
		<div>
			<Select
				options={companies}
				value={props.companyId}
				onChange={opt => {
					return props.onChange(opt.value)
				}}
			/>
		</div>
	)
}

export default App
