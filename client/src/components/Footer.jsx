import logo from '../../images/logo.png';

const Footer = () => {
	return (
		<footer>
			<div className="w-full mf:justify-center justify between items-center flex-col p-4 gradient-bg-footer">
				<div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
					<div className="flex flex-[0.5] justify-center items-center">
						<img src={logo} alt="logo" className="w-32" />
					</div>
					<div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
						{["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
							<a
								key={item + index}
								href={`/${item}`}
								className="
									text-white text-base text-center mx-2 cursor-pointer 
									hover:underline hover:decoration-solid hover:decoration-1
								">
								{item}
							</a>
						))}
					</div>
				</div>
				<div className="flex justify-center items-center flex-col mt-10">
					<p className="text-white text-sm text-center">
						Come join us
					</p>
					<p className="text-white text-sm text-center">
						<a
							href="mailto:sergeyweb87@gmail.com"
							className="hover:underline hover:decoration-solid hover:decoration-1"
						>
							sergeyweb87@gmail.com
						</a>
					</p>
				</div>
				<div className="sm:w-[90%] sm:mx-auto w-full h-[0.25px] bg-gray-400 mt-5" />
				<div className="sm:w-[90%] sm:mx-auto flex justify-between items-center mt-3">
					<p className="text-white text-sm text-center">
						&copy; Krypto Management 2022
					</p>
					<p className="text-white text-sm text-center">
						All Rights Reserved
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
