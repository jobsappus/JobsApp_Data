import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import DropDown from './DropDown';

export default function Pagination(props) {
	return (
		<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
			<div>
				<p className="text-sm text-gray-700">
					Showing{' '}
					<span className="font-medium">{props.currentPage * 10 + 1}</span>{' '}
					to{' '}
					<span className="font-medium">
						{props.currentPage * 10 + 10}
					</span>{' '}
					of <span className="font-medium">{props.totalPages * 10}</span>{' '}
					results
				</p>
			</div>
			<div>
				<nav
					className="isolate inline-flex -space-x-px rounded-md shadow-sm"
					aria-label="Pagination"
				>
					<button
						className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						onClick={() =>
							props.currentPage > 0
								? props.setCurrentPage(props.currentPage - 1)
								: null
						}
						disabled={props.currentPage === 0}
					>
						<span className="sr-only">Previous</span>
						<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
					</button>
					<DropDown
						totalPages={props.totalPages}
						setCurrentPage={props.setCurrentPage}
						currentPage={props.currentPage}
					/>

					<button
						className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						onClick={() => props.setCurrentPage(props.currentPage + 1)}
					>
						<span className="sr-only">Next</span>
						<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
					</button>
				</nav>
			</div>
		</div>
	);
}
