import { Manifest } from "deno-slack-sdk/mod.ts";
import { PostIssueMessage } from "./functions/post_issue_message.ts";
import { PostQuestionMessage } from "./functions/post_question_message.ts";
import SubmitIssueWorkflow from "./workflows/submit_issue.ts";
import SubmitQuestionWorkflow from "./workflows/submit_question.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "TOKUMEI MATE TOLK",
  description: "ワークフローを使用し、匿名で質問と回答ができるアプリです。",
  icon: "assets/default_new_app_icon.png",
  workflows: [SubmitQuestionWorkflow],
  functions: [PostQuestionMessage],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
