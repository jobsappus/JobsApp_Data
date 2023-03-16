import { Fragment, useState, useEffect, useContext } from 'react'
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'

import DispatchContext from '../DispatchContext'

export default function FlashMessages({ messages }) {
	const [show, setShow] = useState(false)
	const [currentMessage, setCurrentMessage] = useState('')
	const dispatch = useContext(DispatchContext)

	useEffect(() => {
		setTimeout(() => {
			setShow(false)
		}, 3000)
	})

	useEffect(() => {
		// Show the first message from the queue, and remove it from the queue
		if (messages.length > 1) {
			setCurrentMessage(messages[messages.length - 1])
			dispatch({ type: 'removeFlashMessage' })
			setShow(true)
		}
	}, [messages, dispatch])
	// console.log('messages', messages, 'currentMessage', currentMessage)
	return (
		<>
			<div
				aria-live="assertive"
				className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
			>
				<div
					className={`w-full max-w-md rounded-lg shadow-lg pointer-events-auto`}
					style={{ backgroundColor: currentMessage.color }}
				>
					<Transition
						show={show}
						enter="transform ease-out duration-300 transition"
						enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
						enterTo="translate-y-0 opacity-100 sm:translate-x-0"
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="rounded-lg shadow-xs overflow-hidden">
							<div className="p-4">
								<div className="flex items-center">
									<div className="w-0 flex-1">
										<p className="text-sm font-medium text-white">
											{currentMessage.message}
										</p>
									</div>
									<div className="ml-4 flex-shrink-0 flex">
										<button
											className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
											onClick={() => setShow(false)}
										>
											<XMarkIcon className="h-5 w-5 text-white" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</>
	)
}
