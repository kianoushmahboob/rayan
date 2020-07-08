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
    id: {
        type: String
    },
    required: {
      type: Boolean, 
      default: false 
    }
  }
}
