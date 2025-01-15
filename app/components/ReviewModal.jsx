"use client";

import { useState } from "react";

export default function ReviewModal() {
	const [show, hide] = useState(false);

	return (
		<>
			{show && (
				<style>
					{`
              html {
                overflow: hidden;               
              }
            `}
				</style>
			)}
			<button
				onClick={() => hide(true)}
				className="px-4 py-2 border border-gray-900 rounded-lg hover:bg-gray-100"
			>
				Write a Review
			</button>

			{/* <!-- Review Modal - Add this right before closing body tag --> */}
			<div
				onClick={() => hide(false)}
				className={`${
					show ? "flex" : "hidden"
				} fixed inset-0 bg-black bg-opacity-50 z-50 items-center justify-center`}
			>
				<div className="bg-white rounded-2xl w-full max-w-xl mx-4 overflow-hidden">
					{/* <!-- Modal Header --> */}
					<div onClick={(e) => e.stopPropagation()} className="border-b p-4">
						<div className="flex justify-between items-center">
							<h3 className="text-xl font-semibold">Write a review</h3>
							<button
								className="text-gray-400 hover:text-gray-600"
								onClick={() => hide(false)}
							>
								<i className="fas fa-times text-xl"></i>
							</button>
						</div>
					</div>

					{/* <!-- Modal Body --> */}
					<div onClick={(e) => e.stopPropagation()} className="p-6">
						<form className="space-y-6">
							{/* <!-- Overall Rating --> */}
							<div>
								<label className="block text-gray-700 font-medium mb-2">
									Overall Rating
								</label>
								<div className="flex gap-2">
									<button
										type="button"
										className="text-2xl text-gray-300 hover:text-yellow-500 focus:text-yellow-500"
									>
										<i className="fas fa-star"></i>
									</button>
									<button
										type="button"
										className="text-2xl text-gray-300 hover:text-yellow-500 focus:text-yellow-500"
									>
										<i className="fas fa-star"></i>
									</button>
									<button
										type="button"
										className="text-2xl text-gray-300 hover:text-yellow-500 focus:text-yellow-500"
									>
										<i className="fas fa-star"></i>
									</button>
									<button
										type="button"
										className="text-2xl text-gray-300 hover:text-yellow-500 focus:text-yellow-500"
									>
										<i className="fas fa-star"></i>
									</button>
									<button
										type="button"
										className="text-2xl text-gray-300 hover:text-yellow-500 focus:text-yellow-500"
									>
										<i className="fas fa-star"></i>
									</button>
								</div>
							</div>

							{/* <!-- Review Text --> */}
							<div>
								<label className="block text-gray-700 font-medium mb-2">
									Your Review
								</label>
								<textarea
									rows="4"
									placeholder="Share your experience with other travelers..."
									className="w-full px-4 py-3 rounded-lg border focus:border-gray-500 focus:ring-0 resize-none"
								></textarea>
							</div>
						</form>
					</div>

					{/* <!-- Modal Footer --> */}
					<div
						onClick={(e) => e.stopPropagation()}
						className="border-t p-4 bg-gray-50"
					>
						<div className="flex justify-end gap-4">
							<button
								onClick={() => hide(false)}
								className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
							>
								Cancel
							</button>
							<button className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-90">
								Submit Review
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
