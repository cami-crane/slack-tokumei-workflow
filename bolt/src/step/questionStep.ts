import { WorkflowStep } from "@slack/bolt";

// 既存のモーダルの情報を取得しメッセージを送信する
export const questionStep = new WorkflowStep('questionStep', {
  edit: async ({ ack, step, configure }) => {},
  save: async ({ ack, step, update }) => {},
  execute: async ({ step, complete, fail }) => {},
})