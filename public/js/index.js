// var switch_check = document.querySelector(".switch");
// const checkbox = document.querySelector(".Mycheckbox");

// checkbox.addEventListener('change', (event) => {
//   if (event.currentTarget.checked) {
//     alert('checked');
//   } else {
//     document.querySelector(".theme-dark").classList.add('theme-light');
//     //light theme
//   }
// })

$('.Mycheckbox').change(function(){
    if($(this).is(":checked")) {
        $('.theme-light').removeClass('theme-light').addClass('theme-dark');
    } else {
        $('.theme-dark').removeClass('theme-dark').addClass('theme-light');
    }
});
