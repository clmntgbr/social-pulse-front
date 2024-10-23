<script lang="ts" setup>
import type {
  Post,
  SocialAccount,
} from "~/composables/api/client/interface/GetPost";

const props = defineProps<{
  socialAccount?: SocialAccount | null;
  post?: Post | null;
}>();

const { socialAccount, post } = props;
</script>

<template>
  <div class="card post border rounded-md border-slate-250 bg-white">
    <div class="post-header">
      <div class="post-author-info">
        <img :src="socialAccount?.avatarUrl ?? ''" />
        <div>
          <div>
            <span class="author-name">{{ socialAccount?.username }}</span>
            <i class="verified-icon"></i>
          </div>
          <div class="details flex items-center gap-1">
            <span>4h</span>
            <UIcon name="i-heroicons-globe-alt" class="w-3 h-3" />
          </div>
        </div>
      </div>
      <i class="post-menu-icon"></i>
    </div>
    <p class="post-body">
      As of Monday, only about 56% of people eligible to get the shot have
      stepped forward in a nation with the world’s second-worst Covid-19
      outbreak. As of Monday, only about 56% of people eligible to get the shot
      have stepped forward in a nation with the world’s second-worst Covid-19
      outbreak.
    </p>
    <a class="post-image">
      <img src="https://e8gsb.csb.app/images/feed-image-1.jpg" />
      <div class="excerpt">
        <div class="post-info-icon-wrap">
          <i class="post-info-icon"></i>
        </div>
        <label>bloomberg.com</label>
        <h3>
          India’s Unusual Vaccine Problem: Plenty of Shots, But Few Takers
        </h3>
        <span
          >Most of the world is struggling to secure enough vaccines to
          inoculate their populations. India has the opposite problem: Plenty of
          shots, but a shortage of people willing to take them.</span
        >
      </div>
    </a>
    <div class="post-reactions">
      <div class="reactions">
        <div class="emojis">
          <img
            src="https://static.licdn.com/aero-v1/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
          />
          <img
            src="https://static.licdn.com/aero-v1/sc/h/cpho5fghnpme8epox8rdcds22"
          />
          <img
            src="https://static.licdn.com/aero-v1/sc/h/b1dl5jk88euc7e9ri50xy5qo8"
          />
        </div>
      </div>
      <div class="comment-share flex gap-5">
        <div class="flex gap-1">
          <span>{{ Math.floor(Math.random() * 100) + 1 }}</span>
          <span>Comments</span>
        </div>
      </div>
    </div>
    <div class="post-actions mt-2">
      <div class="actions border-t text-slate-250">
        <div class="action flew gap-1">
          <UIcon name="i-heroicons-hand-thumb-up" class="w-5 h-5" />
          <span class="text-slate-250">Like</span>
        </div>
        <div class="action flew gap-1">
          <UIcon
            name="i-heroicons-chat-bubble-bottom-center-text"
            class="w-5 h-5"
          />
          <span>Comment</span>
        </div>
        <div class="action flew gap-1">
          <UIcon name="i-heroicons-share" class="w-5 h-5" />
          <span>Share</span>
        </div>
        <div class="action flew gap-1">
          <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
          <span>Envoyer</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* feed */
.card.post {
  padding: 0;
}
.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px 0px 16px;
}
.post-author-info {
  display: flex;
  align-items: center;
}
.post-author-info img {
  width: 40px;
  height: 40px;
  border-radius: 1000px;
  margin-right: 8px;
}
.post-author-info .author-name {
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  margin-right: 5.5px;
}
.post-author-info .details {
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
}
.post-body {
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  padding: 8px 16px 16px 16px;
}
.post-image img {
  width: 100%;
  display: block;
}
.post-image .excerpt {
  width: 100%;
  background: var(--comment-background);
  padding: 12px 10px;
  position: relative;
}
.post-image .excerpt label {
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  line-height: 20px;
  text-transform: uppercase;
}
.post-image .excerpt h3 {
  color: var(--primary-text);
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
  /* margin: 5px 0; */
}
.post-image .excerpt span {
  line-height: 20px;
  font-weight: 400;
  font-size: 15px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.post-info-icon-wrap {
  width: 28px;
  height: 28px;
  border-radius: 1000px;
  border: 1px solid var(--media-inner-border);
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--always-white);
  position: absolute;
  right: 14px;
  top: 0;
  transform: translateY(-50%);
}
.post-reactions {
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid var(--divider);
}
.post-reactions .reactions {
  display: flex;
  align-items: center;
}
.post-reactions .reactions .emojis {
  display: flex;
  flex-direction: row-reverse;
}
.post-reactions .reactions img {
  width: 22px;
  height: 22px;
  display: block;
  border: 2px solid var(--card-background);
  margin-left: -4px;
}
.post-reactions .reactions span {
  font-size: 15px;
  padding-left: 6px;
}
.post-reactions .comment-share {
  display: flex;
}
.post-reactions .comment-share span {
  font-size: 15px;
  font-weight: 400;
}
.post-reactions .comment-share .shares {
  margin-left: 7px;
}
.post-actions {
  display: flex;
  font-size: 15px;
  height: 44px;
  padding: 0 12px;
}
.post-actions .actions {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.post-actions .action {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 6px 2px;
}
.post-actions .action i,
.post-actions .action span {
  padding: 6px 4px;
}
.post-actions .interact-as {
  display: flex;
  align-items: center;
}
.post-actions .interact-as img {
  width: 20px;
  height: 20px;
  border-radius: 1000px;
  margin-right: 2px;
}
</style>
