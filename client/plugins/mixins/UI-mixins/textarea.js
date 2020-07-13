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
        type: String,
        default: '0'
      },
      maxLength: {
        type: String,
        default: '5'
      }
    },
    data () {
      return {
        errorMessages: []
      }
    },
    methods: {
      // انجام عملیات کلی ولیدیت کردن
      validate () { 
        this.errorMessages = []
        this.checkRequired()
        this.checkMinLength()
        this.checkMaxLength()
  
      },
      //  فیلدها required چک کردن 
      checkRequired () {
        if (this.required) {
          if (this.TextareaValue === '') {
            this.errorMessages.push('پر کردن این فیلد الزامی می باشد')
          }
        }
      },
    // چک کردن حداقل تعداد کاراکتر 
      checkMinLength () {
        if (this.TextareaValue.length < this.minLength) {
          this.errorMessages.push('minLength')
        }
      },
      // چک کردن حداکثر تعداد کاراکتر 
      checkMaxLength () {
        if (this.TextareaValue.length > this.maxLength) {
          this.errorMessages.push('maxLength')
          return true
        }
        return false
      }
    }
  }
  