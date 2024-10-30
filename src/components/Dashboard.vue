<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Modal from './Modal.vue';
import MainLogo from "../assets/main.png"
const weatherData = ref<any>(null);
const permissionModal = ref(false);
const options = {
  enableHighAccuracy: true,
  timeout: 3000,
};
const successCallback = async (position: GeolocationPosition) => {

  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const currentPosition = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  };

  try {
    const res = await fetch(`${baseUrl}/api/weather`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentPosition)
    });
console.log(res);

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    weatherData.value = await res.json();
  } catch (err) {
    console.log("ERROR ", err);

  }



};

const errorCallback = (error: GeolocationPositionError) => {
  console.log("HERE AGAIN");
  console.log(error);
};

const getData = () => {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
  permissionModal.value = false
}
onMounted(async () => {
  const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

  if (permissionStatus.state !== 'granted') {
    permissionModal.value = true
  } else {
    getData();
  }
})

</script>

<template>
  <Modal :isOpen="permissionModal" @close="permissionModal = false">
    <div class="text-white">
      <p>
        I value your privacy and want to ensure you feel comfortable while using my website. To provide you with a
        more
        personalized experience, I kindly ask for your permission to access your location. Please rest assured that no
        data will be collected or stored. If you choose not to
        share
        your location, the site will still function properly, but with limited accuracy.
        I appreciate your
        understanding
        and encourage you to make the choice that feels right for you.
      </p>
      <div class="flex justify-center mt-8 gap-4">

        <button
          class="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-200">
          Continue With Limited Functionality
        </button>
        <button @click="getData()"
          class="bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-200">
          Allow Location Use
        </button>
      </div>
    </div>
  </Modal>
  <div class="bg-gray-800 h-screen flex justify-center flex-col items-center text-white">
    <img :src="MainLogo" alt="sdns logo" class="w-32 h-32 border rounded-md rounded-br-none rounded-bl-none ">
    <div class="border rounded-md p-4 shadow-md flex flex-col justify-center -mt-[1px]">
      <span class=" text-3xl mb-4 text-center">Welcome, Mr/Mrs-</span>

      <span class=" text-sm mb-1 text-center">The weather today is</span>

      <div class="flex justify-center">
        <div class="rounded-md border pr-2 pl-1 border-teal-500 flex gap-4">
          <span class="mt-2">{{
            weatherData?.current?.condition?.text || "Unavailable" }}
          </span>
          <img :src="weatherData?.current?.condition?.icon" class="w-12 h-12" alt="Weather image"></img>
        </div>

      </div>
      <div class="grid grid-cols-1 mt-8">
        <div class="grid grid-cols-2 gap-4">

          <span class="flex">
            <svg width="25px" fill="#ffffff" height="25px" viewBox="0 0 1024 1024" class="icon mr-4" version="1.1"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M570.8 742c0.5-2.9 0.9-5.8 0.9-8.8V418.5H458.4v314.6c0 3 0.4 5.9 0.9 8.8-34.3 19.5-57.5 56.3-57.5 98.5 0 62.6 50.7 113.3 113.3 113.3 62.6 0 113.3-50.7 113.3-113.3-0.1-42.2-23.3-79-57.6-98.4z"
                fill="#14b8a6" />
              <path
                d="M594.3 730.3V194.8c0-43.7-35.6-79.3-79.3-79.3s-79.3 35.6-79.3 79.3v535.4c-35.2 25.4-56.6 66.5-56.6 110.2 0 75 61 135.9 135.9 135.9s136-60.8 136-135.8c0-43.7-21.4-84.8-56.7-110.2zM515 931.1c-50 0-90.6-40.6-90.6-90.6 0-32.1 17.4-62.1 45.3-78.4 7-4 11.3-11.5 11.3-19.6v-40.8h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-45.3h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-45.3h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481V498h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-45.3h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-45.3h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-45.3h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481V226h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-8.5c0-18.7 15.2-34 34-34 18.7 0 34 15.2 34 34v547.7c0 8.1 4.3 15.6 11.3 19.6 28 16.2 45.3 46.2 45.3 78.4 0.1 49.9-40.6 90.5-90.6 90.5z"
                stroke="#ffffff" />
            </svg>

            Temperature </span>
          <span>
            {{ weatherData?.current?.temp_c }} &deg;C (Feels like {{ weatherData?.current?.feelslike_c }}&deg;C)
          </span>
          <span class="flex">
            <svg width="25px" height="25px" class="mr-4" viewBox="0 0 24 24" fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 21.5C16.1012 21.5 19.5 18.4372 19.5 14.5714C19.5 12.1555 18.2672 9.71249 16.8732 7.70906C15.4698 5.69214 13.8515 4.04821 12.9778 3.21778C12.4263 2.69364 11.5737 2.69364 11.0222 3.21779C10.1485 4.04821 8.53016 5.69214 7.1268 7.70906C5.73282 9.71249 4.5 12.1555 4.5 14.5714C4.5 18.4372 7.8988 21.5 12 21.5Z"
                stroke="#14b8a6" />
              <path
                d="M12 18C11.4747 18 10.9546 17.8965 10.4693 17.6955C9.98396 17.4945 9.54301 17.1999 9.17157 16.8284C8.80014 16.457 8.5055 16.016 8.30448 15.5307C8.10346 15.0454 8 14.5253 8 14"
                stroke="#222222" stroke-linecap="round" />
            </svg>Humidity </span>
          <span class="">
            {{ weatherData?.current?.humidity }}
          </span>

          <span class="flex">
            <svg width="25px" height="25px" class="mr-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <g id="wind" transform="translate(-2 -2)">
                <path id="primary" d="M3,7h7a2,2,0,0,0,0-4" fill="#14b8a6" stroke="#14b8a6" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="2" />
                <path id="primary-2" data-name="primary" d="M16,21a3,3,0,0,0,0-6H3" fill="none" stroke="#ffffff"
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                <line id="primary-3" data-name="primary" x2="7" transform="translate(3 19)" fill="none" stroke="#ffffff"
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                <path id="primary-4" data-name="primary" d="M3,11H17.5a3.5,3.5,0,1,0,0-7" fill="none" stroke="#ffffff"
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
              </g>
            </svg>Wind </span>
          <span class="">
            {{ weatherData?.current?.wind_kph }}/kph
          </span>



          <span class="flex">

            <svg fill="#000000" c width="25px" height="25px" viewBox="0 0 24 24" id="sun" data-name="Line Color"
              xmlns="http://www.w3.org/2000/svg" class="icon line-color mr-4">
              <path id="secondary"
                d="M12,3V4M5.64,5.64l.7.7M3,12H4m1.64,6.36.7-.7M12,21V20m6.36-1.64-.7-.7M21,12H20M18.36,5.64l-.7.7"
                style="fill: none;  stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;" stroke="#ffffff">
              </path>
              <circle id="primary" cx="12" cy="12" r="4"
                style="fill: none; stroke: #14b8a6; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
              </circle>
            </svg>
            UV </span>
          <span>
            {{ weatherData?.current?.uv }}
          </span>





        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
