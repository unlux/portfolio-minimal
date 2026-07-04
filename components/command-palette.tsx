"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  HomeIcon,
  NotebookPenIcon,
  ListTodoIcon,
  BookOpenIcon,
  SunMoonIcon,
  MailIcon,
  CheckIcon,
  FileTextIcon,
  TerminalIcon,
} from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaDiscord,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const EMAIL = "contact@unlux.dev";

const pages = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Blog", href: "/blog", icon: NotebookPenIcon },
  { label: "Todo", href: "/todo", icon: ListTodoIcon },
  { label: "Currently reading", href: "/currently-reading", icon: BookOpenIcon },
];

const socials = [
  { label: "GitHub", href: "https://dub.sh/luxhub", icon: FaGithub },
  { label: "X / Twitter", href: "https://x.com/whyunlux", icon: FaXTwitter },
  { label: "LinkedIn", href: "https://dub.sh/lux-linkedin", icon: FaLinkedin },
  { label: "Discord", href: "https://discord.com/users/un.lux", icon: FaDiscord },
];

const resumes = [
  { label: "Résumé — Web dev", href: "/resume.pdf", icon: FileTextIcon },
  { label: "Résumé — DevOps", href: "/devops.pdf", icon: TerminalIcon },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const openViaEvent = () => setOpen(true);
    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", openViaEvent);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", openViaEvent);
    };
  }, []);

  // Reset the copied confirmation whenever the palette closes.
  useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  const run = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const navigate = useCallback(
    (href: string) => run(() => router.push(href)),
    [run, router]
  );

  const openExternal = useCallback(
    (href: string) =>
      run(() => window.open(href, "_blank", "noopener,noreferrer")),
    [run]
  );

  const toggleTheme = useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    // Keep the same circle-blur view transition the toggle button uses.
    if (!document.startViewTransition) {
      setTheme(next);
    } else {
      document.startViewTransition(() => setTheme(next));
    }
    setOpen(false);
  }, [resolvedTheme, setTheme]);

  const copyEmail = useCallback(() => {
    void navigator.clipboard?.writeText(EMAIL);
    setCopied(true);
    // Leave the palette open briefly so the confirmation is visible.
    window.setTimeout(() => setOpen(false), 700);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Go to">
          {pages.map(({ label, href, icon: Icon }) => (
            <CommandItem
              key={href}
              onSelect={() => navigate(href)}
              value={`go ${label}`}
            >
              <Icon />
              <span>{label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={toggleTheme} value="toggle theme dark light">
            <SunMoonIcon />
            <span>Toggle theme</span>
            <CommandShortcut>{resolvedTheme === "dark" ? "→ light" : "→ dark"}</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={copyEmail} value="copy email contact">
            {copied ? <CheckIcon /> : <MailIcon />}
            <span>{copied ? "Copied!" : "Copy email"}</span>
            <CommandShortcut>{EMAIL}</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Elsewhere">
          {socials.map(({ label, href, icon: Icon }) => (
            <CommandItem
              key={href}
              onSelect={() => openExternal(href)}
              value={`open ${label}`}
            >
              <Icon />
              <span>{label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Résumé">
          {resumes.map(({ label, href, icon: Icon }) => (
            <CommandItem
              key={href}
              onSelect={() => openExternal(href)}
              value={label}
            >
              <Icon />
              <span>{label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
