import TorusSdk from "@toruslabs/torus-direct-web-sdk";

const OPEN_LOGIN_URL = "http://localhost:3000";

let openLoginIframe = null;

const torusdirectsdk = new TorusSdk({
  baseUrl: OPEN_LOGIN_URL,
  redirectPathName: "auth",
  enableLogging: true,
  uxMode: "redirect",
  network: "testnet"
});
torusdirectsdk.init({ skipInit: true });

export async function triggerLogin() {
  const args = {
    typeOfLogin: "google",
    verifier: "google-lrc",
    clientId: "221898609709-obfn3p63741l5333093430j3qeiinaa8.apps.googleusercontent.com"
  };
  if (openLoginIframe?.contentWindow) {
    openLoginIframe.contentWindow.postMessage({ method: "triggerLogin", args, domain: location.origin }, OPEN_LOGIN_URL);
  }
  return torusdirectsdk.triggerLogin(args);
}

export const htmlToElement = html => {
  const template = window.document.createElement("template");
  const trimmedHtml = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = trimmedHtml;
  return template.content.firstChild;
};

export function prepareAndAttachIFrame() {
  openLoginIframe = htmlToElement(
    `<iframe
          id="torusIframe"
          class="torusIframe"
          src="${OPEN_LOGIN_URL}"
          style="display: none; position: fixed; top: 0; right: 0; width: 100%;
          height: 100%; border: none; border-radius: 0;"
        ></iframe>`
  );
  document.body.appendChild(openLoginIframe);
}

prepareAndAttachIFrame();
