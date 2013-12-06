/* Make something awesome! */

$(function() {

	$.getJSON( "names2.json", function( data ) {
	  var items = [];
	  $.each( data, function( key, val ) {
		var c = "";
		switch (val.type) {
		  case 'person' : c = 'badge-primary'; break;
		  case 'group'  : c = 'badge-warning'; break;
		  case 'filter' : c = 'badge-success'; break;
		}
		items.push("<a href='#' class='list-group-item " + val.type + "'><span class='badge " + c + "'>&nbsp;&nbsp;</span>" + val.name + "</a>");
	  });
	  $(items.join("")).appendTo(".allnameslist");
	});




	$('#appsearch a, #allapps a, #template a').click(function (e){
		e.preventDefault();
		$(this).tab('show');
	});
	
	$('body').on('click', '#allapps ul.allnameslist a.list-group-item', function (e){
		e.preventDefault();
		$(this).toggleClass('active');
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
		if($(this).hasClass('btnFilter')){
			$('#groupPane').css({'display':'none'});
			$('#filterPane').css({'display':'block'});
		}
		if($(this).hasClass('btnGroup')){
			$('#groupPane').css({'display':'block'});
			$('#filterPane').css({'display':'none'});
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

	$('#entitySearchInput').tagsinput({
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
	$('#entitySearchInput').tagsinput('input').typeahead({
	  valueKey: 'name',
	  prefetch: 'names2.json'
	}).bind('typeahead:selected', $.proxy(function (obj, datum) {  
	  this.tagsinput('add', datum);
	  this.tagsinput('input').typeahead('setQuery', '');
	}, $('#entitySearchInput')));
	
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

	$(document.body).on('click', '#appsearch .bootstrap-tagsinput .tag', function(e){
		e.preventDefault();
		$('#rightsPanel-ta').addClass('on').find('td').removeClass('active');
		$('#selectedAppName-ta').text($(this).text());
	});
	
	function disableMode(){
		$('.sg .btn:not(.active)').addClass('disabled');
	}
});



