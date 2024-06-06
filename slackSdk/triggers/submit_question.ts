import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import SubmitQuestionWorkflow from "../workflows/submit_question.ts";

/**
 * Triggers determine when workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/automation/triggers
 */
const submitQuestion: Trigger<typeof SubmitQuestionWorkflow.definition> = {
  type: TriggerTypes.Shortcut,
  name: "匿名で質問する",
  description: "匿名で相談したいときに、気軽に利用してください",
  workflow: "#/workflows/submit_question",
  inputs: {
    interactivity: {
      value: TriggerContextData.Shortcut.interactivity,
    },
    channel: {
      value: TriggerContextData.Shortcut.channel_id,
    },
  },
};

export default submitQuestion;
