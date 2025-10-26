import { prisma } from "@/lib/prisma";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AlbumsGrid } from "@/components/AlbumsGrid";
import Reveal from "@/components/animation/Reveal";

export default async function AlbumsPage() {
  const albums = await prisma.photoAlbum.findMany();

  return (
    <section className="container py-12 mx-auto">
      <Reveal animation="fadeUp">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/private">Private</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Albums</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold tracking-tighter">
            Photo Albums
          </h1>
        </div>
      </Reveal>
      <AlbumsGrid albums={albums} />
    </section>
  );
}
