// Get the canvas element
var ctx = document.getElementById('myChart').getContext('2d');

// Create the data array for the pie chart
var data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [{
    label: 'My Dataset',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(153, 102, 255)',
      'rgb(255, 159, 64)'
    ]
  }]
};

// Create the options object for the pie chart
var options = {
  responsive: true,
  maintainAspectRatio: false
};

// Create the pie chart using the Chart.js library
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: data,
  options: options
});

$(document).ready(function() {
  // Show the "Deadline" div and hide the "Priority" div on page load
  $('#Deadline').show();
  $('#Priority').hide();

  // Event listener for the dropdown change
  $('#filterDropdown').change(function() {
    var selectedValue = $(this).val();

    if (selectedValue === "completed") {
      $('#Deadline').hide();
      $('#Priority').show();
    } else {
      $('#Deadline').show();
      $('#Priority').hide();
    }
  });
});



