import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="flex flex-col gap-6 items-center justify-center mt-10 py-12 border-t border-zinc-200 dark:border-zinc-800">
      <p>طراحی با ♥ توسط آرش کدخدائی الیادرانی در ایران</p>
      <SocialLinks />
    </footer>
  );
}
