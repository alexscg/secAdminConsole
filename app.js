/* Make something awesome! */

$(function() {
	$('#appsearch a, #allapps a, #template a').click(function (e){
		e.preventDefault();
		$(this).tab('show');
	});
	
	$('#allapps ul.allappslist a.list-group-item').click(function (e){
		e.preventDefault();
		$(this).toggleClass('active');
		$('#rightsPanel').addClass('on').find('td').removeClass('active');
		$('#selectedAppName').text($(this).text());
	});
	
	$('#rightsPanel tr td, #rightsPanel-ta tr td').click(function (e){
		$(this).toggleClass('active');
		if($('.sg .btn.disabled').size() == 0) disableMode();
	});

	$('.sg .btn').click(function (e){
		e.preventDefault();
		if($(this).hasClass('active')) return;
		$(this).siblings('.btn').removeClass('active');
		$(this).toggleClass('active');
		if($(this).hasClass('btnGroup')){
			$('#currEditing span').html("Group Mode");
		}
		if($(this).hasClass('btnSingle') && $(this).hasClass('active')){
			$('#currEditing span').html("&nbsp;");
		}
	});

	
	
	//http://timschlechter.github.io/bootstrap-tagsinput/examples/bootstrap3/
	$('#searchUsers').tagsinput({
	  tagClass: function(item) {
		switch (item.type) {
		  case 'person'   : return 'label label-primary';
		  case 'group'  : return 'label label-warning';
		  case 'filter'  : return 'label label-success';
		}
	  },
	  itemValue: 'value',
	  itemText: 'name'
	});
	$('#searchUsers').tagsinput('input').typeahead({
	  valueKey: 'name',
	  prefetch: 'names2.json'
	}).bind('typeahead:selected', $.proxy(function (obj, datum) {  
	  this.tagsinput('add', datum);
	  this.tagsinput('input').typeahead('setQuery', '');
	}, $('#searchUsers')));

	$('#appsearchInput').tagsinput({
	  tagClass: function(item) {
		switch (item.type) {
		  case 'application'   : return 'label label-warning';
		  case 'process'  : return 'label label-default';
		}
	  },
	  itemValue: 'value',
	  itemText: 'name'
	});
	$('#appsearchInput').tagsinput('input').typeahead({
	  valueKey: 'name',
	  prefetch: 'apps2.json'
	}).bind('typeahead:selected', $.proxy(function (obj, datum) {  
	  this.tagsinput('add', datum);
	  this.tagsinput('input').typeahead('setQuery', '');
	}, $('#appsearchInput')));
	
	$('#templateSearch').tagsinput({
	  tagClass: function(item) {
		switch (item.type) {
		  case 'person'   : return 'label label-primary';
		  case 'group'  : return 'label label-warning';
		  case 'filter'  : return 'label label-success';
		}
	  },
	  itemValue: 'value',
	  itemText: 'name'
	});
	$('#templateSearch').tagsinput('input').typeahead({
	  valueKey: 'name',
	  prefetch: 'names2.json'
	}).bind('typeahead:selected', $.proxy(function (obj, datum) {  
	  this.tagsinput('add', datum);
	  this.tagsinput('input').typeahead('setQuery', '');
	}, $('#templateSearch')));

	$(document.body).on('click', '#firstTA .bootstrap-tagsinput .tag', function(e){
		e.preventDefault();
		$('#currEditing span').text($(this).text());
		if(!$('.btnSingle').hasClass('active')) $('.btnSingle').click();
	});

	$(document.body).on('click', '#appsearch .bootstrap-tagsinput .tag', function(e){
		e.preventDefault();
		$('#rightsPanel-ta').addClass('on').find('td').removeClass('active');
		$('#selectedAppName-ta').text($(this).text());
	});
	
	function disableMode(){
		$('.sg .btn:not(.active)').addClass('disabled');
	}
});



