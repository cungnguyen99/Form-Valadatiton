'use strict';
// var students = [
//   {
//     name: 'Cao Viet Ha',
//     age: 14,
//     email: 'abc@gmail.com',
//     phone: 1234567890,
//     address: 'Ha Noi, Viet Nam'
//   },
//   {
//     name: 'Nguyen Thuy Duong',
//     age: 14,
//     email: 'bcd@gmail.com',
//     phone: 1234567890,
//     address: 'Hai Phong, VN'
//   }
// ]
var editMode = false;
var studentIdTmp;
// localStorage.setItem('listStudents',JSON.stringify(students));
var nameData='listStudents';

var dataStudent=localStorage.getItem(nameData);

var listStudent;

if(dataStudent){
  listStudent=JSON.parse(dataStudent)
}else{
  listStudent=[];
}
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
function enableEditMode() {
    editMode = true;
}
  
function disableEditMode() {
    editMode = false;
}
  
function isEditMode() {
    return editMode == true;
}

function submitClickHandle() {

    if (!validation.noError()) return;
  
    if (isEditMode()) {
  
      editStudentHandle();
  
    } else {
      var student = getStudentInfoFromInputs();

      addStudent(student)

      renderStudents()
  
      studentFormReset()
    }
  }
function renderStudents(){
    var content=listStudent.map(function(items,index){
        var html = '';
        html += '<li class="student">'
        html += '<p><span>Name:</span>' + items.name + '</p>'
        html += '<p><span>Age:</span>' + items.age + '</p>'
        html += '<p><span>Phone:</span> ' + items.phone + '</p>'
        html += '<p><span>Email:</span> ' + items.email + '</p>'
        html += '<p><span>Addess:</span> ' + items.address + '</p>'
        html += '<i class="student-delete" onclick="onDeleteStudent(' + index + ')">X</i>'
        html += '<i class="student-edit" onclick="onEditStudent(' + index + ')">Edit</i>'
        html += '</li>'
        return html;
    });
    //do trong map ta đã khai báo html là 1 chuỗi nên content k phải là một mảng nữa nên k cần chấm join()
    setHTML('#students-list',content);
}

function getStudentInfoFromInputs() {
  var name = getInputValue('.student-form .name')
  var age = getInputValue('.student-form .age')
  var phone = getInputValue('.student-form .phone')
  var email = getInputValue('.student-form .email')
  var address = getInputValue('.student-form .address')
  return {
    name: name,
    age: age,
    phone: phone,
    email: email,
    address: address
  }
}

function getInputValue(selector) {
  var inputElement = document.querySelector(selector)
  return inputElement.value
}

function studentFormReset() {
  setInputValue('.student-form .name', '');
  setInputValue('.student-form .age', '');
  setInputValue('.student-form .phone', '');
  setInputValue('.student-form .email', '');
  setInputValue('.student-form .address', '');
}

function setInputValue(selector, value) {
  var element = document.querySelector(selector);
  element.value = value;
}
function onEditStudent(index) {

  studentIdTmp = index;

  var student = getStudent(index)

  setInputValue('.student-form .name', student.name);
  setInputValue('.student-form .age', student.age);
  setInputValue('.student-form .phone', student.phone);
  setInputValue('.student-form .email', student.email);
  setInputValue('.student-form .address', student.address);

  validation.checkAllError();

  enableEditMode();

  setHTML('.createStudent', 'Save');
}

function getStudent(index) {
  return listStudent[index];
}

function editStudentHandle() {
  var student = getStudentInfoFromInputs();

  editStudent(studentIdTmp, student)

  renderStudents()

  disableEditMode()

  setHTML('.createStudent', 'Create')
  
  localStorage.setItem('listStudents',JSON.stringify(listStudent))

  studentFormReset()
}

function editStudent(index, student) {
  listStudent[index] = student;
}

function setHTML(selector, html) {
    var element = document.querySelector(selector);
    element.innerHTML = html;
}

function addStudent(student) {
  listStudent.push(student)
  localStorage.setItem('listStudents',JSON.stringify(listStudent));
}

function studentDelete(index) {
  listStudent.splice(index, 1)
}

function onDeleteStudent(index) {
  if (confirm('Are you sure???')) {
    studentDelete(index)
    renderStudents()
  }
  localStorage.setItem('listStudents',JSON.stringify(listStudent))
}