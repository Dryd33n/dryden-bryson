import { MenuItem } from "@/app/components/typography/BlurText/BlurTextButton";

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const portfolioItems: MenuItem[] = [
  {
    title: "/PORTFOLIO",
    clickFn: () => { window.location.href = "/portfolio"; }
  },
  {
    title: "├─ CODE",
    clickFn: () => { window.location.href = "/portfolio"; }
  },
  {
    title: "├─ RENDERING",
    clickFn: () => { window.location.href = "/portfolio"; }
  },
  {
    title: "├─ SCHOOLWORK",
    clickFn: () => { window.location.href = "/portfolio"; }
  }
];

export const aboutItems: MenuItem[] = [
  {
    title: "/ABOUT-ME",
    clickFn: () => { window.location.href = "/about"; }
  },
  {
    title: "├─ BIO",
    clickFn: () => { window.location.href = "/about#bio"; }
  },
  {
    title: "├─ SKILLS",
    clickFn: () => { window.location.href = "/about#skills"; }
  },
  {
    title: "├─ EDUCATION",
    clickFn: () => { window.location.href = "/about#education"; }
  }
];

export const contactItems: MenuItem[] = [
  {
    title: "/CONTACT",
    clickFn: () => { window.location.href = "/contact"; }
  },
  {
    title: "├─ EMAIL FORM",
    clickFn: () => { window.location.href = "/contact#contact-form"; }
  },
  {
    title: "├─ SOCIAL MEDIA",
    clickFn: () => { window.location.href = "/contact#social-media"; }
  }
];

export const home: MenuItem[] = [
  {
    title: "/HOME",
    clickFn: () => { window.location.href = "/"; }
  }
];