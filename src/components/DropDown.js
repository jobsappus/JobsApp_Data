// import React from 'react';
// import Select from 'react-select';

// const aquaticCreatures = [
// 	{ label: 'Shark', value: 'Shark' },
// 	{ label: 'Dolphin', value: 'Dolphin' },
// 	{ label: 'Whale', value: 'Whale' },
// 	{ label: 'Octopus', value: 'Octopus' },
// 	{ label: 'Crab', value: 'Crab' },
// 	{ label: 'Lobster', value: 'Lobster' },
// ];

// export default function DropDown(props) {
// 	return (
// 		<div className="App">
// 			<Select
// 				options={aquaticCreatures}
// 				onChange={opt => console.log(opt.label, opt.value)}
// 			/>
// 		</div>
// 	);
// }

import { useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Example(props) {
	const totalPages = Array.from({ length: props.totalPages }, (_, i) => i + 1);
	const [query, setQuery] = useState('');

	const filteredPages =
		query === ''
			? totalPages
			: totalPages.filter(page => {
					const pages = page.toString();
					return pages.includes(query);
			  });
	// console.log(filteredPages);

	// return <h1>dwiq</h1>;
	return (
		<Combobox
			as="div"
			value={props.currentPage + 1}
			onChange={props.setCurrentPage}
			className="w-20"
		>
			<div className="relative">
				<Combobox.Input
					className="rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
					onChange={event => setQuery(event.target.value)}
					displayValue={page => page}
				/>
				<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
					<ChevronUpDownIcon
						className="h-5 w-5 text-gray-400"
						aria-hidden="true"
					/>
				</Combobox.Button>

				{filteredPages.length > 0 && (
					<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{filteredPages.map(page => (
							<Combobox.Option
								key={page}
								value={page}
								className={({ active }) =>
									classNames(
										'relative cursor-default select-none py-2 pl-3 pr-9',
										active
											? 'bg-indigo-600 text-white'
											: 'text-gray-900'
									)
								}
							>
								{({ active, selected }) => (
									<>
										<div className="flex">
											<span
												className={classNames(
													'truncate',
													selected && 'font-semibold'
												)}
											>
												{page}
											</span>
										</div>

										{selected && (
											<span
												className={classNames(
													'absolute inset-y-0 right-0 flex items-center pr-4',
													active ? 'text-white' : 'text-indigo-600'
												)}
											>
												<CheckIcon
													className="h-5 w-5"
													aria-hidden="true"
												/>
											</span>
										)}
									</>
								)}
							</Combobox.Option>
						))}
					</Combobox.Options>
				)}
			</div>
		</Combobox>
	);
}
