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
    required: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      errorMessages: []
    }
  }, 
  methods: { 
    minlength() {
      if ( this.dateType == 'date'){
      if (this.value.length < 10  ) {
        this.errorMessages.push('تاریخ معتبر نیست ')
      }

    }
    if (this.dateType == 'time') {
      if ( this.value.length < 5 ) { 
        this.errorMessages.push('زمان معتبر نیست ')
      }
    }
    },

    validateDate(value) {
      if (value[5] + value[6] > 12 || value[8] + value[9] > 30) {
        this.errorMessages.push('فرمت تاریخ نامعتبراست ')
      }
    },
    validateTime(value) {
      if (value.length == 5) {
        if (
          value[0] + value[1] > 24 ||
          value[0] + value[1] < 0 ||
          value[3] + value[4] > 60 ||
          value[3] + value[4] <= 0
        ) {
          this.errorMessages.push('زمان معتبر نیست')
        }
      }
    },
    dataPickerValidate () {  
      this.errorMessages = []
      this.dataPickerCheckRequired()
      this.changeValue() 
      this.minlength()
    }, 
    dataPickerCheckRequired () {
      if (this.required) {
        if (!this.value) {
          this.errorMessages.push('پر کردن این فیلد الزامی می باشد')
        }
      }
    }
  },
  watch: {
    
  }
}

