var vueRouterMap = [
	{
		path: '/zh',
		name: 'zh',
	},
	{
		path: '/en',
		name: 'en',
	},
	// router 轉址
	// 當 url path 不符合 router 表的時候，預設轉址到
	// 順序一定要最後面
	{
		path: '/*',
		redirect: '/zh',
	},
];
var indexVueRouter = new VueRouter({
	routes: vueRouterMap,
});