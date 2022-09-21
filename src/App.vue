<template>
  <notifications />
  <div class="wrapper">
    <div class="card-content">
      <div class="container">
        <div class="image">
          <img src="./assets/mail.png" />
        </div>
        <h1>Subscribe</h1>
        <p>dass du jede Woche informiert wirst wenn es Satè Gai gibt.</p>
      </div>
      <div class="day-container">
        <span>Tag vom Satè Gai ist: </span>
        <span class="day">{{ day }}</span>
      </div>

      <label class="switch">
        <input
          type="checkbox"
          :value="checkboxSub"
          @input="(e) => (checkboxSub = e.target.checked)"
          checked
        />
        <span class="slider"></span>
      </label>
      <p>Subscribe oder Unsubscribe</p>
      <form class="form-input" @submit.prevent="submit">
        <input type="text" placeholder="Your Email" v-model="email" />
        <button class="subscribe-btn" type="submit">
          {{ checkboxSub ? 'Subscribe' : 'Unsubscribe' }}
        </button>
      </form>
      <div v-if="v$.email.$error" class="error">
        Bitte gebe eine gültige Email an.
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import APIService from './service/APIService';
import { useToast } from 'vue-toastification';

const emailValidation = (value) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
  return !!value.match(regex);
};

let day = ref('Tag');
const email = ref(localStorage.getItem('email') || '');
const checkboxSub = ref(true);

const rules = {
  email: { required, emailValidation },
};

const v$ = useVuelidate(rules, { email });

const toast = useToast();

const submit = async () => {
  const isFormCorrect = await v$.value.$validate();
  // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
  if (!isFormCorrect) return;
  // actually submit form

  const res = await callSubscribeOrUnsubscribe();
  if (res.status === 200) {
    toast.success(
      checkboxSub.value
        ? 'Erfolgreich subscribed.'
        : 'Erfolgreich Unsubscribed.'
    );
  } else if (res.response.status === 409) {
    toast.error('Email Addresse bereits hinzugefügt');
  } else {
    toast.error('Try again later...');
  }
};

const callSubscribeOrUnsubscribe = async () => {
  if (checkboxSub.value) {
    return await APIService.subscribe(email.value);
  } else {
    return await APIService.unSubscribe(email.value);
  }
};

watch(email, async (newEmail, _) => {
  localStorage.setItem('email', newEmail);
});

onMounted(async () => {
  const res = await APIService.getCurrentDay();
  day.value = res.data === 'Error' ? 'Nicht vorhanden' : res.data;
});
</script>

<style scoped>
.wrapper {
  height: 100vh;
  padding: 1rem;
}

.day-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.day {
  font-size: 1.7rem;
  margin-left: 10px;
}

.error {
  color: red;
  margin-top: 30px;
  font-size: 0.8rem;
}

.form-input {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  flex-grow: 1;
}

.image img {
  width: 50px;
}

.card-content {
  max-width: 30rem;
  background-color: #fff;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1rem;
  padding: 4rem 0.5rem;
  box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);
  text-align: center;
}

.card-content h1 {
  text-transform: uppercase;
  margin: 0 0 1rem 0;
}

.card-content p {
  font-size: 0.8rem;
  margin: 0 0 2rem 0;
}

input {
  padding: 0.8rem 1rem;
  border-radius: 5rem;
  outline: none;
  border: 0.1rem solid #d1d1d1;
  font-size: 0.7rem;
}

::placeholder {
  color: #d1d1d1;
}

.subscribe-btn {
  padding: 0.8rem 2rem;
  border-radius: 5rem;
  background: linear-gradient(90deg, #11aaff, #001155);
  color: #fff;
  font-size: 0.7rem;
  border: none;
  outline: none;
  cursor: pointer;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-bottom: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>
