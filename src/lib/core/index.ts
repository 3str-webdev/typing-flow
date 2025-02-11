import { TypingNode } from "@/lib/nodes/nodes.types";
import { CanBeArray, TypingFlowConfig } from "@/lib/shared/types";
import { callArrayOfFunctions } from "@/lib/shared/utils/functions";
import { execute } from "@/lib/shared/utils/generators";
import { HooksModule } from "./modules/hooks-module";
import { NodeHandlersModule } from "./modules/node-handlers-module";

export class TypingFlow {
  private _config: TypingFlowConfig;

  private _typingNodes: Array<TypingNode> = [];

  private _hooksModule = new HooksModule();
  private _nodeHandlersModule = new NodeHandlersModule();

  constructor(config: TypingFlowConfig) {
    this._config = config;
  }

  public commands(commands: Array<CanBeArray<TypingNode>>) {
    for (let command of commands) {
      this._typingNodes = this._typingNodes.concat(command);
    }

    return this;
  }

  private _handleTypingNode(node: TypingNode, index: number): Promise<void> {
    return new Promise((resolve) => {
      const handle = () => {
        this._nodeHandlersModule.handlers[node.type](node, index);
        this._config.renderer(this._nodeHandlersModule.typingSnapshot);
        resolve();
      };

      const nodeDelay = node.nodeBuilder(
        this._nodeHandlersModule.typingSnapshot,
      ).delay;

      if (!nodeDelay) {
        handle();
      } else {
        setTimeout(handle, nodeDelay);
      }
    });
  }

  private *_typing() {
    for (let i = 0; i < this._typingNodes.length; i++) {
      yield this._handleTypingNode(this._typingNodes[i], i);
    }
  }

  private async _executeFlow() {
    callArrayOfFunctions(this._hooksModule.hooks.onStart);

    await execute(this._typing());

    callArrayOfFunctions(this._hooksModule.hooks.onFinish);
  }

  public on(...args: Parameters<HooksModule["on"]>) {
    this._hooksModule.on(...args);
    return this;
  }

  public async start() {
    if (this._config.loop) {
      this.on("finish", () => this._executeFlow());
    }

    this._executeFlow();

    return this;
  }
}
