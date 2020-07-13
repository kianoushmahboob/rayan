<template>
  <div>
    <v-container fluid="fluid">
      <v-row class="card mx-2 mt-5">
        <v-col cols="12" class="cardBody p-0">
          <Checkbox type="checkbox" class="cardCheckbox" />

          <v-row class="mx-0 mt-3">
            <v-col cols="12" md="4" class="p-0 cardBox">
              <v-col cols="12" class="cardTitle pb-0">
                <h2>عنوان پروژه</h2>
              </v-col>
              <v-col cols="12" class="py-0">
                <p class="mb-0 font-10 cardCodeProject">45024785</p>
              </v-col>
              <v-col cols="12" class="pt-0">
                <p
                  class="mb-0 mr-3 font-10"
                >لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
              </v-col>
            </v-col>
            <v-col cols="12" md="2" class="p-0 cardBox">
              <v-col cols="12" class="display-flex pt-2 pb-1">
                <p class="mb-0 font-10 w-100">
                  <span>تاریخ ثبت:</span>
                  <span class="ltr">12/4/1399</span>
                </p>
              </v-col>

              <v-col cols="12" class="display-flex py-1">
                <p class="mb-0 font-10 w-100">
                  <span>تاریخ اتمام:</span>
                  <span class="rtl">12/5/1399</span>
                </p>
              </v-col>

              <v-col cols="12" class="display-flex py-0">
                <Checkbox class="p-0 mt-0 w-auto" />
                <p class="mb-0 mt-2 font-10 w-100 mr-1">فعال</p>
              </v-col>

              <v-col cols="12" class="display-flex py-0">
                <Checkbox class="p-0 mt-0 mr-0 w-auto" />
                <p class="mb-0 font-10 w-100 mt-2 mr-1">نوع پروژه</p>
              </v-col>
            </v-col>
            <v-col cols="12" md="2" class="p-0 cardBox pr-2">
              <v-row>
                <v-col cols="8" class="p-0">
                  <v-col cols="12" class="display-flex py-1">
                    <img src="/user.png" class="cardIcon" />
                    <p class="mb-0 mt-1 font-10 w-100 mr-1">کیانوش محبوب</p>
                  </v-col>

                  <v-col cols="12" class="display-flex py-1">
                    <img src="/mobile.png" class="cardIcon" />
                    <p class="mb-0 mt-1 font-10 w-100 mr-1">03134599856</p>
                  </v-col>
                  <v-col cols="12" class="display-flex py-1">
                    <img src="/mobile.png" class="cardIcon" />
                    <p class="mb-0 mt-1 font-10 w-100 mr-1">03134599856</p>
                  </v-col>

                  <v-col cols="12" class="display-flex py-1">
                    <img src="/phone.png" class="cardIcon" />
                    <p class="mb-0 font-10 w-100 mt-1 mr-1">98-9134437885</p>
                  </v-col>

                  <v-col cols="12" class="display-flex py-1">
                    <img src="/phone.png" class="cardIcon" />
                    <p class="mb-0 font-10 w-100 mt-1 mr-1">98-9149857888</p>
                  </v-col>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="3" class="p-0 cardBox pr-2">
              <v-row>
                <v-col cols="8" class="p-0">
                  <v-col cols="12" class="display-flex py-1">
                    <p class="mb-0 mt-1 font-10 w-100 mr-1">
                      <span>بازاریاب:</span>
                      <span>امیر حسین خواجه ای</span>
                    </p>
                  </v-col>

                  <v-col cols="12" class="display-flex py-1">
                    <p class="mb-0 mt-1 font-10 w-100 mr-1">
                      <span>مرحله:</span>
                      <span>در حال بازاریابی</span>
                    </p>
                  </v-col>

                  <v-col cols="12" class="display-flex py-1">
                    <p class="mb-0 font-10 w-100 mt-1 mr-1">
                      <span>اولویت:</span>
                      <span>فروش</span>
                    </p>
                  </v-col>

                  <v-col cols="12" class="display-flex py-1">
                    <p class="mb-0 font-10 w-100 mr-1 bg-status">
                      <span>وضعیت:</span>
                      <span>باز</span>
                    </p>
                  </v-col>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" md="1" class="p-0 cardBox lastCardBox pr-2 no-border">
              <v-row>
                <v-col cols="12" class="display-flex py-1">
                  <img src="/test.jpg" class="cardCustomerImg" />
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-col cols="12" class="text-center py-0">
            <img src="/more.png" @click="showAllActivities = !showAllActivities">
          </v-col>
          <div v-show="showAllActivities">
            <v-row class="cardGrid">
              <Checkbox type="checkbox" class="ActivityCheckbox" />
              <v-col cols="12" md="2" class="p-0 ActivitycardBox">
                <v-col cols="12" class="cardTitle pb-0">
                  <h3>
                    <span>نوع فعالیت</span>
                    <span class="ActivityID">(45024785)</span>
                  </h3>
                </v-col>
              </v-col>

              <v-col cols="12" md="10" class="p-0 ActivitycardBox no-border">
                <v-col cols="12" class="display-flex py-1">
                  <p class="mb-0 pr-1 font-10 w-100 text-center">
                    <span>تاریخ ثبت:</span>
                    <span>12/4/1399 - 16:40:23</span>
                  </p>

                  <p class="mb-0 pr-1 font-10 w-100 text-center">
                    <span>تاریخ یادآوری:</span>
                    <span>12/5/1399</span>
                  </p>
                  <p class="mb-0 font-10 w-100 text-center ActivitycardBoxStatus">
                    <span>وضعیت:</span>
                    <span>معلق</span>
                  </p>
                  <p class="mb-0 font-10 w-100 mt-0 text-center">
                    <span>کاربر:</span>
                    کیانوش محبوب
                  </p>
                </v-col>
              </v-col>

              <v-col cols="12" class="py-2">
                <v-row class="ActivityText ">
                  <v-col cols="6" class="activityBoxText">
                    
                    <p>  متن اولیه : لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد</p>
                  </v-col>
                  <v-col cols="6" class="activityBoxText">
                
                    <p>متن نتیجه: لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import "../../assets/sass/components/UI/Card.scss";
export default {
  data() {
    return {
      showAllActivities: false,
      // vuetify table
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ]
    };
  }
  //   methods : {
  //       showAllActivities () {
  //           document
  //       }
  //   }
};
</script>