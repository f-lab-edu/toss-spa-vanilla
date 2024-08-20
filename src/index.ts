import Home from './pages/Home';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import Slash from './pages/Slash';
import Simplicity from './pages/Simplicity';

export const navigate = (url: string) => {
	window.history.pushState(null, null, url);
	render();
};

export const createElement = (domString: string) => {
	const $temp = document.createElement('template');
	$temp.innerHTML = domString;
	return $temp.content;
};

export const render = async () => {
	const $root = document.getElementById('root');
	const routes = [
		{
			path: '/',
			component: Home,
		},
		{
			path: '/detail',
			component: Detail,
		},
		{
			path: '/slash',
			component: Slash,
		},
		{
			path: '/simplicity',
			component: Simplicity,
		},
	];
	const path = window.location.pathname;
	console.log('🚀 ~ render ~ path:', path);
	const component = routes.find((route) => route.path === path)?.component || NotFound;

	$root.replaceChildren(await component());
};

window.addEventListener('DOMContentLoaded', async () => {
	render();
});

window.addEventListener('popstate', () => {
	render();
});
