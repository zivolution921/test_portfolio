//form request using ajax
//make a result page example:
//<div class="tour" data-daily-price="357">
  <h2>Paris, France Tour</h2>
  <p>$<span id="total">2,499</span> for <span id="nights-count">7</span> Nights</p>
  <form action="/book" method="POST">
    <p>
      <label for="nights">Number of Nights</label>
    </p>
    <p>
      <input type="number" name="nights" id="nights" value="7">
    </p>
    <input type="submit" value="book">
  </form>
//</div>

$('form').on('submit', function(event) {
	event.preventDefault();
	var form = $(this);
	$.ajax('/book', {
		type: 'POST',
		data: { form.serialize(),
		success: function(result) { 
				form.remove();
				$('#vacation').hide().html(result).fadeIn();
		 }
		}
	});
});

//JSON
$('form').on('submit', function(e) { 
event.preventDefault();
var form = $(this);
$.ajax($('form').attr('action'), {
	type: 'POST',
	contentType: 'application/json',
	dataType: 'json',
	data: form.serialize(),
	success: function(result) {
		form.remove();
		var msg = $("<p></p>");
		msg.append("Destination: " + result.location + ". ");
		msg.append("Price: " + result.totalPrice + ". ");
		msg.append("Nights: " + result.nights + ". ");
		msg.append("Confirmation: " + result.confirmation + ". ");
		$('#vacation').hide().html(msg).fadeIn();
		}
	});
}) ;

//Transforming from JSON to HTML

{
	name: 'JFK - New York, NY',
	status: 'Departing Location'
}
{
	name: 'DEN -Denver, CO',
	status: 'Connecting Flight'
}
{
	name: 'SFO - San Franscisco, CA',
	status: 'Destination Location'
}

$('.update-flight0status').on('click', function() {
	$.getJSON('/status', function(result) {
		var statusElement = $.map(result, function(status, i) {
			var listItem = $('<li></li>');
			$('<h3>'+status.name+'</h3>').appendTo(listItem);
			$('<p>'+status+'</p>').appendTo(listItem);
			return listItem;
		});
		$('status-list').detach()
										.html(statusElement)
										.appendTo('.status');
	});
});
//using map and array and JSON

$('.update-available-flights').on('click', function() {
  $.getJSON('/flights/late', function(result) {
    var flightElements = $.map(result, function(flightItem, index){
      return $('<li>'+flightItem.flightNumber+'-'+flightItem.time+'</li>');
    });
    $('.flight-times').html(flightElements);
  });
});

//using detach

$('.update-available-flights').on('click', function() {
  $.getJSON('/flights/late', function(result) {
    var flightElements = $.map(result, function(flightItem, index){
      var flightEl = $('<li>'+flightItem.flightNumber+'-'+flightItem.time+'</li>');
      return flightEl;
    });
    $('.flight-times').detach()
                      .html(flightElements)
                      .appendTo($('.flights'));
  });
});


	