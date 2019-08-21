const MIN_LENGTH = 1;
const MAX_LENGTH = 255;

let validationFields = []; 
const validation={
    init: function(arr){
        validationFields=arr;
        this.generate();
    },
    generate: function(){
        for (const field of validationFields) {
            const fieldElement = this.getElement(field.selector);
            fieldElement.onfocus=function(){
                this.classList.remove('error');
            }
        }
    },
    getElement: function(selector) {
        const element = document.querySelector(selector);
        return element;
      }
}