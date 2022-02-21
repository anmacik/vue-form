Vue.use(window.vuelidate.default)
const { required, minLength,maxLength, maxValue} = window.validators
const firstLetter_check = (value) => value?.charAt(0) == 7;


Vue.component('registration',{
  template: `
  <form class="registration-form" @submit.prevent="onSubmit">

  <p>Пункты помеченные * обязательны для заполнения</p>
      <label for="surname">Фамилия*:</label>
      <input id="surname" v-model="$v.surname.$model" placeholder="Иванов" :class="status($v.surname)"></input>

      <label for="name">Имя*:</label>
      <input id="name" v-model="$v.name.$model" placeholder="Иван"></input>

      <label for="patronymic">Отчество:</label>
      <input id="patronymic" v-model="$data.patronymic" placeholder="Иванович"></input>

      <label for="birth_date">Дата рождения*:</label>
      <input id="birth_date" type="date" v-model='$v.birth_date.$model' :class="status($v.birth_date)" ></input>

      <label for="phone_number">Номер телефона*:</label>
      <input id="phone_number" v-model='$v.phone_number.$model'  placeholder="+12345678900" :class="status($v.phone_number)"></input>

      <label for="sex">Пол:</label>
      <input id="sex" v-model="$data.sex" placeholder="мужской"></input>

      <label for="client_group">Группа клиентов*:</label>
      <select id="client_group" v-model='$v.client_group.$model' :class="status($v.client_group)">
        <option>VIP</option>
        <option>Проблемные</option>
        <option>ОМС</option>
      </select>

      <label for="doctor">Лечащий врач:</label>
      <select id="doctor" v-model="$data.doctor">
        <option>Иванов</option>
        <option>Захаров</option>
        <option>Чернышева</option>
      </select>

    <h2>Адрес:</h2>
      <label for="index">Индекс:</label>
      <input id="index" v-model="$data.index"  placeholder="123456"></input>

      <label for="country">Страна:</label>
      <input id="country" v-model="$data.country"  placeholder="Россия"></input>

      <label for="region">Область:</label>
      <input id="region" v-model="$data.region" placeholder="Кировская"></input>

      <label for="city">Город*:</label>
      <input id="city" v-model="$v.city.$model" placeholder="Киров" :class="status($v.city)"></input>

      <label for="street">Улица:</label>
      <input id="street" v-model="$data.street" placeholder="Новосибирская"></input>

      <label for="house">Дом:</label>
      <input id="house" v-model="$data.house" placeholder="5"></input>

    <h2>Паспорт:</h2>
      <label for="document_type">Тип документа*:</label>
      <select id="document_type" v-model="$v.document_type.$model":class="status($v.document_type)" >
        <option>Паспорт</option>
        <option>Свидетельство о рождении</option>
        <option>Водительское удостоверение</option>
      </select>

      <label for="document_series">Серия:</label>
      <input id="document_series" v-model="$data.document_series" placeholder="5"></input>

      <label for="document_number">Номер:</label>
      <input id="document_number" v-model="$data.document_number" placeholder="5"></input>

      <label for="issued">Кем выдан:</label>
      <input id="issued" v-model="$data.issued"  placeholder="5"></input>

      <label for="issued_date">Дата выдачи*:</label>
      <input id="issued_date" type="date" v-model="$v.issued_date.$model" :class="status($v.issued_date)"></input>

      <div class="checkbox__wrapper">
        <input type="checkbox" v-model="$data.no_sms" value="1"  id="checkbox_sms"></input>
        <label for="checkbox_sms" >Не отправлять СМС</label>
      </div>

      <button type="submit" value="Submit" :disabled="$v.$invalid">Зарегестрироваться</button>
    <p v-if="$data.show_success">Регистрация прошла успешно</p>
  </form>`,
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
      show_success : null,
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
      required,
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
        this.$emit('registration-submitted', addUser);
        for (k in addUser){this[k]=null}
        this.show_success = true;
      }
    }
  }
})


var app = new Vue({
    el: '#app',
    data:{
      users: [],
    },
    methods:{
      addUser(user) {
          this.users.push(user)
        }
    }
})
