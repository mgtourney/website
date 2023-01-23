import { Notify } from "notiflix/build/notiflix-notify-aio";

export function Success({ text }: { text: string }) {
  return Notify.success(text, {
    position: "right-top",
    timeout: 5000,
    clickToClose: true,
  });
}

export function Error({ text }: { text: string }) {
  return Notify.failure(text, {
    position: "right-top",
    timeout: 5000,
    clickToClose: true,
  });
}

export function Info({ text }: { text: string }) {
  return Notify.info(text, {
    position: "right-top",
    timeout: 5000,
    clickToClose: true,
  });
}

export function Warning({ text }: { text: string }) {
  return Notify.warning(text, {
    position: "right-top",
    timeout: 5000,
    clickToClose: true,
  });
}
