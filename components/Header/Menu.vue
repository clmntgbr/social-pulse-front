<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Facebook, Linkedin, Twitter } from "lucide-vue-next";
import { SocialAccountsAction } from "~/composables/api/social_accounts/actions";
import { getFacebookLoginUrl } from "~/composables/api/social_accounts/getFacebookLoginUrl";
import { getlinkedinLoginUrl } from "~/composables/api/social_accounts/getLinkedinLoginUrl";
import { getTwitterLoginUrl } from "~/composables/api/social_accounts/getTwitterLoginUrl";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

async function handleGetFacebookLoginUrl() {
  const loginUrl = await getFacebookLoginUrl();
  if (loginUrl.value.type === SocialAccountsAction.GET_LOGIN_URL_SUCCESS) {
    navigateTo(loginUrl.value.payload.value, { external: true });
  }
}

async function handleGetLinkedinLoginUrl() {
  const loginUrl = await getlinkedinLoginUrl();
  if (loginUrl.value.type === SocialAccountsAction.GET_LOGIN_URL_SUCCESS) {
    navigateTo(loginUrl.value.payload.value, { external: true });
  }
}

async function handleGetTwitterLoginUrl() {
  const loginUrl = await getTwitterLoginUrl();
  if (loginUrl.value.type === SocialAccountsAction.GET_LOGIN_URL_SUCCESS) {
    navigateTo(loginUrl.value.payload.value, { external: true });
  }
}
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Réseaux sociaux</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid grid-cols-2 gap-2 p-2 w-[230px]">
            <li class="col-span-1">
              <NavigationMenuLink as-child>
                <a
                  @click="handleGetFacebookLoginUrl"
                  class="flex h-full w-full select-none flex-col justify-center items-center rounded-xl facebookButton"
                >
                  <Facebook
                    :size="40"
                    :stroke-width="0.5"
                    color="#ffffff"
                    fill="#ffffff"
                  />
                </a>
              </NavigationMenuLink>
            </li>
            <li class="col-span-1">
              <NavigationMenuLink as-child>
                <a
                  @click="handleGetTwitterLoginUrl"
                  class="flex h-full w-full select-none flex-col justify-center items-center rounded-xl twitterButton"
                >
                  <Twitter
                    :size="40"
                    :stroke-width="0.5"
                    color="#ffffff"
                    fill="#ffffff"
                  />
                </a>
              </NavigationMenuLink>
            </li>
            <li class="col-span-2">
              <NavigationMenuLink as-child>
                <a
                  @click="handleGetLinkedinLoginUrl"
                  class="flex h-full w-full select-none flex-col justify-center items-center rounded-xl linkedinButton"
                >
                  <Linkedin
                    :size="40"
                    :stroke-width="0.5"
                    color="#ffffff"
                    fill="#ffffff"
                  />
                </a>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Components</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul
            class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
          >
            <li v-for="component in components" :key="component.title">
              <NavigationMenuLink as-child>
                <a
                  :href="component.href"
                  class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div class="text-sm font-medium leading-none">
                    {{ component.title }}
                  </div>
                  <p
                    class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                  >
                    {{ component.description }}
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="/docs" :class="navigationMenuTriggerStyle()">
          Documentation
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

<style>
.facebookButton {
  width: 101px;
  height: 101px;
  background-color: #1877f2;
}
.facebookButton:hover {
  cursor: pointer;
}
.twitterButton {
  width: 101px;
  height: 101px;
  background-color: #1da1f2;
}
.twitterButton:hover {
  cursor: pointer;
}
.linkedinButton {
  height: 101px;
  background-color: #0e76a8;
}
.linkedinButton:hover {
  cursor: pointer;
}
</style>
