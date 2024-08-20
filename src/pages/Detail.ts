import logoImage from '../../public/assets/images/toss.png';
import bannerImage from '../../public/assets/images/main-banner.webp';
import lionImage from '../../public/assets/images/lion.webp';
import { navigate, createElement } from '../index';
import Navbar from '../components/Navbar';

export default function Detail() {
	const navAnchorLists = ['SLASH', 'SIMPLICITY'];
	const navButtonLists = ['구독하기', '채용 바로가기'];
	const tabLists = ['전체', '개발', '디자인'];
	const selectedTab = '전체';

	const $navbar = Navbar();
	const $detail = createElement(`
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

            <main class="detail">
                <section class="detail__article">
                    <img
                        class="detail__image"
                        src=${lionImage}
                    />
                    <h1 class="detail__title">Node.js 라이브러리 배포 파이프라인에 플러그인 시스템 도입기</h1>
                    <span class="detail__tag">#Node.js</span>
                    <span class="detail__author">장지훈 · [토스코어] Node.js Developer</span>
                    <span class="detail__date">2024년 8월 14일</span>
                    <p class="detail__content">
                        토스 노드 챕터는 다수의 라이브러리를 관리하고 있어요. 라이브러리 관리에 이토록 진지하게 접근하는 팀을 찾기는 쉽지 않죠. 2021년
                        4월, 저희 팀은 첫 모노레포를 만들었어요. 이제는 그 모노레포에만 100개가 넘는 라이브러리가 존재하죠. 현재는 이런 라이브러리
                        모노레포를 코어만 6개를 운영 하고있어요. 서버 라이브러리, 코어 전용 라이브러리, CA라이브러리 등 성격에 맞게 모아두었어요.
                        복잡해지는 deploy-cli 코어 및 계열사가 운영하는 다양한 라이브러리 레포, 모노레포 배포 파이프라인에서 공통적인 부분은 유지하면서
                        다양한 요구사항을 만족하기 위해 deploy cli에 옵션이 늘어나기 시작했어요 1 $ deploy-cli --codegen-export --validate-build-output
                        --collect-usage ... 요구사항이 생기고 이를 반영하기 위해 코드가 늘어남에 따라 deploy cli가 복잡해졌어요. 매번 옵션추가/수정 후
                        deploy cli 업데이트 & option on을 해줘야 했고 개별 레포/계열사의 요구사항을 만족하려면 공통 라이브러리를 작업해야 하는 문제가
                        있었어요.
                    </p>
                </section>
            </main>
    `);

	// Element에 이벤트 핸들러 등록
	$detail.querySelector('.nav__logo').addEventListener('click', (e) => {
		e.preventDefault();
		navigate('/');
	});

	$detail.querySelector('.nav__lists').addEventListener('click', (e) => {
		if (!e.target.closest('a') || !e.target.closest('a').href) return;
		e.preventDefault();
		navigate(e.target.closest('a').href);
	});

	return $detail;
}
