"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { collections, formatMoney } from "@/lib/catalog";
import WatchImage from "./WatchImage";
import Icon from "./Icon";

const MAX_BYTES = 4 * 1024 * 1024;
const MAX_IMAGES = 3;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_VIDEO_BYTES = 25 * 1024 * 1024;
const VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/ogg",
  "image/gif",
];

const LABEL_CLASS =
  "text-[0.7rem] font-medium uppercase tracking-[2px] text-[#5e7a70]";
const FIELD_CLASS =
  "mt-2 w-full rounded-sm border border-[#d8e3dd] bg-white px-3 py-2 text-[0.9rem] text-[#123c35] outline-none transition-colors placeholder:text-[#9aa8a2] focus:border-[#123c35]";
const PRIMARY_CLASS =
  "inline-flex items-center justify-center gap-2 rounded-sm bg-[#123c35] px-7 py-3 text-[0.72rem] font-semibold uppercase tracking-[2px] text-[#f4f0e6] transition-colors hover:bg-[#0d2e28] disabled:cursor-not-allowed disabled:opacity-60";
const OUTLINE_CLASS =
  "inline-flex items-center gap-2 rounded-sm border border-[#123c35] px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[2px] text-[#123c35] transition-colors hover:bg-[#123c35] hover:text-[#f4f0e6]";
const DANGER_CLASS =
  "mt-1 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#a23a2d] px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[2px] text-white transition-colors hover:bg-[#8c3226] disabled:cursor-not-allowed disabled:opacity-60";

