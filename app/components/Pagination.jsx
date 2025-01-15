"use client";
import { useState } from "react";

export default function Pagination({
	counter,
	setPageNum,
	dataLength,
	PageNum,
}) {
	let page = [];
	for (let i = 1; i <= Math.ceil(dataLength / counter); i++) {
		page.push(i);
	}

	const [cu, setCu] = useState(1);
	const [tr, setTr] = useState(3);

	const lastTr = cu * tr;
	const firstTR = lastTr - tr;

	return (
		<div className="mt-8 flex justify-center">
			<nav aria-label="Page navigation">
				<ul className="inline-flex items-center -space-x-px">
					<li
						className={`${cu == 1 && "disabled"} cursor-pointer select-none`}
						onClick={() => cu != 1 && setCu(1)}
					>
						<div className="block py-2 px-3 ml-0 leading-tight text-zinc-500 bg-white rounded-l-lg border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700">
							<span className="sr-only">First</span>
							<i className="fa-solid fa-angles-left"></i>
						</div>
					</li>
					<li
						className={`${cu == 1 && "disabled"} cursor-pointer select-none`}
						onClick={() => cu != 1 && setCu(Math.ceil(cu - 1, page.length))}
					>
						<div className="py-2 px-3 leading-tight text-zinc-500 bg-white border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700">
							<span className="sr-only">Previous</span>
							<i className="fas fa-chevron-left"></i>
						</div>
					</li>
					{page?.slice(firstTR, lastTr)?.map((e, ii) => (
						<li
							className="cursor-pointer select-none"
							onClick={() => setPageNum(e)}
							key={ii + "Length"}
						>
							<div
								className={`${
									e == PageNum && "active"
								} py-2 px-3 leading-tight text-zinc-500 bg-white border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700`}
							>
								{e < 10 && 0}
								{e}
							</div>
						</li>
					))}

					<li
						className={`${
							cu == Math.ceil(page.length / tr) && "disabled"
						} cursor-pointer select-none`}
						onClick={() =>
							cu != Math.ceil(page.length / tr) && setCu(Math.ceil(cu + 1))
						}
					>
						<div className="py-2 px-3 leading-tight text-zinc-500 bg-white border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700">
							<span className="sr-only">Next</span>
							<i className="fas fa-chevron-right"></i>
						</div>
					</li>
					<li
						className={`${
							cu == Math.ceil(page.length / tr) && "disabled"
						} cursor-pointer select-none`}
						onClick={() =>
							cu != Math.ceil(page.length / tr) &&
							setCu(Math.ceil(page.length / tr))
						}
					>
						<div className="block py-2 px-3 leading-tight text-zinc-500 bg-white rounded-r-lg border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700">
							<span className="sr-only">Last</span>
							<i className="fa-solid fa-angles-right"></i>
						</div>
					</li>
				</ul>
			</nav>
		</div>
	);
}
