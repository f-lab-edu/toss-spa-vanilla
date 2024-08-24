import logoImage from '../../public/assets/images/toss.png';
import { createElement, navigate } from '../index';

export default function Navbar() {
	const navAnchorLists = ['SLASH', 'SIMPLICITY'];
	const navButtonLists = ['구독하기', '채용 바로가기'];
	const $navbar = createElement(`
			<nav class="nav">
				<div
					class="nav__logo-wrapper"
				>
					<img
						draggable="false"
						class="nav__logo"
						src=${logoImage}
						alt="toss-main-logo" 
                        crossorigin/>
				</div>

				<div class="nav__menu">
					<ul class="nav__lists">
					    ${navAnchorLists
							.map(
								(text) =>
									`
								<li class="nav__li">
									<a
										class="nav__a"
										href=${text.toLowerCase()}>
										${text}
									</a>
								</li>
							`
							)
							.join('')}
							
					    ${navButtonLists
							.map(
								(text) =>
									`
										<li class="nav__li">
											<button class="nav__btn nav__btn${text === '구독하기' ? '--subscribe' : '--hire'}">${text}</button>
										</li>
									`
							)
							.join('')}
					
					</ul>
				</div>
			</nav>
			`);

	// Element에 이벤트 핸들러 등록
	$navbar.querySelector('.nav__logo').addEventListener('click', (e) => {
		e.preventDefault();
		navigate('/');
	});

	$navbar.querySelector('.nav__lists').addEventListener('click', (e) => {
		try {
			const navInfo = e.target?.closest('a');
			const navInfoHref = navInfo?.href;
			if (!navInfo || !navInfoHref) throw new Error('navigation을 참조할 수 없습니다.');
			navigate(`${navInfoHref}`);
		} catch (e) {
			console.error(e);
		}
	});

	return $navbar;
}
