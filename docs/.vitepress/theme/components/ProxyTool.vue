<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/**
 * 通过 GitHub Pages 直接打开本站时，需要显式配置加速服务地址。
 * 例如：const DEFAULT_PROXY_ORIGIN = "https://gh-proxy.your-name.workers.dev";
 * 通过加速服务域名访问本站时会自动使用当前域名，无需配置。
 */
const DEFAULT_PROXY_ORIGIN = "";

const STORAGE_KEY = "gh-proxy-origin";

const VALID_PATTERN =
  /^(?:https?:\/\/)?(?:(?:github\.com\/[^/]+\/[^/]+\/(?:releases|archive|blob|raw|suites|tags|info|git-))|(?:(?:raw|gist)\.(?:githubusercontent|github)\.com\/)).*$/i;

const EXAMPLES = [
  {
    label: "Release 文件",
    value: "https://github.com/hunshcn/gh-proxy/releases/download/v1.0.0/example.zip",
  },
  {
    label: "分支源码",
    value: "https://github.com/hunshcn/gh-proxy/archive/refs/heads/master.zip",
  },
  {
    label: "分支文件",
    value: "https://github.com/hunshcn/gh-proxy/blob/master/index.js",
  },
  {
    label: "Raw 文件",
    value: "https://raw.githubusercontent.com/hunshcn/gh-proxy/master/index.js",
  },
  {
    label: "Gist",
    value: "https://gist.githubusercontent.com/cielpy/351557e6e465c12986419ac5a4dd2568/raw/cmd.py",
  },
];

const input = ref("");
const origin = ref("");
const showSettings = ref(false);
const copiedField = ref("");
const isDocSite = ref(false);
const rootRef = ref<HTMLElement>();

// 首屏不展示工具，下拉到可视区域时再滑入
const isPending = ref(false);

const trimmed = computed(() => input.value.trim());
const isValid = computed(() => !trimmed.value || VALID_PATTERN.test(trimmed.value));
const missingOrigin = computed(() => !origin.value);
const proxyUrl = computed(() => {
  if (!trimmed.value || !origin.value) return "";
  return `${origin.value}/${trimmed.value.replace(/^\/+/, "")}`;
});

onMounted(() => {
  isDocSite.value = /\.github\.io$/i.test(window.location.hostname);
  const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_PROXY_ORIGIN;
  origin.value = saved || (isDocSite.value ? "" : window.location.origin);

  const el = rootRef.value;
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (!el || reduceMotion || typeof IntersectionObserver === "undefined") return;

  isPending.value = true;
  const observer = new IntersectionObserver(
    entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        isPending.value = false;
        observer.disconnect();
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  observer.observe(el);
  onBeforeUnmount(() => observer.disconnect());
});

function normalizeOrigin(value: string) {
  let v = (value || "").trim();
  if (!v) return "";
  if (!/^https?:\/\//i.test(v)) v = `https://${v}`;
  return v.replace(/\/+$/, "");
}

function saveOrigin() {
  origin.value = normalizeOrigin(origin.value);
  try {
    localStorage.setItem(STORAGE_KEY, origin.value);
  } catch {
    /* localStorage 不可用时忽略 */
  }
}

function resetOrigin() {
  origin.value = isDocSite.value ? "" : window.location.origin;
  saveOrigin();
}

function useExample(value: string) {
  input.value = value;
}

async function copyText(text: string, field: string) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    el.remove();
  }
  copiedField.value = field;
  window.setTimeout(() => {
    if (copiedField.value === field) copiedField.value = "";
  }, 1800);
}

function openProxy() {
  if (!proxyUrl.value) return;
  window.open(proxyUrl.value, "_blank", "noopener");
}
</script>

