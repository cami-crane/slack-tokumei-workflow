import { app } from './class/init'
import { sample } from './step/sample'
import {questionStep} from './step/questionStep'

// 定義したカスタム関数
sample
app.step(questionStep)

/** Start Bolt App */
;(async () => {
  try {
    await app.start(process.env.PORT || 3000)
    console.log('⚡️ Bolt app is running! ⚡️')
  } catch (error) {
    console.error('Unable to start App', error)
  }
})()
