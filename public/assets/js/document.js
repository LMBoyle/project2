// on submit, change the variables that correspond to a partial to true.

$('.addForm').on('click', function (event) {
  event.preventDefault();
  const docType = $(this).attr('data-docType');
  const modalTitle = $('#newDocType');
  $('#extraInfo').empty();
  if (docType === 'Other') {
    modalTitle.removeAttr('value');
    modalTitle.removeAttr('disabled');
  } else {
    modalTitle.attr('value', docType);
    modalTitle.attr('disabled', 'disabled');
    input = $('<input name="docType" type="hidden" value="' + docType.toString() + '">');
    $('#docForms').append(input)
  }
  $('#formInfo').modal('show');
});

// $('.trashForm').on('click', function (event) {
//   event.preventDefault();
//   $('#deleteForm').modal('show');
// });

$('#addInput').on('click', function (event) {
  event.preventDefault();
  const extraDiv = $('#extraInfo');
  const rowDiv = $('<div class="form-row">');
  const titleDiv = $('<div class="form-group col"><input type="text" class="form-control" id="inputType" name="inputType" value="Text Here" onclick="this.select()"><small id="inputInfoHelp" class="form-text text-muted">What Kind Of Info Is This?</small>');
  const formDiv = $('<div class="form-group col"><input type="text" class="form-control" id="inputInfo" name="inputInfo" value="Text Here" onclick="this.select()"> <small id="inputInfoHelp" class="form-text text-muted">What Info Do You Want To Save?</small>');

  rowDiv.append(titleDiv).append(formDiv);
  extraDiv.append(rowDiv);
});

$('.trashForm').on('click', function (event) {
  event.preventDefault();
  const id = $(this).attr('data-docTableId');
  console.log(id);
  $.post('api/documents/' + id).then(function(data) {
    if (data === "done") {
      (location.reload());
    }
  });
});
