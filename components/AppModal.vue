<template>
  <div>
		<div class="modal">
      <div class="modal-content">
        <span @click="$emit('close')" @keyup.esc="$emit('close')" class="close">&times;</span>
				<slot/>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../assets/css/modal.css';

export default Vue.extend({
  name: 'AppModal',

});
</script>