import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { PostQuestionMessage } from "../functions/post_question_message.ts";

/**
 * A workflow is a set of steps that are executed in order.
 * Each step in a workflow is a function.
 * https://api.slack.com/automation/workflows
 */
const SubmitQuestionWorkflow = DefineWorkflow({
  callback_id: "submit_question",
  title: "Submit an question",
  description: "Submit an question to the channel",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["channel", "interactivity"],
  },
});

/**
 * For collecting input from users, we recommend the
 * built-in OpenForm function as a first step.
 * https://api.slack.com/automation/functions#open-a-form
 */
const inputForm = SubmitQuestionWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "匿名で相談を行う",
    interactivity: SubmitQuestionWorkflow.inputs.interactivity,
    submit_label: "Submit",
    fields: {
      elements: [{
        name: "severity",
        title: "何についての相談ですか？",
        type: Schema.types.string,
        enum: [":white_circle:", ":large_blue_circle:", ":red_circle:"],
        choices: [
          {
            value: "技術について質問したい",
            title: "技術について質問したい",
            description: "技術について質問したい",
          },
          {
            value: "意見交換をしたい",
            title: "意見交換をしたい",
            description: "意見交換をしたい",
          },
          {
            value: "その他",
            title: "その他",
            description: "その他",
          },
        ],
      }, {
        name: "summary",
        title: "概要",
        type: Schema.types.string,
      }, {
        name: "description",
        title: "詳細",
        type: Schema.types.string,
        long: true,
      }],
      required: ["severity", "summary", "description"],
    },
  },
);

/**
 * Custom functions are reusable building blocks
 * of automation deployed to Slack infrastructure. They
 * accept inputs, perform calculations, and provide
 * outputs, just like typical programmatic functions.
 * https://api.slack.com/automation/functions/custom
 */
SubmitQuestionWorkflow.addStep(
  PostQuestionMessage,
  {
    channel: SubmitQuestionWorkflow.inputs.channel,
    submitting_user: inputForm.outputs.interactivity.interactor.id,
    severity: inputForm.outputs.fields.severity,
    description: inputForm.outputs.fields.description,
    summary: inputForm.outputs.fields.summary,
  },
);

export default SubmitQuestionWorkflow;