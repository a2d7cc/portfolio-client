import React, { FC } from 'react'

interface ISubHeading {
	title: string
	classname?: string
}

const SubHeading: FC<ISubHeading> = ({ title, classname }) => {
	return (
		<h2
			className={`text-white text-opacity-80 font-semibold ${
				classname?.includes('xl') ? '' : 'text-3xl'
			} ${classname}`}
		>
			{title}
		</h2>
	)
}

export default SubHeading
