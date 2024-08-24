import logoImage from '../../public/assets/images/toss.png';
import bannerImage from '../../public/assets/images/main-banner.webp';
import lionImage from '../../public/assets/images/lion.webp';
import { navigate, createElement } from '../index';
import Navbar from '../components/Navbar';

const fetchDataFromTypicode = async (url: string): Promise<object[]> => {
	try {
		const res = await fetch(url);
		if (res && res.status === 200) {
			return res.json();
		} else {
			throw new Error('fetching error');
		}
	} catch (e) {
		console.error(e);
		return [];
	}
};

export default async function Home() {
	// Array Data
	const tabLists = ['전체', '개발', '디자인'];
	const selectedTab = '전체';

	// Data fetching
	// const articles: any = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json());
	const articles: object[] = await fetchDataFromTypicode('https://jsonplaceholder.typicode.com/posts');
	const popularComments: object[] = await fetchDataFromTypicode('https://jsonplaceholder.typicode.com/comments');
	const recentComments: object[] = await fetchDataFromTypicode('https://jsonplaceholder.typicode.com/comments');
	const tags = ['Node.', 'Frontend', 'tes', 'Product Desig', 'Server', 'SLASH23', 'ttest2', 'test3', 'test4', 'test5', 'test6'];

	// replace할 Element 생성
	const $home = createElement(`
		<header class="main-header">
		</header>

		<main class="main">
			<div class="main__wrapper">
				<div class="main__banner">
					<img
						class="main__image"
						src=${bannerImage}
						alt="main-banner" />
				</div>

				<div class="main__contents">
					<section class="main__left-section">
						<!-- <div class="left-side__menu"> -->
						<ul class="tab">
							${tabLists
								.map(
									(tab) => `
							<li class="tab__item tab__item${tab === selectedTab ? '--active' : ''}">
								<span>${tab}</span>
							</li>
							`
								)
								.join('')}
						</ul>
						<!-- </div> -->
						<div class="main__left-articles">
							<ul class="main-posts">
								${articles
									.map(
										(article) =>
											`
											<li key=${article.id}>
												<article class="article">
													<div
														class="article__contents"
													>
														<span class="article__title"> ${article.title} </span>
														<span class="article__description">
															${article.body}
														</span>
														<span class="article__info"> 2024년 8월 14일 · 장지훈 </span>
													</div>
													<div class="article__image-wrapper">
														<img
															class="article__image"
															src=${lionImage}
															alt="toss" />
													</div>
												</article>
											</li>
										`
									)
									.join('')}
							</ul>
						</div>
					</section>

					<section class="main__right-section">
						<section class="popular">
							<span class="popular__span">인기있는 글</span>
							<ul>
								${popularComments
									.map(
										(comment) =>
											`
									<li key=${comment.id}>
										<article class="popular__content">
											<span class="popular__title">${comment.name}</span>
											<span class="popular__author">author</span>
										</article>
									</li>
									`
									)
									.join('')}
							</ul>
						</section>

						<section class="recent-comments">
							<span class="recent-comments__span">최근 댓글</span>
							<ul>
								${recentComments
									.map(
										(comment) =>
											`
											<li key=${comment.id}>
												<article class="article">
													<div class="article__avartar">
														<img
															class="article__avartar-image"
															src=${lionImage} />
														<span class="article__name">test test test</span>
													</div>
													<span class="article__content">test test</span>
													<span class="article__title">우리는 어떻게 해외주식 서비스 안정화를 이뤘는가</span>
												</article>
											</li>
											`
									)
									.join('')}
							</ul>
						</section>

						<section class="tags">
							<span class="tags__span">태그</span>
							<ul class="tags__lists">
								${tags
									.map(
										(tag) =>
											`
											<li key=${tag}>
												<span class="tags__name">${tag}</span>
											</li>
											`
									)
									.join('')}
							</ul>
						</section>
					</section>
				</div>
			</div>
		</main>
		
		<footer class="footer">
			<ul class="footer__lists">
				<li class="footer__li">홈페이지</li>
				<li class="footer__li">회사소개</li>
				<li class="footer__li">채용</li>
				<li class="footer__li">고객센터: 1599-4905 (24시간 연중무휴)</li>
				<li class="footer__li">㈜비바리퍼블리카 Copyright © Viva Republica, Inc. All Rights Reserved.</li>
			</ul>
    	</footer>
    `);
	const $mainHeader = $home.querySelector('.main-header');
	const $navbar = Navbar();
	$mainHeader.append($navbar);

	// DOM 이벤트 핸들러 등록
	$home.querySelector('.main-posts').addEventListener('click', (e) => {
		e.preventDefault();
		try {
			const postId = e.target?.closest('li')?.getAttribute('key');
			if (!postId) throw new Error('메인 글의 postId를 찾을 수 없습니다.');
			navigate(`/detail/${postId}`);
		} catch (e) {
			console.error(e);
		}
	});

	return $home;
}
