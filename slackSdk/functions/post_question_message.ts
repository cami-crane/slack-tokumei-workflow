import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";
import { SlackFunction } from "deno-slack-sdk/mod.ts";

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in workflows.
 * https://api.slack.com/automation/functions/custom
 */
export const PostQuestionMessage = DefineFunction({
  callback_id: "post_question_message",
  title: "Post an question to channel",
  description: "Create an question message from submitted form",
  source_file: "functions/post_question_message.ts",
  // FIXME: 入らなければ削除
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
      },
      submitting_user: {
        type: Schema.slack.types.user_id,
      },
      severity: {
        type: Schema.types.string,
        description: "Severity of the question",
      },
      description: {
        type: Schema.types.string,
        description: "Description of the question",
      },
      summary: {
        type: Schema.types.string,
        description: "Relevant link or URL",
      },
    },
    required: ["submitting_user", "severity", "description", "channel"],
  },
  output_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
      },
      submitting_user: {
        type: Schema.slack.types.user_id,
      },
      severity: {
        type: Schema.types.string,
        description: "Severity of the question",
      },
      description: {
        type: Schema.types.string,
        description: "Description of the question",
      },
      summary: {
        type: Schema.types.string,
        description: "Relevant link or URL",
      },
    },
    required: ["submitting_user", "severity", "description"],
  },
});

/**
 * SlackFunction takes in two arguments: the CustomFunction
 * definition (see above), as well as a function that contains
 * handler logic that's run when the function is executed.
 * https://api.slack.com/automation/functions/custom
 */
export default SlackFunction(PostQuestionMessage, async ({ inputs, client }) => {
  const { channel, severity, description, summary, submitting_user } = inputs;
  // const severityEmoji: { [key: string]: string } = {
  //   low: ":white_circle:",
  //   medium: ":large_blue_circle:",
  //   high: ":red_circle:",
  // };

  console.log(1);

  // Send a message to channel using a nicely formatted
  // message using block elements from Block Kit.
  // https://api.slack.com/block-kit
  await client.chat.postMessage({
    channel,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "質問が来ました！",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `質問項目: ${severity}\n\n`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `概要:${summary}\n\n`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `詳細:${description}\n\n`,
        },
      },
    ],
    text: "メッセージのテキスト",
    attachments: [
      {
        fallback: "ボタンをサポートしていないプラットフォーム用のテキスト",
        callback_id: "button_click",
        color: "#3AA3E3",
        attachment_type: "default",
        actions: [
          {
            name: "reply",
            text: "返信",
            type: "button",
            value: "reply",
            url: "https://slack.com/shortcuts/Ft073HST7NJW/3b97720ee62fc7807b729a0e064d3c08",
          },
        ],
      },
    ],
  });

  // Return all inputs as outputs for consumption in subsequent functions
  return {
    outputs: { channel, severity, description, submitting_user, summary },
  };
});