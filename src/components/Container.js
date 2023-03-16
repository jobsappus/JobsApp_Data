// export default function Example(props) {
// 	return (
// 		<div className="container my-5 mx-auto px-4 sm:px-6 lg:px-8">
// 			{props.children}
// 		</div>
// 	)
// }

export default function Container(props) {
	return (
		<div
			className={`mx-auto my-5 max-w-7xl sm:px-6 lg:px-8 ${props.className}`}
		>
			{props.children}
		</div>
	)
}
