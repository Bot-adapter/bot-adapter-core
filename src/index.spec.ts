import "reflect-metadata";

import { Adapter } from "./adapter-builder/Adapter";
import { Controller, Message, OnMessage } from "./decorators";

@Controller({ pattern: "支付宝" })
class Test {
  constructor() {}

  @OnMessage({ pattern: "解绑" })
  unbind(@Message() msg: any) {
    console.log("unbind:", msg);
  }

  @OnMessage({ pattern: "绑定" })
  async bind(@Message() msg: any) {
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    console.log("bind:", msg);
    throw new Error("bind error");
  }

  @OnMessage({ pattern: "*", options: { exact: false } })
  echo(@Message() msg: any) {
    console.log("echo msg:", msg);
  }
}

const { messageHandler } = new Adapter().getHandlers();

messageHandler("绑定支付宝 1");
messageHandler("解绑支付宝 2");

setTimeout(() => messageHandler("解绑支付宝 3"), 2000);