export default function AdminWatchManager({ watches }) {
  const router = useRouter();
  const formRef = useRef(null);
  const originalPriceInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [items, setItems] = useState([]);
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  function onAddFiles(event) {
    const selected = Array.from(event.target.files || []);
    event.target.value = "";
    if (!selected.length) return;
    const accepted = [];
    const errors = [];
    for (const file of selected) {
      if (items.length + accepted.length >= MAX_IMAGES) {
        errors.push(`You can upload up to ${MAX_IMAGES} images.`);
        break;
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push("Images must be JPG, PNG or WebP.");
        continue;
      }
      if (file.size > MAX_BYTES) {
        errors.push("Each image must be 4 MB or smaller.");
        continue;
      }
      accepted.push({ file, url: URL.createObjectURL(file) });
    }
    if (accepted.length) setItems([...items, ...accepted]);
    setMessage(
      errors.length
        ? { type: "error", text: errors[0] }
        : { type: "", text: "" },
    );
  }

  function onRemoveImage(index) {
    URL.revokeObjectURL(items[index].url);
    setItems(items.filter((_, itemIndex) => itemIndex !== index));
  }

  function onPickVideo(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!VIDEO_TYPES.includes(file.type)) {
      return setMessage({
        type: "error",
        text: "Clip must be an MP4, WebM, MOV, OGG or GIF.",
      });
    }
    if (file.size > MAX_VIDEO_BYTES) {
      return setMessage({
        type: "error",
        text: "Clip must be 25 MB or smaller.",
      });
    }
    if (video) URL.revokeObjectURL(video.url);
    setVideo({
      file,
      url: URL.createObjectURL(file),
      kind: file.type === "image/gif" ? "gif" : "video",
    });
    setMessage({ type: "", text: "" });
  }

  function onRemoveVideo() {
    if (video) URL.revokeObjectURL(video.url);
    setVideo(null);
    if (videoInputRef.current) videoInputRef.current.value = "";
  }

  function clearImages() {
    items.forEach((item) => URL.revokeObjectURL(item.url));
    setItems([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (video) URL.revokeObjectURL(video.url);
    setVideo(null);
    if (videoInputRef.current) videoInputRef.current.value = "";
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (!items.length)
      return setMessage({
        type: "error",
        text: "Please choose at least one image.",
      });

    setSaving(true);
    setMessage({ type: "", text: "" });

    const body = new FormData(event.currentTarget);
    body.set("originalPrice", originalPriceInputRef.current?.value ?? "");
    items.forEach((item) => body.append("images", item.file));

    if (video) body.append("video", video.file);

    const res = await fetch("/api/admin/watches", { method: "POST", body });
    const data = await res.json().catch(() => ({}));

    setSaving(false);
    if (!res.ok)
      return setMessage({
        type: "error",
        text: data.error || "Upload failed.",
      });

    const submittedOriginalPrice = Number(
      originalPriceInputRef.current?.value.replace(/[ ,]/g, ""),
    );

    if (
      submittedOriginalPrice > 0 &&
      data.originalPrice !== submittedOriginalPrice
    )
      return setMessage({
        type: "error",
        text: "The watch was created, but its original price was not saved. Please refresh and check the watch before adding it again.",
      });

    clearImages();
    formRef.current.reset();
    setMessage({ type: "success", text: "Watch added." });
    router.refresh();
  }

  async function onDelete(watch) {
    if (
      !window.confirm(
        `Delete “${watch.title}”? This also removes its images and clip.`,
      )
    )
      return;
    setDeletingId(watch.id);
    const res = await fetch(`/api/admin/watches/${watch.id}`, {
      method: "DELETE",
    });
    const data = await res.json().catch(() => ({}));
    setDeletingId("");
    if (!res.ok)
      return setMessage({
        type: "error",
        text: data.error || "Delete failed.",
      });
    setMessage({ type: "success", text: "Watch deleted." });
    router.refresh();
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-[#d8e3dd] pb-6">
        <div>
          <p className="text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70]">
            Aurade Admin
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.6px] text-[#123c35] sm:text-4xl">
            Manage watches
          </h1>
        </div>
        <button className={OUTLINE_CLASS} type="button" onClick={logout}>
          Sign out
        </button>
      </header>

      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="rounded-sm border border-[#d8e3dd] bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 className="text-2xl font-semibold tracking-[-0.5px] text-[#123c35]">
          Add a watch
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label>
            <span className={LABEL_CLASS}>Title</span>
            <input
              className={FIELD_CLASS}
              name="title"
              required
              maxLength={120}
              placeholder="The Phantom"
            />
          </label>
          <label>
            <span className={LABEL_CLASS}>Price (PKR)</span>
            <input
              className={FIELD_CLASS}
              name="price"
              type="number"
              required
              min="0.01"
              step="0.01"
              placeholder="42000.00"
            />
          </label>
          <label>
            <span className={LABEL_CLASS}>Original price (PKR) — optional</span>
            <input
              className={FIELD_CLASS}
              ref={originalPriceInputRef}
              name="originalPrice"
              type="text"
              inputMode="decimal"
              placeholder="52000.00"
            />
          </label>
          <label>
            <span className={LABEL_CLASS}>Collection</span>
            <select
              className={FIELD_CLASS}
              name="category"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select collection
              </option>
              {collections.map((collection) => (
                <option key={collection.slug} value={collection.slug}>
                  {collection.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className={LABEL_CLASS}>Movement</span>
            <input
              className={FIELD_CLASS}
              name="movement"
              maxLength={60}
              placeholder="Quartz"
            />
          </label>
          <label>
            <span className={LABEL_CLASS}>Case size</span>
            <input
              className={FIELD_CLASS}
              name="caseSize"
              maxLength={40}
              placeholder="40 mm"
            />
          </label>
          <label>
            <span className={LABEL_CLASS}>Dial</span>
            <input
              className={FIELD_CLASS}
              name="dial"
              maxLength={40}
              placeholder="Blue"
            />
          </label>
          <label>
            <span className={LABEL_CLASS}>Case material</span>
            <input
              className={FIELD_CLASS}
              name="caseMaterial"
              maxLength={60}
              placeholder="Stainless steel"
            />
          </label>
          <label>
            <span className={LABEL_CLASS}>Water resistance</span>
            <input
              className={FIELD_CLASS}
              name="waterResistance"
              maxLength={40}
              placeholder="5 ATM"
            />
          </label>
          <label>
            <span className={LABEL_CLASS}>Badge</span>
            <input
              className={FIELD_CLASS}
              name="badge"
              maxLength={40}
              placeholder="New arrival"
            />
          </label>
          <label>
            <span className={LABEL_CLASS}>Stock</span>
            <input
              className={FIELD_CLASS}
              name="stock"
              type="number"
              min="0"
              step="1"
              defaultValue={1}
              required
            />
          </label>
          <label className="sm:col-span-2">
            <span className={LABEL_CLASS}>Strap options (comma separated)</span>
            <input
              className={FIELD_CLASS}
              name="straps"
              maxLength={400}
              placeholder="Black leather, Steel bracelet"
            />
          </label>
          <label className="sm:col-span-2">
            <span className={LABEL_CLASS}>Description</span>
            <textarea
              className={FIELD_CLASS}
              name="description"
              rows={5}
              required
              maxLength={2000}
            />
          </label>
          <label className="sm:col-span-2">
            <span className={LABEL_CLASS}>
              Watch images (1 to 3, JPG, PNG or WebP, up to 4 MB each)
            </span>
            <input
              className={`${FIELD_CLASS} file:mr-3 file:rounded-sm file:border-0 file:bg-[#123c35] file:px-3 file:py-2 file:text-[0.7rem] file:font-semibold file:uppercase file:tracking-[2px] file:text-[#f4f0e6]`}
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={onAddFiles}
            />
          </label>
          {items.length > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:col-span-2">
              {items.map((item, index) => (
                <div
                  key={item.url}
                  className="relative aspect-4/5 overflow-hidden rounded-sm border border-[#d8e3dd] bg-white"
                >
                  <img
                    src={item.url}
                    alt={`Selected watch preview ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    aria-label={`Remove image ${index + 1}`}
                    onClick={() => onRemoveImage(index)}
                    className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-lg leading-none text-[#a23a2d] shadow-sm transition-colors hover:bg-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <label className="sm:col-span-2">
            <span className={LABEL_CLASS}>
              Optional clip (MP4, WebM, MOV, OGG or GIF, up to 8 seconds and 25
              MB)
            </span>
            <input
              className={`${FIELD_CLASS} file:mr-3 file:rounded-sm file:border-0 file:bg-[#123c35] file:px-3 file:py-2 file:text-[0.7rem] file:font-semibold file:uppercase file:tracking-[2px] file:text-[#f4f0e6]`}
              ref={videoInputRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime,video/ogg,image/gif"
              onChange={onPickVideo}
            />
          </label>
          {video && (
            <div className="sm:col-span-2">
              <div className="relative aspect-4/5 w-full max-w-50 overflow-hidden rounded-sm border border-[#d8e3dd] bg-white">
                {video.kind === "gif" ? (
                  <img
                    src={video.url}
                    alt="Selected clip preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video
                    src={video.url}
                    className="h-full w-full object-cover"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                )}
                <button
                  type="button"
                  aria-label="Remove clip"
                  onClick={onRemoveVideo}
                  className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-lg leading-none text-[#a23a2d] shadow-sm transition-colors hover:bg-white"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
        <button
          className={`${PRIMARY_CLASS} mt-6`}
          type="submit"
          disabled={saving}
        >
          {saving ? "Uploading…" : "Add watch"}
        </button>
        <p
          role="status"
          className={`mt-4 text-[0.85rem] ${
            message.type === "error" ? "text-[#a23a2d]" : "text-[#2f7a4e]"
          }`}
        >
          {message.text}
        </p>
      </form>

      <h2 className="mt-14 text-2xl font-semibold tracking-[-0.5px] text-[#123c35]">
        Your watches ({watches.length})
      </h2>
      {watches.length === 0 ? (
        <p className="mt-4 text-[0.9rem] text-[#5e7a70]">
          No watches yet. Add your first one above.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {watches.map((watch) => (
            <article
              key={watch.id}
              className="overflow-hidden rounded-sm border border-[#d8e3dd] bg-white shadow-sm"
            >
              <div className="aspect-4/5 w-full overflow-hidden bg-white">
                <WatchImage
                  src={watch.imageUrl}
                  alt={watch.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 p-5">
                <h3 className="text-xl font-semibold tracking-[-0.4px] text-[#123c35]">
                  {watch.title}
                </h3>
                <div className="flex flex-col">
                  {watch.originalPrice > watch.price && (
                    <span className="text-[0.7rem] font-medium text-[#2dffb2] line-through">
                      {formatMoney(watch.originalPrice)}
                    </span>
                  )}
                  <p className="text-[1.05rem] font-semibold text-[#123c35]">
                    {formatMoney(watch.price)}
                  </p>
                </div>
                <p className="line-clamp-2 text-[0.85rem] text-[#5e7a70]">
                  {watch.description}
                </p>
                <p className="text-[0.65rem] font-medium uppercase tracking-[2px] text-[#5e7a70]">
                  {watch.hasVideo ? "1 video · " : ""}
                  {watch.imageCount} {watch.imageCount === 1 ? "pic" : "pics"}
                </p>
                <button
                  className={DANGER_CLASS}
                  type="button"
                  disabled={deletingId === watch.id}
                  onClick={() => onDelete(watch)}
                >
                  <Icon name="trash" size={16} />
                  {deletingId === watch.id ? "Deleting…" : "Delete watch"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