<template>
  <div id="proxy-tool" ref="rootRef" class="proxy-tool" :class="{ 'is-pending': isPending }">
    <div class="proxy-tool__inner">
      <div class="proxy-tool__head">
        <span class="proxy-tool__badge">在线加速</span>
        <h2 class="proxy-tool__title">粘贴 GitHub 链接，即刻加速</h2>
        <p class="proxy-tool__sub">支持 release、archive、blob/raw 文件与 gist，自动生成加速地址。</p>
      </div>

      <div class="proxy-tool__field" :class="{ 'is-error': !isValid }">
        <input
          v-model="input"
          class="proxy-tool__input"
          type="text"
          spellcheck="false"
          autocomplete="off"
          placeholder="https://github.com/user/repo/releases/download/v1.0.0/app.zip"
          @keyup.enter="openProxy"
        />
        <button class="proxy-tool__go" type="button" :disabled="!proxyUrl || !isValid" @click="openProxy">
          加速下载
        </button>
      </div>

      <p v-if="!isValid" class="proxy-tool__hint is-error">
        链接格式无法识别，请确认是 GitHub release / archive / blob / raw / gist 链接。
      </p>
      <p v-else-if="missingOrigin" class="proxy-tool__hint">
        当前为文档站，请先在下方的「加速域名」中填写你的加速服务地址（如
        <code>https://xxx.workers.dev</code>），或通过加速域名访问本站。
      </p>

      <div v-if="proxyUrl && isValid" class="proxy-tool__result">
        <span class="proxy-tool__result-label">加速地址</span>
        <a class="proxy-tool__result-url" :href="proxyUrl" target="_blank" rel="noopener">{{ proxyUrl }}</a>
        <button
          class="proxy-tool__copy"
          type="button"
          :class="{ 'is-done': copiedField === 'result' }"
          @click="copyText(proxyUrl, 'result')"
        >
          {{ copiedField === "result" ? "已复制" : "复制" }}
        </button>
      </div>

      <div class="proxy-tool__examples">
        <span class="proxy-tool__examples-label">示例：</span>
        <button
          v-for="item in EXAMPLES"
          :key="item.label"
          class="proxy-tool__chip"
          type="button"
          @click="useExample(item.value)"
        >
          {{ item.label }}
        </button>
      </div>

      <div class="proxy-tool__foot">
        <button class="proxy-tool__settings-toggle" type="button" @click="showSettings = !showSettings">
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm7.4-1.1.1-.9-.1-.9 1.5-1.2-1.5-2.6-1.9.6a7 7 0 0 0-1.5-.9L15.6 2h-3l-.4 2a7 7 0 0 0-1.5.9l-1.9-.6-1.5 2.6 1.5 1.2-.1.9.1.9-1.5 1.2 1.5 2.6 1.9-.6c.5.4 1 .7 1.5.9l.4 2h3l.4-2c.5-.2 1-.5 1.5-.9l1.9.6 1.5-2.6-1.5-1.2Z"
            />
          </svg>
          加速域名
        </button>
        <span v-if="origin" class="proxy-tool__origin">{{ origin }}</span>
        <span v-else class="proxy-tool__origin is-empty">未设置，点击填写</span>
      </div>

      <div v-if="showSettings" class="proxy-tool__settings">
        <input
          v-model="origin"
          class="proxy-tool__settings-input"
          type="text"
          spellcheck="false"
          placeholder="https://your-worker.workers.dev"
          @change="saveOrigin"
          @blur="saveOrigin"
        />
        <button class="proxy-tool__settings-reset" type="button" @click="resetOrigin">重置</button>
        <p class="proxy-tool__settings-tip">填写后仅保存在你的浏览器本地，用于拼接加速地址。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.proxy-tool {
  position: relative;
  scroll-margin-top: calc(var(--vp-nav-height) + 28px);
  max-width: 880px;
  /* 首屏为 Hero 独占，这里保证整卡完整位于折叠线之下 */
  margin: 72px auto 56px;
  padding: 1px;
  border-radius: 22px;
  background: linear-gradient(
    135deg,
    rgba(79, 70, 229, 0.7),
    rgba(6, 182, 212, 0.55) 48%,
    rgba(168, 85, 247, 0.65)
  );
  box-shadow: 0 30px 70px -34px rgba(79, 70, 229, 0.65);
  transition: opacity 0.55s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

/* JS 就绪且尚未滚入可视区域时隐藏，滚入后滑入 */
.proxy-tool.is-pending {
  opacity: 0;
  transform: translateY(34px);
}

.proxy-tool__inner {
  padding: 30px 30px 24px;
  border-radius: 21px;
  background: var(--vp-c-bg);
}

.proxy-tool__head {
  text-align: center;
  margin-bottom: 22px;
}

.proxy-tool__badge {
  display: inline-block;
  padding: 3px 12px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 999px;
}

.proxy-tool__title {
  margin: 14px 0 8px !important;
  padding: 0 !important;
  border: none !important;
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.proxy-tool__sub {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.proxy-tool__field {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.25s, box-shadow 0.25s;
}

.proxy-tool__field:focus-within {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 4px var(--vp-c-brand-soft);
}

.proxy-tool__field.is-error {
  border-color: var(--vp-c-danger-1);
  box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.14);
}

.proxy-tool__input {
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  font-size: 15px;
  color: var(--vp-c-text-1);
  background: transparent;
  border: none;
  outline: none;
}

.proxy-tool__go {
  flex: none;
  padding: 11px 22px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  background: linear-gradient(120deg, #4f46e5, #06b6d4);
  box-shadow: 0 10px 24px -12px rgba(79, 70, 229, 0.9);
  transition: transform 0.2s, filter 0.2s, opacity 0.2s;
}

.proxy-tool__go:hover:not(:disabled) {
  filter: brightness(1.06);
  transform: translateY(-1px);
}

.proxy-tool__go:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  box-shadow: none;
}

.proxy-tool__hint {
  margin: 12px 2px 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.proxy-tool__hint.is-error {
  color: var(--vp-c-danger-1);
}

.proxy-tool__hint code {
  padding: 1px 6px;
  font-size: 12px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
}

.proxy-tool__result {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 14px;
  padding: 12px 14px;
  border: 1px dashed var(--vp-c-brand-1);
  border-radius: 12px;
  background: var(--vp-c-brand-soft);
}

.proxy-tool__result-label {
  flex: none;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.proxy-tool__result-url {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-text-1);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.proxy-tool__copy {
  flex: none;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  cursor: pointer;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 8px;
  transition: background 0.2s, color 0.2s;
}

.proxy-tool__copy.is-done {
  color: #fff;
  background: var(--vp-c-brand-1);
}

.proxy-tool__examples {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-top: 18px;
}

.proxy-tool__examples-label {
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.proxy-tool__chip {
  padding: 5px 12px;
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}

.proxy-tool__chip:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
}

.proxy-tool__foot {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
}

.proxy-tool__settings-toggle {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  padding: 4px 10px;
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  background: transparent;
  border: none;
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
}

.proxy-tool__settings-toggle:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.proxy-tool__origin {
  overflow: hidden;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-text-3);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.proxy-tool__origin.is-empty {
  font-family: inherit;
  font-style: italic;
}

.proxy-tool__settings {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-top: 12px;
}

.proxy-tool__settings-input {
  flex: 1;
  min-width: 240px;
  padding: 9px 12px;
  font-size: 13px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  outline: none;
}

.proxy-tool__settings-input:focus {
  border-color: var(--vp-c-brand-1);
}

.proxy-tool__settings-reset {
  padding: 8px 16px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}

.proxy-tool__settings-reset:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.proxy-tool__settings-tip {
  flex-basis: 100%;
  margin: 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .proxy-tool__inner {
    padding: 22px 18px 18px;
  }

  .proxy-tool__field {
    flex-direction: column;
    align-items: stretch;
  }

  .proxy-tool__go {
    width: 100%;
  }

  .proxy-tool__title {
    font-size: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .proxy-tool {
    transition: none;
  }

  .proxy-tool.is-pending {
    opacity: 1;
    transform: none;
  }
}
</style>
