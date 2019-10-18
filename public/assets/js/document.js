// on submit, change the variables that correspond to a partial to true.

$('.addForm').on('click', function (event) {
  event.preventDefault();
  const docType = $(this).attr('data-docType');
  const modalTitle = $('#newDocType');
  if (docType === 'Other') {
    modalTitle.removeAttr('value');
    modalTitle.removeAttr('disabled');
  } else {
    modalTitle.attr('value', docType);
    modalTitle.attr('disabled', 'disabled');
  }
  $('#formInfo').modal('show');
});

$('.trashForm').on('click', function (event) {
  event.preventDefault();
  $('#deleteForm').modal('show');
});
