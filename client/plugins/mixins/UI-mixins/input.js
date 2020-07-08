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
      default: 1000
    },
    icon: { 
      type: String, 
      defualt: false
    }
  },
  data () {
    return {
      errorMessages: []
    }
  },
  methods: {
    validate () {
      this.errorMessages = []
      this.checkRequired()
      this.checkMinLength()
      this.checkMaxLength()

    },
    checkRequired () {
      if (this.required) {
        this.inputValue = this.value
        if (this.inputValue === '') {
          console.log(this.value)
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
