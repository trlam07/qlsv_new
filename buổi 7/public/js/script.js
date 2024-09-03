$('button.delete').click(function (e) { 
	e.preventDefault();
	var dataUrl = $(this).attr('data-url');
	alert(dataUrl);
});

const gotoPage = (page) => {
	const currentURL = window.location.href;
	const obj = new URL(currentURL);
	obj.searchParams.set('page', page);
	window.location.href = obj.href;
};

