//navbar closing
document.addEventListener('click', function(event) {
    var isClickInside = document.querySelector('.navbar').contains(event.target);
    if (!isClickInside) {
      // If the click is outside of the navbar, collapse it
      document.querySelector('.navbar-collapse').classList.remove('show');
    }
  });