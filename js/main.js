'use strict';
var students = [
  {
    name: 'Cao Viet Ha',
    age: 14,
    phone: 1234567890,
    address: 'Ha Noi, Viet Nam'
  },
  {
    name: 'Nguyen Thuy Duong',
    age: 14,
    phone: 1234567890,
    address: 'Hai Phong, VN'
  }
]
var editMode = false;
var studentIdTmp;
document.addEventListener('DOMContentLoaded', function() {
    renderStudents();
    validation.init([
      {
        selector: '.name',
        name: 'name',
        type: 'text',
        min: 1,
        max: 32 
      },
      {
        selector: '.age',
        name: 'age',
        type: 'number'
      },
      {
        selector: '.phone',
        name: 'phone',
        type: 'number'
      },
      {
        selector: '.address',
        name: 'address',
        type: 'text',
        min: 1,
        max: 255
      },
      {
        selector: '.email',
        name: 'email',
        type: 'email'
      }
    ]);
  });
function renderStudents(){
    var html = '';
    var content=students.map(function(items,index){
        html += '<li class="student">'
        html += '<p><span>Name:</span>' + items.name + '</p>'
        html += '<p><span>Age:</span>' + items.age + '</p>'
        html += '<p><span>Phone:</span> ' + items.phone + '</p>'
        html += '<p><span>Addess:</span> ' + items.address + '</p>'
        html += '<i class="student-delete" onclick="onDeleteStudent(' + index + ')">X</i>'
        html += '<i class="student-edit" onclick="onEditStudent(' + index + ')">Edit</i>'
        html += '</li>'
        return html;
    });
    setHTML('#students-list',content);
}
function setHTML(selector, html) {
    var element = document.querySelector(selector);
    element.innerHTML = html.join('');
}
renderStudents();
