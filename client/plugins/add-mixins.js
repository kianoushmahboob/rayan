import Vue from 'vue'

import setDocumentTitle from './mixins/global-mixins/setDocumentTitle'
import isAuthenticated from './mixins/global-mixins/isAuthenticated'
import isUser from './mixins/global-mixins/isUser'
import toasted from './mixins/global-mixins/toasted'
import CurrentDate from './mixins/global-mixins/date'
import setImageUrl from './mixins/global-mixins/setImageUrl'
import getImageProfilePath from './mixins/global-mixins/getImageProfilePath'
import FormData from './mixins/global-mixins/FormData'

Vue.mixin(setDocumentTitle)
Vue.mixin(isAuthenticated)
Vue.mixin(isUser)
Vue.mixin(toasted)
Vue.mixin(CurrentDate)
Vue.mixin(setImageUrl)
Vue.mixin(getImageProfilePath)
Vue.mixin(FormData)






