import logoImage from '../../public/assets/images/toss.png';
import { createElement, navigate } from '../index';

export default function Navbar() {
	const $navbar = createElement(`
          <header>
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
						<li class="nav__li">
							<a
								class="nav__a"
								href="SLASH">
								SLASH
							</a>
						</li>
						<li class="nav__li">
							<a
								class="nav__a"
								href="simplicity">
								SIMPLICITY
							</a>
						</li>
						<li class="nav__li">
							<button class="nav__btn nav__btn--subscribe">구독하기</button>
						</li>
						<li class="nav__li">
							<button class="nav__btn nav__btn--hire">채용 바로가기</button>
						</li>
					</ul>
				</div>
			</nav>
		</header>
    `);

	// Element에 이벤트 핸들러 등록
	$navbar.querySelector('.nav__logo').addEventListener('click', (e) => {
		e.preventDefault();
		navigate('/');
	});

	$navbar.querySelector('.nav__lists').addEventListener('click', (e) => {
		if (!e.target.closest('a') || !e.target.closest('a').href) return;
		e.preventDefault();
		navigate(e.target.closest('a').href);
	});

	return $navbar;
}
