export default {
  props: {
    lable: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      required: false
    },
    required: {
      type: Boolean,
      default: false
    },
    minLength: {
      type: Number,
      default: 0
    },
    maxLength: {
      type: Number,
      default: 50
    },
    icon: { 
      type: String, 
      default: ""
    },
    type: { 
      type: String,
      default: ""
    }
  },
  data () {
    return {
      errorMessages: []
    }
  },
  methods: {
    validate (value) {
      //  میشود و برای جلو گیری از این اتفاق شرط زیر گذاشته میشود undefined هر وقت تب میزنیم مقدار ولیو مساوی 
      if (this.type != "" && value != undefined) {
        this.errorMessages = []
      }
      this.checkRequired()
      this.checkMinLength()
      this.checkMaxLength()
      if (value != undefined) {
      this.checkType(value)
    }
    },
    checkType (value) {
     if (this.type == "int" || this.type == "float") {
       console.log(value)
      if (!(isNaN(value))) {
        const numberValue = Number(value)
        if (this.type === "int") {

          if (!Number.isInteger(numberValue))  { 
            this.errorMessages.push('عدد صحیح وارد کنید')
          }
        } else if (this.type === "float" )  { 
          if (Number.isInteger(numberValue))  { 
            this.errorMessages.push('عدد اعشاری وارد کنید')
          }
        }
      } else {
          this.errorMessages.push('عدد وارد کنید')

      }
     }



      // if (this.type === "int") {
      //   //  ذخیره میشود error message در صورت عددی نبودن پیام زیر در 
      //   if (isNaN(value)) {
      //     this.errorMessages.push('مقدار این فیلد باید عددی باشد')
      //   }
      // } else if (this.type === "string") {
        //  ذخیره میشود error message در صورت استرینگ نبودن پیام زیر در 
        // if (!isNaN(value)) {
        //   this.errorMessages.push('مقدار این فیلد نباید عددی باشد')
        // }

      // } else if (this.type === "float") { 
      //   if (Number(value) && value % 1 === 0) { 
      //     this.errorMessages.push('float')
      //   }
      // }
      
    },
    checkRequired () {
      this.errorMessages = []
      if (this.required) {
        this.inputValue = this.value
        if (this.inputValue === '') {
          this.errorMessages.push('پر کردن این فیلد الزامی می باشد')
        }
      }
    },
    checkMinLength () {
      if (this.inputValue.length < this.minLength) {
        this.errorMessages.push('حداقل تعداد کاراکتر ' + this.minLength + '  ')
      }
    },
    checkMaxLength () {
      if (this.inputValue.length > this.maxLength) {
        this.errorMessages.push('maxLength')
        return true
      }
      return false
    }
  }
  
}
