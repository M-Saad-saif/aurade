import { isAdmin } from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import Watch from "@/models/Watch";
import AdminLogin from "@/components/AdminLogin";
import AdminWatchManager from "@/components/AdminWatchManager";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) return <AdminLogin />;

  await connectDB();
  const docs = await Watch.find().sort({ createdAt: -1 }).lean();
  const watches = docs.map((doc) => ({
    id: String(doc._id),
    title: doc.title,
    description: doc.description,
    price: doc.price,
    category: doc.category,
    imageUrl: doc.imageUrl,
    imageCount: doc.images?.length || 1,
    hasVideo: Boolean(doc.videoUrl),
  }));

  return <AdminWatchManager watches={watches} />;
}
