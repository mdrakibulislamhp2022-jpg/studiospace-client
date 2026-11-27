"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiUploadCloud, FiX, FiPlus } from "react-icons/fi";
import { useSession } from "../lib/auth-client";
import { apiFetch } from "../lib/api-client";
import { isValidUrl } from "../lib/validators";

const CATEGORY_OPTIONS = ["Photo Studio", "Film Stage", "Podcast Lounge", "Music Suite", "Workshop"];
const SUGGESTED = [
  "Wi-Fi",
  "Air Conditioning",
  "Soundproofing",
  "Studio Lighting",
  "Backdrop Stands",
  "Parking",
  "Green Room",
  "Free Coffee",
];

function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-error">{message}</p>;
}

export default function StudioForm({ studio = null }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const isEdit = Boolean(studio);
  const fileRef = useRef(null);

  const [values, setValues] = useState({
    title: studio?.title || "",
    category: studio?.category || "",
    hourlyRate: studio?.hourlyRate ?? "",
    securityDeposit: studio?.securityDeposit ?? "",
    maxCapacity: studio?.maxCapacity ?? "",
    location: studio?.location || "",
    image: studio?.image || "",
    overview: studio?.overview || "",
  });
  const [amenities, setAmenities] = useState(studio?.amenities || []);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  function addTag(raw) {
    const tag = raw.trim();
    if (!tag) return;
    if (amenities.some((a) => a.toLowerCase() === tag.toLowerCase())) {
      setTagInput("");
      return;
    }
    if (amenities.length >= 12) {
      toast.error("You can add up to 12 amenities.");
      return;
    }
    setAmenities((list) => [...list, tag]);
    setTagInput("");
    setErrors((e) => ({ ...e, amenities: "" }));
  }

  function removeTag(tag) {
    setAmenities((list) => list.filter((a) => a !== tag));
  }

  function onTagKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === "Backspace" && !tagInput && amenities.length) {
      setAmenities((list) => list.slice(0, -1));
    }
  }

  async function onFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be 5 MB or smaller.");
      return;
    }
    setUploading(true);
    const loadingId = toast.loading("Uploading image...");
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) {
        toast.error(data.message || "Upload failed. Please try again.", { id: loadingId });
        return;
      }
      setValues((v) => ({ ...v, image: data.url }));
      setErrors((er) => ({ ...er, image: "" }));
      toast.success("Image uploaded.", { id: loadingId });
    } catch {
      toast.error("Upload failed. Check your connection.", { id: loadingId });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function validate() {
    const er = {};
    if (values.title.trim().length < 3) er.title = "Title must be at least 3 characters.";
    if (!values.category) er.category = "Please choose a category.";
    if (!(Number(values.hourlyRate) > 0)) er.hourlyRate = "Enter an hourly rate greater than 0.";
    if (values.securityDeposit === "" || Number(values.securityDeposit) < 0)
      er.securityDeposit = "Enter a security deposit (0 or more).";
    const cap = Number(values.maxCapacity);
    if (!Number.isInteger(cap) || cap < 1) er.maxCapacity = "Capacity must be a whole number, at least 1.";
    if (values.location.trim().length < 3) er.location = "Please enter the location.";
    if (!values.image.trim()) er.image = "Please upload an image or paste an image URL.";
    else if (!isValidUrl(values.image.trim())) er.image = "That image URL is not valid.";
    if (amenities.length === 0) er.amenities = "Add at least one amenity.";
    if (values.overview.trim().length < 20) er.overview = "Overview must be at least 20 characters.";
    setErrors(er);
    return Object.keys(er).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSaving(true);
    const payload = {
      title: values.title.trim(),
      category: values.category,
      hourlyRate: Number(values.hourlyRate),
      securityDeposit: Number(values.securityDeposit),
      maxCapacity: Number(values.maxCapacity),
      location: values.location.trim(),
      image: values.image.trim(),
      amenities,
      overview: values.overview.trim(),
    };
    try {
      const res = await apiFetch(isEdit ? `/studios/${studio._id}` : "/studios", {
        method: isEdit ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      const ok = res && typeof res.ok === "boolean" ? res.ok : true;
      const data = res && typeof res.json === "function" ? await res.json().catch(() => ({})) : res || {};
      if (!ok) {
        toast.error(data.message || "Could not save the studio.");
        return;
      }
      toast.success(isEdit ? "Studio updated successfully!" : "Studio added successfully!");
      router.push("/my-listings");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass = (key) => `input input-bordered w-full ${errors[key] ? "input-error" : ""}`;

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label font-medium" htmlFor="title">Studio title</label>
          <input id="title" className={inputClass("title")} value={values.title} onChange={set("title")} placeholder="e.g. Golden Hour Photo Studio" />
          <FieldError message={errors.title} />
        </div>

        <div>
          <label className="label font-medium" htmlFor="category">Category</label>
          <select id="category" className={`select select-bordered w-full ${errors.category ? "select-error" : ""}`} value={values.category} onChange={set("category")}>
            <option value="">Select a category</option>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <FieldError message={errors.category} />
        </div>

        <div>
          <label className="label font-medium" htmlFor="location">Location</label>
          <input id="location" className={inputClass("location")} value={values.location} onChange={set("location")} placeholder="e.g. Dhanmondi, Dhaka" />
          <FieldError message={errors.location} />
        </div>

        <div>
          <label className="label font-medium" htmlFor="hourlyRate">Hourly rate ($)</label>
          <input id="hourlyRate" type="number" min="0" step="1" className={inputClass("hourlyRate")} value={values.hourlyRate} onChange={set("hourlyRate")} />
          <FieldError message={errors.hourlyRate} />
        </div>

        <div>
          <label className="label font-medium" htmlFor="securityDeposit">Security deposit ($)</label>
          <input id="securityDeposit" type="number" min="0" step="1" className={inputClass("securityDeposit")} value={values.securityDeposit} onChange={set("securityDeposit")} />
          <FieldError message={errors.securityDeposit} />
        </div>

        <div>
          <label className="label font-medium" htmlFor="maxCapacity">Max capacity (people)</label>
          <input id="maxCapacity" type="number" min="1" step="1" className={inputClass("maxCapacity")} value={values.maxCapacity} onChange={set("maxCapacity")} />
          <FieldError message={errors.maxCapacity} />
        </div>
      </div>

      <div>
        <span className="label font-medium">Studio image</span>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-box border border-base-300 bg-base-200 sm:w-64">
            {values.image && isValidUrl(values.image) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={values.image} alt="Studio preview" className="h-full w-full object-cover" />
            ) : (
              <span className="px-4 text-center text-sm opacity-60">Image preview appears here</span>
            )}
          </div>
          <div className="flex-1 space-y-3">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
            <button type="button" className="btn btn-outline gap-2" onClick={() => fileRef.current?.click()} disabled={uploading}>
              <FiUploadCloud /> {uploading ? "Uploading..." : "Upload from device"}
            </button>
            <input className={inputClass("image")} value={values.image} onChange={set("image")} placeholder="...or paste an image URL" />
            <FieldError message={errors.image} />
          </div>
        </div>
      </div>

      <div>
        <label className="label font-medium" htmlFor="amenity">Amenities</label>
        <div className={`flex flex-wrap items-center gap-2 rounded-field border p-2 ${errors.amenities ? "border-error" : "border-base-300"}`}>
          {amenities.map((tag) => (
            <span key={tag} className="badge badge-primary gap-1 py-3">
              {tag}
              <button type="button" aria-label={`Remove ${tag}`} onClick={() => removeTag(tag)}>
                <FiX />
              </button>
            </span>
          ))}
          <input
            id="amenity"
            className="min-w-40 flex-1 bg-transparent p-1 outline-none"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={onTagKeyDown}
            placeholder="Type and press Enter"
          />
        </div>
        <FieldError message={errors.amenities} />
        <div className="mt-2 flex flex-wrap gap-2">
          {SUGGESTED.filter((s) => !amenities.some((a) => a.toLowerCase() === s.toLowerCase())).map((s) => (
            <button key={s} type="button" className="btn btn-xs btn-ghost border border-base-300 gap-1" onClick={() => addTag(s)}>
              <FiPlus /> {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label font-medium" htmlFor="overview">Overview</label>
        <textarea id="overview" rows={5} className={`textarea textarea-bordered w-full ${errors.overview ? "textarea-error" : ""}`} value={values.overview} onChange={set("overview")} placeholder="Describe the space, the equipment, and who it suits best." />
        <FieldError message={errors.overview} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label font-medium">Host name</label>
          <input className="input input-bordered w-full" value={isPending ? "Loading..." : session?.user?.name || ""} readOnly disabled />
        </div>
        <div>
          <label className="label font-medium">Host email</label>
          <input className="input input-bordered w-full" value={isPending ? "Loading..." : session?.user?.email || ""} readOnly disabled />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn btn-primary" disabled={saving || uploading}>
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Studio"}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => router.push("/my-listings")} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  );
}