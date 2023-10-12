//import { IframePostMessage } from ".";
import { MessageType } from "./type";

export type IframePostMsgProps={
    on(type: string, fn: Function): void;
    emit(type: string, data: any);
    emit(type: MessageType, data: any);
    destroy: () => void;
}
class IframePostMsg implements IframePostMsgProps {
    private win: Window;
    private targetOrigin: string | undefined;
    constructor(win: Window, url?: string) {

        this.win = win,
            this.targetOrigin = url || "*",
            //@ts-ignore

            window.decorateActions = {},
            window.addEventListener("message", this.handleMessageListener, !1)
    }
    on(type:string, fn: Function):void
    on(type: MessageType, fn: Function):void
    on(type,fn){

           //@ts-ignore
           return window.decorateActions[type] = fn
    }
    emit(type:string, data: any):void
    emit(type: MessageType, data: any):void
    emit(type, data) {
     
        return this.win.postMessage({ type, value: data }, this.targetOrigin as string);
    }
    private handleMessageListener(messEvent: MessageEvent) {
        if (messEvent.origin === this.targetOrigin) {
            if (messEvent.data && messEvent.data.type) {
                var e = messEvent.data.type;
                //@ts-ignore
                window.decorateActions[e] ? window.decorateActions[e](t.data.value) : console.warn(e + ": missing listener")
            }
        } else
            console.warn(messEvent.origin + "不对应源" + this.targetOrigin)
    }
    destroy() {
        window.removeEventListener("message", this.handleMessageListener)

    }

}




export default IframePostMsg