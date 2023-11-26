function init() {
    datePlaceholderSwitch();
    console.log("Funktion gecallt.")
}


function datePlaceholderSwitch() {
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.addEventListener('focus', function() {
          this.type = 'text';
        });
      
        input.addEventListener('blur', function() {
          if (this.value.match(/^\d{4}-\d{2}-\d{2}$/) || this.value === '') {
            this.type = 'date';
          }
        });
      });
      console.log("Funktion ausgeführt")
}