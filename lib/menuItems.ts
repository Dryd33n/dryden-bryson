import { MenuItem } from "@/components/Typography/BlurText/BlurTextButton";

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
    clickFn: () => { window.location.href = "/about"; }
  },
  {
    title: "├─ SKILLS",
    clickFn: () => { window.location.href = "/skills"; }
  },
  {
    title: "├─ RESUME",
    clickFn: () => { window.location.href = "/about"; }
  }
];

export const contactItems: MenuItem[] = [
  {
    title: "/CONTACT",
    clickFn: () => { window.location.href = "/contact"; }
  },
  {
    title: "├─ EMAIL FORM",
    clickFn: () => { window.location.href = "/contact"; }
  },
  {
    title: "├─ SOCIAL MEDIA",
    clickFn: () => { window.location.href = "/contact"; }
  }
];
