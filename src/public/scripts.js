$(function () {
  //Get users
  $(document).ready(() => {
    $.ajax({
      url: '/user',
      success: (response) => {
        console.log(response);
        response.forEach((user) => {
          $('#sender').append(
            '<option value = ' + user.id + '>' + user.name + '</option>',
          );
          $('#receiver').append(
            '<option value = ' + user.id + '>' + user.name + '</option>',
          );
        });
      },
    });
  });

  //GET messages On-Change of Left dropdown box
  $('#sender').on('change', () => {
    $('#messages').html('  ');
    let sender = $('#sender');
    let receiver = $('#receiver');
    if (sender.val() !== receiver.val()) {
      $.ajax({
        url: '/chat',
        method: 'GET',
        data: {
          sender: parseInt(sender.val()),
          receiver: parseInt(receiver.val()),
        },
        success: function (response) {
          console.log(response);
          response.forEach((user) => {
            if (user.sender.id === parseInt(sender.val())) {
              $('#messages').append(
                '<p style="text-align:left">' + user.message + '<p>',
              );
            } else {
              $('#messages').append(
                '<p style="text-align:right">' + user.message + '<p>',
              );
            }
          });
        },
      });
    }
  });

  //GET messages On-Change of Right dropdown box
  $('#receiver').on('change', () => {
    $('#messages').html('  ');
    let sender = $('#sender');
    let receiver = $('#receiver');
    if (sender.val() !== receiver.val()) {
      $.ajax({
        url: '/chat',
        method: 'GET',
        data: {
          sender: parseInt(receiver.val()),
          receiver: parseInt(sender.val()),
        },
        success: function (response) {
          response.forEach((user) => {
            if (user.sender.id === parseInt(sender.val())) {
              $('#messages').append(
                '<p style="text-align:left">' + user.message + '<p>',
              );
            } else {
              $('#messages').append(
                '<p style="text-align:right">' + user.message + '<p>',
              );
            }
          });
        },
      });
    }
  });

  //Adding Messages by Left User
  $('#buttonS').on('click', () => {
    let sender = $('#sender');
    let receiver = $('#receiver');
    let message1 = $('#smessage');
    if (sender.val() !== receiver.val()) {
      $.ajax({
        url: '/chat',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          sender: sender.val(),
          receiver: receiver.val(),
          message: message1.val(),
        }),
        success: function (response) {
          message1.val('');
          $('#sender').change();
        },
      });
    } else {
      alert('Cannot send text to yourself');
    }
  });

  //Adding messages by Right User
  $('#buttonR').on('click', () => {
    let sender = $('#sender');
    let receiver = $('#receiver');
    let message2 = $('#rmessage');
    if (sender.val() !== receiver.val()) {
      $.ajax({
        url: '/chat',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          sender: receiver.val(),
          receiver: sender.val(),
          message: message2.val(),
        }),
        success: function (response) {
          message2.val('');
          $('#sender').change();
        },
      });
    } else {
      alert('Cannot send text to yourself');
    }
  });
});
