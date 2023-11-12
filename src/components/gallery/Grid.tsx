import React from 'react';

const Grid = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="grid lg:grid-cols-5 sm:grid-cols-3 auto-rows-fr md:gap-6 gap-3 md:px-11 px-3 py-6 grid-cols-2">
			{children}
		</div>
	);
};

export default Grid;
