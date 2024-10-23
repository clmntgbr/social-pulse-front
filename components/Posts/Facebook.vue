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
            <UIcon name="i-heroicons-cog-8-tooth" class="w-3 h-3" />
          </div>
        </div>
      </div>
      <i class="post-menu-icon"></i>
    </div>
    <p class="post-body">
      {{ post?.body }}
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
            src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cg clip-path='url(%23clip0_15251_63610)'%3E%3Cpath d='M15.9963 8c0 4.4179-3.5811 7.9993-7.9986 7.9993-4.4176 0-7.9987-3.5814-7.9987-7.9992 0-4.4179 3.5811-7.9992 7.9987-7.9992 4.4175 0 7.9986 3.5813 7.9986 7.9992Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M15.9973 7.9992c0 4.4178-3.5811 7.9992-7.9987 7.9992C3.5811 15.9984 0 12.417 0 7.9992S3.5811 0 7.9986 0c4.4176 0 7.9987 3.5814 7.9987 7.9992Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M7.9996 5.9081c-.3528-.8845-1.1936-1.507-2.1748-1.507-1.4323 0-2.4254 1.328-2.4254 2.6797 0 2.2718 2.3938 4.0094 4.0816 5.1589.3168.2157.7205.2157 1.0373 0 1.6878-1.1495 4.0815-2.8871 4.0815-5.159 0-1.3517-.993-2.6796-2.4254-2.6796-.9811 0-1.822.6225-2.1748 1.507Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0 7.9992 -7.99863 0 7.9986 7.9992)'%3E%3Cstop offset='.5637' stop-color='%23E11731' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23E11731' stop-opacity='.1'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3986' y1='2.4007' x2='13.5975' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FF74AE'/%3E%3Cstop offset='.5001' stop-color='%23FA2E3E'/%3E%3Cstop offset='1' stop-color='%23FF5758'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_15251_63610'%3E%3Cpath fill='%23fff' d='M-.001.0009h15.9992v15.9984H-.001z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E"
          />
          <img
            src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"
          />
          <img
            src="https://scontent-cdg4-1.xx.fbcdn.net/m1/v/t6/An95QHaxAbMTp2SyUXLpDATL4RVXaXWyMMPZdhhNbQvXSEtO4mBobyhl440IsX6aUdwySIdlo5h4V7oqQ3FNgrsS1ZCe5rj7-534rtBlVLAm3GMjBK9wsB53peUgOw.png?ccb=10-5&oh=00_AYDFDh_86fiEN7yrl2BQAxTchh0KsCl53n7E5yVaQOFZHQ&oe=6718F02C&_nc_sid=7da55a"
          />
        </div>
        <span>{{ Math.floor(Math.random() * 100) + 1 }}</span>
      </div>
      <div class="comment-share flex gap-5">
        <div class="flex gap-1">
          <span>{{ Math.floor(Math.random() * 100) + 1 }}</span>
          <span>Comments</span>
        </div>
        <div class="shares flex gap-1">
          <span>{{ Math.floor(Math.random() * 100) + 1 }}</span>
          <span>Shares</span>
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
          <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
          <span>Envoyer</span>
        </div>
        <div class="action flew gap-1">
          <UIcon name="i-heroicons-share" class="w-5 h-5" />
          <span>Share</span>
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
