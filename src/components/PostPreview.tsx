import { QueriedPost } from "@/app/blog/page";
import { Card, CardContent, CardHeader } from "./ui/card";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { format } from "date-fns";
import Link from "next/link";

interface PostPreviewProps {
  post: QueriedPost;
}

export default function PostPreview({ post }: PostPreviewProps) {
  return (
    <Link
      href={`/blog/${post.slug?.current}`}
      className="block"
    >
      <Card>
        {post.image && (
          <img
            src={urlFor(post.image).width(1200).height(300).url()}
            alt={post.title ?? ""}
            className="w-full rounded-lg"
          />
        )}
        <CardHeader>
          <div className="flex justify-between items-baseline mb-2">
            <h3>{post.title}</h3>
            <span className="flex-shrink-0">
              {format(post._createdAt, "dd. MMMM yyyy")}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <span>{post.ellipsis}...</span>
        </CardContent>
      </Card>
    </Link>
  );
}

const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
