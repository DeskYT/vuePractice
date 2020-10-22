
<template id="avatarTemplate">
  <transition name="modal">
    <div class="modalMask">
      <div class="modalWrapper" >
          <div class="studentDetailedPhotoContainer">
            <img class="studentDetailedPhoto" :src="photo" alt="">
            <div class="modalDefaultButton" @click="$emit('close')">
              x
            </div>
          </div>
      </div>
    </div>
  </transition>
</template>

<script defer src="@/components/StudentAvatar/StudentAvatar.js"></script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box
}
.studentDetailedPhoto{
  user-select: none;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3%;
}
.studentDetailedPhotoContainer{
  border-radius: 3%;
  width: 720px;
  height: 720px;
  margin: 0 auto;
  background-color: #414141;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  position: relative;
}
.modalMask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modalWrapper {
  display: table-cell;
  vertical-align: middle;
}

.modalContainer {
  width: 720px;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #414141;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modalHeader h3 {
  margin-top: 0;
  color: #42b983;
}

.modalBody {
  margin: 20px 0;
}

.modalDefaultButton {
  float: right;
  background-color: #5b5b5b;
  border: 3px solid #85afd0;
  border-radius: 50%;
  padding: 5px 10px;
  color: aliceblue;
  font-weight: bolder;
  cursor: pointer;
  user-select: none;
  position: absolute;
  top: -10px;
  right: -10px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modalEnter {
  opacity: 0;
}

.modalLeaveActive {
  opacity: 0;
}

.modal-enter .modalContainer,
.modal-leave-active .modalContainer {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>