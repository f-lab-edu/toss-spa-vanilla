import Home from './pages/Home';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import Slash from './pages/Slash';
import Simplicity from './pages/Simplicity';

export const navigate = (url: string) => {
	if (!url) return null;
	window.history.pushState(null, null, url);
	render();
};

export const createElement = (domString: string) => {
	const $temp = document.createElement('template');
	$temp.innerHTML = domString;
	return $temp.content;
};

const routes = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/detail/:id',
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

export const render = async () => {
	const $root = document.getElementById('root');

	const currentPath = window.location.pathname;
	const pathToRegexRouters = () => {
		return routes.map((route) => {
			const regex = new RegExp('^' + route.path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');
			return {
				route,
				result: currentPath.match(regex),
			};
		});
	};

	const getMatchedRoute = pathToRegexRouters().find((i) => i.result);
	const matchedComponent = getMatchedRoute?.route.component || NotFound;

	// dynamic router인 경우, param을 넘겨줌
	const param = getMatchedRoute?.result[1];
	$root.replaceChildren(await matchedComponent(param));
};

window.addEventListener('DOMContentLoaded', async () => {
	render();
});

window.addEventListener('popstate', () => {
	render();
});
