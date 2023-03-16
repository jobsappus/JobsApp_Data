import { Fragment, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/24/outline'

import Container from './Container'

export default function Home() {
	const [open, setOpen] = useState(true)

	const cancelButtonRef = useRef(null)

	return (
		<Container className="my-20">
			<div className="flex h-full justify-center py-12 sm:px-6 lg:px-8">
				<div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
					<div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
						<Link
							to="/job"
							className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
						>
							View Jobs
						</Link>
						<Link
							to="/company"
							className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
						>
							View Companies
						</Link>
					</div>
				</div>
			</div>
		</Container>
	)
}
