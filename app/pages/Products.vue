<template>
  <!-- <div>
    <h1> Products Page </h1>
  </div> -->
  <div class="captcha-container">
    <div class="captcha-box">
      <!-- Canvas element where the CAPTCHA is drawn -->
      <canvas ref="canvasRef" width="150" height="50" class="captcha-canvas"></canvas>
      <button type="button" @click="refreshCaptcha" class="refresh-btn" title="Refresh CAPTCHA">
        🔄
      </button>
    </div>

    <form @submit.prevent="verifyCaptcha" class="captcha-form">
      <input v-model="userInput" type="text" placeholder="Enter CAPTCHA" required />
      <button type="submit">Verify</button>
    </form>

    <p v-if="statusMessage" :class="['status', isSuccess ? 'success' : 'error']">
      {{ statusMessage }}
    </p>
    <P>
     
    </P>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';

const canvasRef = ref(null)
const userInput = ref('')
const currentCaptcha = ref('')
const statusMessage = ref('')
const isSuccess = ref(false)

// Generate a random alphanumeric string
const generateRandomCode = (length = 6) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789' // Omitted ambiguous characters (0, O, 1, l)
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Draw the CAPTCHA string and background noise on the canvas
const drawCaptcha = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  // Clear previous canvas content
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 1. Background Fill
  ctx.fillStyle = '#f2f4f8'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 2. Generate Text & Draw Characters
  currentCaptcha.value = generateRandomCode()
  ctx.font = 'bold 24px sans-serif'

  for (let i = 0; i < currentCaptcha.value.length; i++) {
    const char = currentCaptcha.value[i]
    ctx.save()

    // Position each character with slight random offset and rotation
    const x = 15 + i * 20
    const y = 32 + (Math.random() - 0.5) * 8
    const angle = (Math.random() - 0.5) * 0.4 // Small rotation angle

    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.fillStyle = `rgb(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)})`
    ctx.fillText(char, 0, 0)

    ctx.restore()
  }

  // 3. Noise Lines
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = `rgba(0, 0, 0, 0.2)`
    ctx.beginPath()
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.stroke()
  }

  // 4. Noise Dots
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = `rgba(0, 0, 0, 0.25)`
    ctx.beginPath()
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2)
    ctx.fill()
  }
}

// Refresh CAPTCHA
const refreshCaptcha = () => {
  userInput.value = ''
  statusMessage.value = ''
  drawCaptcha()
}

// Verify User Input
const verifyCaptcha = () => {
  if (userInput.value === currentCaptcha.value) {
    isSuccess.value = true
    statusMessage.value = 'CAPTCHA Verified Successfully!'
  } else {
    isSuccess.value = false
    statusMessage.value = 'Incorrect CAPTCHA. Please try again.'
    // refreshCaptcha()
  }
}

onMounted(() => {
  drawCaptcha()
})

</script>
<style scoped>
.captcha-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 260px;
  font-family: sans-serif;
}

.captcha-box {
  display: flex;
  align-items: center;
  gap: 8px;
}

.captcha-canvas {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.refresh-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.captcha-form {
  display: flex;
  gap: 8px;
}

.captcha-form input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.captcha-form button {
  padding: 6px 12px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.status {
  font-size: 0.875rem;
  margin: 0;
}

.status.success {
  color: #16a34a;
}

.status.error {
  color: #dc2626;
}
</style>