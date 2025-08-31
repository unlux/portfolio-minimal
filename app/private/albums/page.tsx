import { prisma } from "@/lib/prisma";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FadeIn from "@/components/animation/FadeIn";
import { AlbumPasswordDialog } from "@/components/AlbumPasswordDialog";
import { AddAlbumDialog } from "@/components/AddAlbumDialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AutoAnimate } from "@/components/animation/AutoAnimate";

export default async function AlbumsPage() {
  const albums = await prisma.photoAlbum.findMany();

  return (
    <section className="container py-12 mx-auto">
      <FadeIn>
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
      </FadeIn>
      <AutoAnimate className="grid grid-cols-1 gap-4 my-8 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album, i) => (
          <FadeIn delay={0.1 + i * 0.05} key={album.id}>
            <AlbumPasswordDialog album={album}>
              <Card className="transition-transform duration-200 h-full hover:scale-105">
                <CardHeader>
                  <CardTitle className="font-semibold tracking-tighter">
                    {album.name}
                  </CardTitle>
                  <CardDescription>
                    {album.isProtected ? "Password Protected" : "Open"}
                  </CardDescription>
                </CardHeader>
              </Card>
            </AlbumPasswordDialog>
          </FadeIn>
        ))}
        <AddAlbumDialog />
      </AutoAnimate>
    </section>
  );
}
