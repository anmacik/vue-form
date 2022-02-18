Vue.use(window.vuelidate.default)
const { required, minLength,maxLength, maxValue} = window.validators
const firstLetter_check = (value) => value.charAt(0) == 7;
Vue.component('registration',{
  template: `
  <form class="registration-form" @submit.prevent="onSubmit">
  <p class="error" v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>
  <p>Пункты помеченные * обязательны для заполнения</p>
    <p>
      <label for="surname">Фамилия*:</label>
      <input id="surname" v-model="$v.surname.$model" placeholder="Иванов" :class="status($v.surname)"/>
    </p>

    <p>
      <label for="name">Имя*:</label>
      <input id="name" v-model="$v.name.$model" placeholder="Иван"/>
    </p>

    <p>
      <label for="patronymic">Отчество:</label>
      <input id="patronymic" v-model="patronymic"   placeholder="Иванович"/>
    </p>

    <p>
      <label for="birth_date">Дата рождения*:</label>
      <input id="birth_date" type="date" v-model='$v.birth_date.$model' placeholder="01/01/1991" :class="status($v.birth_date)" />
    </p>


    <p>
      <label for="phone_number">Номер телефона*:</label>
      <input id="phone_number" v-model='$v.phone_number.$model'  placeholder="+12345678900" :class="status($v.phone_number)"/>
    </p>

    <p>
      <label for="sex">Пол:</label>
      <input id="sex" v-model="sex" placeholder="мужской"/>
    </p>

    <p>
      <label for="client_group">Группа клиентов*:</label>
      <select id="client_group" v-model='$v.client_group.$model' :class="status($v.client_group)">
        <option>VIP</option>
        <option>Проблемные</option>
        <option>ОМС</option>
      </select>
    </p>

    <p>
      <label for="doctor">Лечащий врач:</label>
      <select id="doctor" v-model="doctor">
        <option>Иванов</option>
        <option>Захаров</option>
        <option>Чернышева</option>
      </select>
    </p>

    <p>
    <input type="checkbox" v-model="no_sms" value="1"  id="checkbox_sms"/>
    <label for="checkbox_sms" >Не отправлять СМС</label>
    </p>

    <h2>Адрес:</h2>
     <p>
      <label for="index">Индекс:</label>
      <input id="index" v-model="index"  placeholder="123456"/>
    </p>

    <p>
      <label for="country">Страна:</label>
      <input id="country" v-model="country"  placeholder="Россия"/>
    </p>

    <p>
      <label for="region">Область:</label>
      <input id="region" v-model="region" placeholder="Кировская"/>
    </p>

    <p>
      <label for="city">Город*:</label>
      <input id="city" v-model="$v.city.$model" placeholder="Киров" :class="status($v.city)">
    </p>

    <p>
      <label for="street">Улица:</label>
      <input id="street" v-model="street" placeholder="Новосибирская"/>
    </p>

    <p>
      <label for="house">Дом:</label>
      <input id="house" v-model="house" placeholder="5" />
    </p>

    <h2>Паспорт:</h2>
    <p>
      <label for="document_type">Тип документа*:</label>
      <select id="document_type" v-model="$v.document_type.$model":class="status($v.document_type)" >
        <option>Паспорт</option>
        <option>Свидетельство о рождении</option>
        <option>Водительское удостоверение</option>
      </select>
    </p>

    <p>
      <label for="document_series">Серия:</label>
      <input id="document_series" v-model="document_series" placeholder="5"/>
    </p>

    <p>
      <label for="document_number">Номер:</label>
      <input id="document_number" v-model="document_number" placeholder="5"/>
    </p>

    <p>
      <label for="issued">Кем выдан:</label>
      <input id="issued" v-model="issued"  placeholder="5"/>
    </p>

    <p>
      <label for="issued_date">Дата выдачи*:</label>
      <input id="issued_date" type="date" v-model="$v.issued_date.$model" placeholder="5" :class="status($v.issued_date)">
    </p>

    <p>
      <button type="submit" value="Submit" :disabled="$v.$invalid">Зарегестрироваться</button>
    </p>
  </form> `,

  data(){
    return{
      surname: null,
      name : null,
      patronymic : null,
      birth_date : null,
      phone_number: null,
      sex: null,
      client_group: null,
      doctor: null,
      no_sms: false,
      index: null,
      country: null,
      region: null,
      city: null,
      street: null,
      house: null,
      document_type: null,
      document_series: null,
      document_number: null,
      issued: null,
      issued_date: null,
      errors:[],
    }
  },
  validations:{
    surname:{
      required,
      minLength: minLength(4)
    },
    name:{
      required,
      minLength: minLength(4)
    },
    birth_date: {
      required,
      maxValue: value => {return (new Date(value) < new Date())}
    },
    phone_number:{
      required,
      firstLetter_check,
      minLength: minLength(11),
      maxLength: maxLength(11),
    },
    client_group:{
      required
    },
    city:{
      required,
      minLength:minLength(3)
    },
    document_type:{
      required
    },
    issued_date:{
      maxValue: value => {return (new Date(value) < new Date())}
    }


  },
  methods:{
    status(validation) {
    	return {
      	error: validation.$error,
        dirty: validation.$dirty
      }
    },
    onSubmit(){
      this.errors= [];
      if (this.surname && this.name && this.birth_date && this.phone_number && this.client_group && this.city && this.document_type && this.issued_date ) {
        let addUser = {
          surname : this.surname,
          name : this.name,
          patronymic : this.patronymic,
          birth_date : this.birth_date,
          phone_number: this.phone_number,
          sex: this.sex,
          client_group: this.client_group,
          doctor: this.doctor,
          no_sms: this.no_sms,
          index: this.index,
          country: this.country,
          region: this.region,
          city: this.city,
          street: this.street,
          house: this.house,
          document_type: this.document_type,
          document_series: this.document_series,
          document_number: this.document_number,
          issued: this.issued,
          issued_date: this.issued_date
        }
        this.$emit('registration-submitted', addUser)
        Object.assign(this.$data, this.$options.data.apply(this))
      }
        else {
          if (!this.surname) this.errors.push("Необходимо ввести фамилию")
          if (!this.name) this.errors.push("Необходимо ввести имя")
          if (!this.birth_date) this.errors.push("Необходимо ввести дату рождения")
          if (!this.phone_number) this.errors.push("Необходимо ввести номер телефона")
          if (!this.client_group) this.errors.push("Необходимо выбрать группу клиентов")
          if (!this.city) this.errors.push("Необходимо ввести город")
          if (!this.document_type) this.errors.push("Необходимо ввести тип документов")
          if (!this.issued) this.errors.push("Необходимо ввести дату выдачи документа")
        }
      },
      resetData(){
        const data = initialData();
        Object.keys(data).forEach(item => {
          this[item] = data[item]
        })
      },
      showData(){
        return initialData();
      }
    }
})

Vue.component('userlist',{
  props:{
    users:{
      requiered: true
    }
  },
  template: `
    <div>
        <p v-if="!users.length">There are no users yet.</p>
        <div v-else v-for="user in users">
            <p v-for="userData in user">{{userData}}</p></li>
        </div>
    </div> `,
})

var app = new Vue({
    el: '#app',
    data:{
      users: [{
        surname: "пинчук",
        name:"дмитрий"
      }],
    },
    methods:{
      addUser(user) {
          this.users.push(user)
        }
    }
})
